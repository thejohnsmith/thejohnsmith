var ConnectionVar;
var QuestionReady = 0;
var AnswerReplies = ["Thanks for the tip Bro!"];
var PassReplies = ["It's okay. I'm sure you're good at something else.", "Thanks for nothin..."];
var NoQuestions = ["Please wait while we find someone else to test your genius."];
var fakes = ["Why am I so cool?", "Ok, so I have this boil on my ass...", "Would the real slim shady please stand up? Please stand up?"];

$(document).ready(function(){
	$('#me-ask-tags').tagsInput({
		'height':'40px',
   		'width':'300px',
		'defaultText':'Tag it, please.'
	});
	$('#askbtn').bind('click', function(e){
		var q = $('#me-ask').val();
		ask(q);
	});
	$('#passer').bind('click', function(e){
		pass();
	});
	$('#answbtn').bind('click', function(e){
		var a = $('#me-answer').val();
		answer(a);
	});
	console.log('initializing connection...');
	ConnectionVar = SetupConnection({
		userName: getQuerystring('name', 'Anonymous'),
		qUpdate: qUpdate,
		newQuestion: gotNewQuestion
	});
	var t=setTimeout("fakey()",30000);

});

function qUpdate(objyn){
	$('.stats-num').text(objyn.views);
	if (objyn.answered) {
		//$().text(objyn.answeredBy);
		var name = '<div>' + 'John A. Smith' + ' suggests:</div>';
		$('#loveme').text(name + objyn.answer);
	}
}

function ask(q) {
	//send with question and tags...
	$('#me-submitted div.question').html("<p>" + q + "</p>");
	//$('#askbtn').text("Ask something else");
	$('#askbtn').hide();
	$('.me-form').fadeOut('fast', function(){
		$('#me-submitted').fadeIn();	
	});
	ConnectionVar.SubmitQuestion(q);
	
}


function close(q) {
	if ($('.unanswered').length == 0) {
		$('.validate').remove();
		$('#me-submitted').hide();
		$('#me-form').show();
	}
	else 
	{
		$('.answer').append("<p class='validate'>Please rate given answers before closing.</p>");
	}
}

function rate(id) {
	


}

function answer(a) {
//send 
	showReply("answer");
	ConnectionVar.SubmitAnswer(a);

}


function pass() {
//send
	showReply("pass");
	ConnectionVar.PassQuestion();

}

function gotNewQuestion(q) {
	$('#them div.question').text(q);
	$('#them div.answer').show();
}

function showReply(r) {
	var msg = (r === "answer" ? AnswerReplies[Math.floor(Math.random()*AnswerReplies.length)] : PassReplies[Math.floor(Math.random()*PassReplies.length)]);
	$('#feedback').text(msg);
	$('#them div.question').text(NoQuestions[Math.floor(Math.random()*NoQuestions.length)]);
	$('#them div.answer').hide();
	
	
	
	
	//hide after a few secs
}

function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}

function fakey(){
	console.log('hey');
	$('#them .question').html(fakes[0]);
}

