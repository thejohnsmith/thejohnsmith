
using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.IO;

namespace WebSocketServer
{

    public class Logger
    {
        public bool LogEvents { get; set; }

        public Logger()
        {
            LogEvents = true;
        }

        public void Log(string Text)
        {
            if (LogEvents) Console.WriteLine(Text);
        }
    }


    public enum ServerStatusLevel { Off, WaitingConnection, ConnectionEstablished };

    public delegate void NewConnectionEventHandler(EventArgs e);
    public delegate void DataReceivedEventHandler(string message, EventArgs e);
    public delegate void DisconnectedEventHandler(EventArgs e);

    public class WebSocketServer : IDisposable
    {


#region "Properties and initialization stuff"

        private bool AlreadyDisposed;
        private Socket Listener;
        private int ConnectionsQueueLength;
        private int MaxBufferSize;
        private string Handshake;
        private Socket ConnectionSocket;
        private StreamReader ConnectionReader;
        private StreamWriter ConnectionWriter;
        private Logger logger;
        private byte[] receivedDataBuffer;
        private byte[] FirstByte;
        private byte[] LastByte;
        private byte[] ServerKey1;
        private byte[] ServerKey2;

        public ServerStatusLevel Status { get; private set; }
        public int ServerPort { get; set; }
        public string ServerLocation { get; set; }
        public string ConnectionOrigin { get; set; }
        public bool LogEvents { 
            get { return logger.LogEvents; }
            set { logger.LogEvents = value; }
        }

        public event NewConnectionEventHandler NewConnection;
        public event DataReceivedEventHandler DataReceived;

        public event DisconnectedEventHandler Disconnected;

        private void Initialize()
        {
            AlreadyDisposed = false;
            logger = new Logger();

            Status = ServerStatusLevel.Off;
            ConnectionsQueueLength = 500;
            MaxBufferSize = 1024;
            receivedDataBuffer = new byte[MaxBufferSize];
            FirstByte = new byte[MaxBufferSize];
            LastByte = new byte[MaxBufferSize];
            FirstByte[0] = 0x00;
            LastByte[0] = 0xFF;
            logger.LogEvents = true;
            Handshake = "HTTP/1.1 101 Web Socket Protocol Handshake" + Environment.NewLine;
            Handshake += "Upgrade: WebSocket" + Environment.NewLine;
            Handshake += "Connection: Upgrade" + Environment.NewLine;
            Handshake += "Sec-WebSocket-Origin: " + ConnectionOrigin + Environment.NewLine;
            Handshake += "Sec-WebSocket-Location: " + ServerLocation + Environment.NewLine;
            Handshake += Environment.NewLine;            
        }

        public WebSocketServer() 
        {
            ServerPort = 8181;
            ConnectionOrigin = "http://localhost:8080";
            ServerLocation = "ws://localhost:8181/test";
            Initialize();
        }
        public WebSocketServer(int serverPort, string serverLocation, string connectionOrigin)
        {
            ServerPort = serverPort;
            ConnectionOrigin = connectionOrigin;
            ServerLocation = serverLocation;
            Initialize();
        }

        ~WebSocketServer()
        {
            Close();
        }

        public void Dispose()
        {
            Close();
        }


        private void Close()
        {
            if (!AlreadyDisposed)
            {
                AlreadyDisposed = true;
                if (Listener != null) Listener.Close();
                if (ConnectionSocket != null) ConnectionSocket.Close();
                if (ConnectionReader != null) ConnectionReader.Close();
                if (ConnectionWriter != null) ConnectionWriter.Close();
                GC.SuppressFinalize(this);
            }
        }


#endregion


        private void ClientDisconnected()
        {
            if (Status == ServerStatusLevel.WaitingConnection) return;

            logger.Log("Client disconnected.");
            if (Disconnected != null) Disconnected(EventArgs.Empty);

            Listener.BeginAccept(new AsyncCallback(NewClientConnection), null);
            Status = ServerStatusLevel.WaitingConnection;
            logger.Log("Waiting for another connection attempt ...");
            logger.Log("");
        }


        private void Read(IAsyncResult status)
        {
            if (!ConnectionSocket.Connected) return;
            try
            {
                System.Text.ASCIIEncoding decoder = new System.Text.ASCIIEncoding();
                int startIndex = 0;
                int endIndex = 0;

                while (receivedDataBuffer[startIndex] == FirstByte[0]) startIndex++;

                endIndex = startIndex + 1;
                while (receivedDataBuffer[endIndex] != LastByte[0] && endIndex != MaxBufferSize - 1) endIndex++;
                if (endIndex == MaxBufferSize - 1) endIndex = MaxBufferSize;


                string messageReceived = decoder.GetString(receivedDataBuffer, startIndex, endIndex - startIndex);
                logger.Log("Message received [\"" + messageReceived + "\"]");

                if (DataReceived != null) DataReceived(messageReceived, EventArgs.Empty);
                Array.Clear(receivedDataBuffer, 0, receivedDataBuffer.Length);
                ConnectionSocket.BeginReceive(receivedDataBuffer, 0, receivedDataBuffer.Length, 0, new AsyncCallback(Read), null);
            }
            catch
            {
                ClientDisconnected();
            }
        }


