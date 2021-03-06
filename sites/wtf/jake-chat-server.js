﻿var sys = require("sys")
  , http = require("http")
  , fs = require("fs")
  , path = require("path")
  , ws = require('../../lib/ws/server');
  // Set up Connection
var httpServer = http.createServer(function (req, res) {
    if (req.method == "GET") {
        if (req.url.indexOf("favicon") > -1) {
            res.writeHead(200, { 'Content-Type': 'image/x-icon', 'Connection': 'close' });
            res.end("");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html', 'Connection': 'close' });
            fs.createReadStream(path.normalize(path.join(__dirname, "client.html")), {
                'flags': 'r',
                'encoding': 'binary',
                'mode': 0666,
                'bufferSize': 4 * 1024
            }).addListener("data", function (chunk) {
                res.write(chunk, 'binary');
            }).addListener("end", function () {
                res.end();
            });
        }
    } else {
        res.writeHead(404);
        res.end();
    }
});

//state object
var users = {};

function nu_question() {
    this.passed = 0;
    this.viewed = 0;
    this.question = "";
};

function user_obj() {
    this.question = "";
    this.answered = false;
    this.questioned;
    this.name = "";
};

function getUnAskedUsers() {
    var i;
    var un_asked = [];
    for (i = 0; i < users.length; i += 1) {
        if (users[i].questioned === "") {
            un_asked.push(i);
        };
    };
    return un_asked;
};

function getAsker(q) {
    var i;
    var un_asked = [];
    for (i = 0; i < users.length; i += 1) {
        if (users[i].question === q) {
            return i;
        };
    };
    return un_asked;  
};

function prepJSON(type, message) {
    return "{ \"Type\" : " + type + "," + message + "}");
    
};

function solicitQuestions()
{
	var usersToAsk = getUnAskedUsers();
	if(usersToAsk != null && usersToAsk.length > 0)
	{
		var usersAvailCount = usersToAsk.length;
		for(i = 0; i < questionList.length; i++)
		{
			var question = questionList[i];
			if(!question.assigned)
			{
				//assign question to user
				var us = usersToAsk.shift();
				usersAvailCount--;
				question.assigned = true;
				server.send(us, prepJSON("newQuestion", "question\" : " + question  + "," + "asker\":" + question.asker  ));
			}
			if(usersAvailCount < 1)
			{
				break;
			}
		}
	}
}

//create
var server = ws.createServer({
    server: httpServer
});
//listen
server.addListener("listening", function () {
    sys.log("Listening for connections.");
    console.log("Listening for connections.");
});

// Handle WebSocket Requests
server.addListener("connection", function (conn) {
    console.log('[*] open');
    console.log("** Connected as: user_" + conn.id);
    //var messageOut = "Open";
    // JSON.stringify(
    //conn.send("Connected");

    users[conn.id] = new user_obj();
    //conn.broadcast("** " + conn.id + " connected");

    conn.addListener("message", function (message) {
        var user = users[conn.id];
        console.log(message);
        var mData = JSON.parse(message);
        console.log(mData);
        switch (mData.Type) {
            case "Ready":
                //
                user.name = mData.data.UserName;
                break;
            case "NewQuestion":
                user.question = {question: mData.data.Question, asker: user.name, views: 0, passes: 0, assigned: false};//jake did this line
                var unasked_user = getUnAskedUsers(user.question)[0];
                server.send(unasked_user, prepJSON("newQuestion", "question\" : " + user.question  + "," + "asker\":" + user.UserName  ));
                break;
            case "AnswerQuestion":
                //
                server.send(getAsker(user.questioned), prepJSON("qUpdate", "\"answered\" : \"true\"" +"," + "\"answer\":" + user.questioned));
                user.questioned = "";
                break;
            case "PassQuestion":
                var q = user.questioned; //jake did next few lines
				user.questioned = null;
				q.views++;
				q.passes++;
                server.send(getAsker(q), prepJSON("qUpdate", "\"answered\" : \"false\"" + "\"views\" : \"1\"" + "," + "\"passes\":\"4\""));
                break;
            case "RemoveQuestion":
                user.questioned = "";
                break;
            case 2:
        }

        //        if (message == 'close') {
        //            console.log('[-] close requested')
        //            conn.close();
        //        } else {
        //            console.log('[!] ' + message);
        //            ActiveXObject
        //            conn.send("{ \"event\" : \"received\" }");
        //            //console.log('[+] ', (new Buffer(message)).inspect());
        //            //server.broadcast(conn.id + ": " + message);
        //        }
    });

    conn.addListener("close", function () {
        console.log('[*] close');
    })
});

server.addListener("disconnect", function (conn) {
    server.broadcast("<" + conn.id + "> disconnected");
});


server.listen(8000);