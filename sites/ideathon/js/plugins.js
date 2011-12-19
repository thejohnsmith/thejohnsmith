/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 03/01/2009 +r14
 */
(function($) {
$.fn.jqm=function(o){
var p={
overlay: 80,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: F,
ajaxText: '',
target: F,
modal: F,
toTop: F,
onShow: F,
onHide: F,
onLoad: F
};
return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
if(p.trigger)$(this).jqmAddTrigger(p.trigger);
});};

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
$.fn.jqmShow=function(t){return this.each(function(){t=t||window.event;$.jqm.open(this._jqm,t);});};
$.fn.jqmHide=function(t){return this.each(function(){t=t||window.event;$.jqm.close(this._jqm,t)});};

$.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index'))),z=(z>0)?z:3000,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])L('bind');A.push(s);}
 else if(c.overlay > 0)h.w.jqmAddClose(o);
 else o=F;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;
 if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose($(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;
},
close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
 if(A[0]){A.pop();if(!A[0])L('unbind');}
 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
},
params:{}};
var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,
i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),
e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);

// More Twitter Feed stuff...
(function($){$.fn.twitterfeed=function(username,options){var defaults={limit:10,header:true,tweeticon:true,tweetname:true,tweettime:true};var options=$.extend(defaults,options);return this.each(function(i,e){var $e=$(e);if(!$e.hasClass('twitterFeed'))$e.addClass('twitterFeed');if(username==null)return false;var url='http://twitter.com/statuses/user_timeline/'+username+'.json';var params={};params.count=options.limit;jQuery.ajax({url:url,data:params,dataType:'jsonp',success:function(o){_callback(e,o,options);}});});};var _callback=function(e,feeds,options){if(!feeds){return false;}
var html='';var row='odd';if(options.header)
var name=feeds[0].user.name;var screenname=feeds[0].user.screen_name;var icon=feeds[0].user.profile_image_url;var link='<a href="http://twitter.com/'+screenname+'/" title="Visit '+name+' on Twitter">';html+='<div class="twitterHeader">'+
link+'<img src="'+icon+'" alt="'+name+'" /></a>'+'<span>'+link+name+'</a></span>'+'</div>';html+='<div class="twitterBody">'+'<ul>';for(var i=0;i<feeds.length;i++){var tweet=feeds[i];var link='<a href="http://twitter.com/'+tweet.user.screen_name+'/" title="Visit '+tweet.user.name+' on Twitter">';html+='<li class="twitterRow '+row+'">';if(options.tweeticon){var icon=tweet.user.profile_image_url;html+=link+'<img src="'+icon+'" alt="'+name+'" /></a>';}
if(options.tweetname){var name=tweet.user.name;html+='<div class="tweetName">'+link+name+'</a></div>'}
if(options.tweettime){var lapsedTime=getLapsedTime(tweet.created_at);html+='<div class="tweetTime">'+lapsedTime+'</div>'}
var text=tweet.text.replace(/(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/,function(u){var shortUrl=(u.length>30)?u.substr(0,30)+'...':u;return'<a href="'+u+'" title="Click to view this link">'+shortUrl+'</a>';}).replace(/@([a-zA-Z0-9_]+)/g,'@<a href="http://twitter.com/$1" title="Click to view $1 on Twitter">$1</a>').replace(/(?:^|\s)#([^\s\.\+:!]+)/g,function(a,u){return' <a href="http://twitter.com/search?q='+encodeURIComponent(u)+'" title="Click to view this on Twitter">#'+u+'</a>';});html+='<p>'+text+'</p>'
html+='</li>';if(row=='odd'){row='even';}else{row='odd';}}
html+='</ul>'+'</div>'
$(e).html(html);};function getLapsedTime(strDate){strDate=Date.parse(strDate.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,'$1,$2$4$3'));var todayDate=new Date();var tweetDate=new Date(strDate)
var lapsedTime=Math.round((todayDate.getTime()-tweetDate.getTime())/1000)
if(lapsedTime<60){return'< 1m';}else if(lapsedTime<(60*60)){return Math.round(lapsedTime/60)+'m';}else if(lapsedTime<(24*60*60)){return Math.round(lapsedTime/3600)+'h';}else if(lapsedTime<(7*24*60*60)){return Math.round(lapsedTime/86400)+'d';}else{return Math.round(lapsedTime/604800)+'w';}};})(jQuery);
// More Twitter BS...
/*
$(function() {
$.fn.vTicker = function(options) {
	var defaults = {
		speed: 700,
		pause: 4000,
		showItems: 1,
		animation: '',
		mousePause: true,
		isPaused: false
	};

	var options = $.extend(defaults, options);

	moveUp = function(obj2, height){
		if(options.isPaused)
			return;
		
		var obj = obj2.children('ul');
		
    	first = obj.children('li:first').clone(true);
		
    	obj.animate({top: '-=' + height + 'px'}, options.speed, function() {
        	$(this).children('li:first').remove();
        	$(this).css('top', '0px');
        });
		
		if(options.animation == 'fade')
		{
			obj.children('li:first').fadeOut(options.speed);
			obj.children('li:last').hide().fadeIn(options.speed);
		}

    	first.appendTo(obj);
	};
	
	return this.each(function() {
		var obj = $(this);
		var maxHeight = 0;

		obj.css({overflow: 'hidden', position: 'relative'})
			.children('ul').css({position: 'absolute', margin: 0, padding: 0})
			.children('li').css({margin: 0, padding: 0});

		obj.children('ul').children('li').each(function(){
			if($(this).height() > maxHeight)
			{
				maxHeight = $(this).height();
			}
		});

		obj.children('ul').children('li').each(function(){
			$(this).height(maxHeight);
		});

		obj.height(maxHeight * options.showItems);
		
    	var interval = setInterval(function(){ moveUp(obj, maxHeight); }, options.pause);
		
		if(options.mousePause)
		{
			obj.bind("mouseenter",function(){
				options.isPaused = true;
			}).bind("mouseleave",function(){
				options.isPaused = false;
			});
		}
	});
};
})(jQuery);
*/
window.log = function(){
  log.history = log.history || [];   
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(doc){
  var write = doc.write;
  doc.write = function(q){ 
    log('document.write(): ',arguments); 
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);


