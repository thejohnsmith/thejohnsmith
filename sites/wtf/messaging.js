/*
	Used to instantiate the connection & build functions to call server.
	cbObj contains parameters that point to callback objects, receiving a single object 
	for data.
	e.g. SetupConnection( {
		userName: 'jake',
		qUpdate: function (data){},
		newQuestion: function (data) {}
	})
	
	qUpdate:  This function is used to update the status of a question.  Properties:
		answered (boolean)
			if true, there will also be an 'answer' property containing the answer
			if false, there will be properties of views and passes, each containing an integer of respective values
*/
var SetupConnection = function (cbObj)
{
	var handler = {};

	var connection = new WebSocket('ws://192.168.150.129:8000');
	
	/*var connection = $.websocket("ws://192.168.150.129:8000", {
        
        events: {
                newQuestion: function(e) {
						var newQuestion = {};
						newQuestion.question = "Why do people laugh at me?";
						newQuestion.asker = "eric";
                        cbObj.newQuestion.call(newQuestion);
                },
				qUpdate: function(e) {
						var statusUpdate = {};
						if(false)
						{
							statusUpdate.answered = true;
							statusUpdate.answer = "because";
						}else
						{
							statusUpdate.answered = false; 
							statusUpdate.views = 1;
							statusUpdate.passes = 2;
						}
						
                        cbObj.qUpdate.call(statusUpdate);
                }
        }
});*/
	
	connection.onopen = function () {
	  console.log('connection opened');
		  connection.send('Ready', {UserName: cbObj.userName}); 
	};
	
	connection.onmessage = function (e) {
		//alert(e.data.type);
		switch(e.data.type)
		{
			
		}
	}
	/*
		Closure function, sends the provided message with the provided
		tags (array of strings)
	*/
	handler.SubmitQuestion = function(message, tags)
	{
		console.log('Submitting question '+message);
		
		var msgTags = [];
		/*
		for(var i = 0; i < tags.length; tags++)
		{
			msgTags.push(tags[i]);
		}
		*/
		
		connection.send('NewQuestion', {Question : message});
		
	};
	
	/*
		Closure function, submits an answer for the question
	*/
	handler.SubmitAnswer = function(message)
	{
		console.log('Submitting question '+message);
		connection.send('AnswerQuestion', {Answer : message});
	};
	
	/*
		Closure function, requests a pass on the question
	*/
	handler.PassQuestion = function()
	{
		console.log('Passing question ');
		connection.send('PassQuestion');
	};
	
	handler.RemoveQuestion = function()
	{
		console.log('Removing question');
		connection.send('RemoveQuestion');
	}
	
	
	
	return handler;
	
	
}