        private void BuildServerPartialKey(int keyNum, string clientKey)
        {
            string partialServerKey = "";
            byte[] currentKey;
            int spacesNum = 0;
            char[] keyChars = clientKey.ToCharArray();
            foreach (char currentChar in keyChars)
            {
                if (char.IsDigit(currentChar)) partialServerKey += currentChar;
                if (char.IsWhiteSpace(currentChar)) spacesNum++;
            }
            try
            {
                currentKey = BitConverter.GetBytes((int)(Int64.Parse(partialServerKey) / spacesNum));
                if (BitConverter.IsLittleEndian) Array.Reverse(currentKey);

                if (keyNum == 1) ServerKey1 = currentKey;
                else ServerKey2 = currentKey;
            }
            catch
            {
                if (ServerKey1 != null) Array.Clear(ServerKey1, 0, ServerKey1.Length);
                if (ServerKey2 != null) Array.Clear(ServerKey2, 0, ServerKey2.Length);
            }
        }


        private byte[] BuildServerFullKey(byte[] last8Bytes)
        {
            byte[] concatenatedKeys = new byte[16];
            Array.Copy(ServerKey1, 0, concatenatedKeys, 0, 4);
            Array.Copy(ServerKey2, 0, concatenatedKeys, 4, 4);
            Array.Copy(last8Bytes, 0, concatenatedKeys, 8, 8);
            System.Security.Cryptography.MD5 MD5Service = System.Security.Cryptography.MD5.Create();
            return MD5Service.ComputeHash(concatenatedKeys);
        }

        private void NewClientConnection(IAsyncResult status)
        {
            ConnectionSocket = Listener.EndAccept(status);
            ConnectionSocket.(receivedDataBuffer, 0, receivedDataBuffer.Length, 0, new AsyncCallback(ManageHandshake), ConnectionSocket.Available);
        }

        private void ManageHandshake(IAsyncResult status) 
        {
            int HandshakeLength = (int) status.AsyncState;

            byte[] last8Bytes = new byte[8];
            Array.Copy(receivedDataBuffer, HandshakeLength - 8, last8Bytes, 0, 8);
            System.Text.ASCIIEncoding decoder = new System.Text.ASCIIEncoding();
            string ClientHandshake = decoder.GetString(receivedDataBuffer, 0, HandshakeLength - 8);
            string[] ClientHandshakeLines = ClientHandshake.Split(new string[] { Environment.NewLine }, System.StringSplitOptions.RemoveEmptyEntries);

            logger.Log("New connection from " + ConnectionSocket.LocalEndPoint + " requested. Handshaking ...");

            foreach (string Line in ClientHandshakeLines)
            {
                logger.Log(Line);
                if (Line.Contains("Sec-WebSocket-Key1:"))
                    BuildServerPartialKey(1, Line.Substring(Line.IndexOf(":") + 2));
                if (Line.Contains("Sec-WebSocket-Key2:"))
                    BuildServerPartialKey(2, Line.Substring(Line.IndexOf(":") + 2));
            }

            byte[] HandshakeText = Encoding.ASCII.GetBytes(Handshake);
            byte[] serverHandshakeResponse = new byte[HandshakeText.Length + 16];
            byte[] serverKey = BuildServerFullKey(last8Bytes);
            Array.Copy(HandshakeText, serverHandshakeResponse, HandshakeText.Length);
            Array.Copy(serverKey, 0, serverHandshakeResponse, HandshakeText.Length, 16);

            logger.Log("");
            logger.Log("Sending handshake ...");
            ConnectionSocket.BeginSend(serverHandshakeResponse, 0, HandshakeText.Length + 16, 0, HandshakeFinished, null);

            logger.Log(Handshake);
        }

        private void HandshakeFinished(IAsyncResult status)
        {
            logger.Log("New connection from " + ConnectionSocket.LocalEndPoint + " established.");
            Status = ServerStatusLevel.ConnectionEstablished;
            ConnectionSocket.EndSend(status);
            ConnectionSocket.BeginReceive(receivedDataBuffer, 0, receivedDataBuffer.Length, 0, new AsyncCallback(Read), null);

            if (NewConnection != null) NewConnection(EventArgs.Empty);              
        }
        
        public void StartServer()
        {
            Listener = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.IP);
            Listener.Bind(new IPEndPoint(IPAddress.Loopback, ServerPort));
            Listener.Listen(ConnectionsQueueLength);
            Listener.BeginAccept(new AsyncCallback(NewClientConnection), null);
            logger.Log("Press 'q' and enter to exit this program.");
            logger.Log("Server started. Listening for connection requests ...");
            Status = ServerStatusLevel.WaitingConnection;
            string ConsoleInput = Console.ReadLine();
            while (ConsoleInput != "Q" && ConsoleInput != "q")
            {
                ConsoleInput = Console.ReadLine();
            }
        }


        public void Send(string message)
        {
            if (!ConnectionSocket.Connected) return;
            try
            {
                ConnectionSocket.Send(FirstByte);  
                ConnectionSocket.Send(Encoding.UTF8.GetBytes(message));
                ConnectionSocket.Send(LastByte);
                logger.Log("Data sent to the client [\"" + message + "\"]");
            }
            catch
            {
                ClientDisconnected();
            }
        }


    }

}



