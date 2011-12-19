/* 
ModernClimate  2010 
*/

// function template
$(function() {

});


$('#logo').click(function() {
	window.location = $('#homeButtom').attr('href');
});

// Ajax Refreshers
$(function() {
	// Day, Hour, Idea
	$("#numBoxes").load("stats.html");
	var refreshId = setInterval(function() {
	$("#numBoxes").load('stats.html?randval='+ Math.random());
	}, 9000);
	
	// Short Brief
	$("#shortBrief").load("brief.html");
	var refreshId = setInterval(function() {
	$("#shortBrief").load('brief.html?randval='+ Math.random());
	}, 9000);
	
	// Long Brief
	$("#briefSpecifics").load("brief.html");
	var refreshId = setInterval(function() {
	$("#briefSpecifics").load('brief.html?randval='+ Math.random());
	}, 9000);
});


// Flash jAZZ
var flashvars = {};
var params = {};
params.wmode = "transparent"; 
var attributes = {};
attributes.id = "Main";
swfobject.embedSWF("flash/Main.swf", "Main", "100%", "100%", "10.0.0", false, flashvars, params, attributes);
function launch(channel) {
	var swf = document.getElementById("Main");
	swf.setChannel(channel);
}
function flashIsReady() {
	launch('18643/camera-1-201944');
}
function myClose(hash) {
	hash.w.fadeOut('2000',function(){ hash.o.remove(); });
}
var closeHash;
var closeTimeout;
function closeTimeout(hash) {
	closeHash = hash;
	closeTimeout = setTimeout(doClose, 3600);
}
function doClose(hash){
	clearTimeout(closeTimeout);
	myClose(closeHash);
	closeHash = null;
}

function updateVariables()
{
	$.ajax({ url: "stats.html", context: document.body, dataType:"html", success: function(data){
        $(this).addClass("done");
      }});
}

//setInterval("updateTime()", 1000);
//updateTime();
function updateTime()
{
	today  = new Date();
	todayEpoch  = today.getTime();

	target = new Date("December 17, 2010 17:03");
	targetEpoch = target.getTime();
		
	var difference = Math.floor(targetEpoch - todayEpoch);
	var hoursLeft = Math.floor(difference / (1000 * 60 * 60));
	var hoursString = hoursLeft.toString();
	while (hoursString.length < 2)
	{ hoursString = "0"+hoursString; }
	difference -= (hoursLeft * 60 * 60 * 1000);
	
	var minutesLeft = Math.floor(difference / (1000 * 60));
	var minutesString = minutesLeft.toString();
	while (minutesString.length < 2)
	{ minutesString = "0"+minutesString; }
	difference -= (minutesLeft * 60 * 1000);
	
	var secondsLeft = Math.floor(difference / 1000);
	var secondsString = secondsLeft.toString();
	while(secondsString.length < 2)
	{ secondsString = "0"+secondsString; }
	
	$("#countDown").html(minutesString+":"+secondsString);
}

/* Modal Content Handelerz */
$().ready(function() {
	$('.theBrief').jqm({trigger: '#theBrief', onHide:myClose, modal:false});
	$('.submitYours').jqm({trigger: '#submitYours, #submitYours2', onHide:myClose, modal:true});
  	$('.changeAngle').jqm({trigger: '#changeAngle', onHide:myClose, modal:true, closeClass: 'altClose'});
  	$('.makeShout').jqm({trigger: '#makeShout', onHide:myClose, modal:true});
	$('.makeApplaud').jqm({onLoad:closeTimeout,ajax: 'applaud.html', trigger: '#makeApplaud', onHide:myClose, overlayClass:'green', closeClass: 'altClose'});
	$('.makeBoo').jqm({onLoad:closeTimeout, ajax: 'boo.html', trigger: '#makeBoo', onHide:myClose, overlayClass:'red', closeClass: 'altClose'});
  
/* Right Side Nav */
$(function() {
  $('#rightNav li').hover(function() {
	 $(this).children().fadeIn('fast');
  }, 
  function(){
	  $(this).children().hide();
  });
  $('#rightNav li').click(function() {
	  $(this).children().fadeOut();
  });
  $('#rightNav li a').click(function() {
	  $(this).hide();
  });
});

/* Footer Animation */
var isOpen = false;
$('#footerToggle').click(function() {
	if (!isOpen) { 
		$(this).parent().animate({'bottom' : '-100px'});}
	else { 
	$(this).parent().animate({'bottom' : '-459px' });}
		isOpen = !isOpen;
});

/* In-field label replacement */
	$(':input[title]').each(function() {
	  var $this = $(this);
	  if($this.val() === '') {
		$this.val($this.attr('title'));}
	  $this.focus(function() {
		if($this.val() === $this.attr('title')) {
		  $this.val('');}
	  });
	  $this.blur(function() {
		if($this.val() === '') {
		  $this.val($this.attr('title'));}
	  });
	});
});



/* vIVIsTATz jUNK */
var DID=57137;
var pcheck=(window.location.protocol == "https:") ? "https://sniff.visistat.com/live.js":"http://stats.visistat.com/live.js";
document.writeln('<scr'+'ipt src="'+pcheck+'" type="text\/javascript"><\/scr'+'ipt>');

/* qUANzcASTz JuNK */
_qoptions={qacct:"p-68vmobn33_nuo"};







