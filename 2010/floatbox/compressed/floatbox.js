/***************************************************************************
* Floatbox v3.53.0
* July 27, 2009
*
* Copyright (c) 2008-2009 Byron McGregor
* Website: http://randomous.com/floatbox
* License: Attribution-Noncommercial-No Derivative Works 3.0 Unported
*          http://creativecommons.org/licenses/by-nc-nd/3.0/
* Use on any commercial site requires purchase and registration.
* See http://randomous.com/floatbox/license for details.
* This comment block must be retained in all deployments and distributions.
***************************************************************************/

function Floatbox() {
this.defaultOptions = {

/***** BEGIN OPTIONS CONFIGURATION *****/
// See docs/options.html for detailed descriptions.
// All options can be overridden with rev/data-fb-options tag or page options (see docs/instructions.html).

/*** <General Options> ***/
licenseKey:       ''        ,// you can paste your license key here instead of in licenseKey.js if you want
padding:           24       ,// pixels
panelPadding:      8        ,// pixels
overlayOpacity:    55       ,// 0-100
shadowType:       'drop'    ,// 'drop'|'halo'|'none'
shadowSize:        12       ,// 8|12|16|24
roundCorners:     'all'     ,// 'all'|'top'|'none'
cornerRadius:      12       ,// 8|12|20
roundBorder:       1        ,// 0|1
outerBorder:       4        ,// pixels
innerBorder:       1        ,// pixels
autoFitImages:     true     ,// true|false
resizeImages:      true     ,// true|false
autoFitOther:      false    ,// true|false
resizeOther:       false    ,// true|false
resizeTool:       'cursor'  ,// 'cursor'|'topleft'|'both'
infoPos:          'bl'      ,// 'tl'|'tc'|'tr'|'bl'|'bc'|'br'
controlPos:       'br'      ,// 'tl'|'tr'|'bl'|'br'
centerNav:         false    ,// true|false
colorImages:      'black'   ,// 'black'|'white'|'blue'|'yellow'|'red'|'custom'
colorHTML:        'white'   ,// 'black'|'white'|'blue'|'yellow'|'red'|'custom'
colorVideo:       'blue'    ,// 'black'|'white'|'blue'|'yellow'|'red'|'custom'
boxLeft:          'auto'    ,// 'auto'|pixels|'[-]xx%'
boxTop:           'auto'    ,// 'auto'|pixels|'[-]xx%'
enableDragMove:    false    ,// true|false
stickyDragMove:    true     ,// true|false
enableDragResize:  false    ,// true|false
stickyDragResize:  true     ,// true|false
draggerLocation:  'frame'   ,// 'frame'|'content'
minContentWidth:   140      ,// pixels
minContentHeight:  100      ,// pixels
centerOnResize:    true     ,// true|false
showCaption:       true     ,// true|false
showItemNumber:    true     ,// true|false
showClose:         true     ,// true|false
cacheAjaxContent:  false    ,// true|false
hideObjects:       true     ,// true|false
hideJava:          true     ,// true|false
disableScroll:     false    ,// true|false
randomOrder:       false    ,// true|false
preloadAll:        true     ,// true|false
autoGallery:       false    ,// true|false
autoTitle:        ''        ,// common caption string to use with autoGallery
printCSS:         ''        ,// path to css file or inline css string to apply to print pages (see showPrint)
language:         'auto'    ,// 'auto'|'en'|... (see the languages folder)
graphicsType:     'auto'    ,// 'auto'|'international'|'english'
/*** </General Options> ***/

/*** <Animation Options> ***/
doAnimations:         true   ,// true|false
resizeDuration:       3.5    ,// 0-10
imageFadeDuration:    3      ,// 0-10
overlayFadeDuration:  4      ,// 0-10
startAtClick:         true   ,// true|false
zoomImageStart:       true   ,// true|false
liveImageResize:      true   ,// true|false
splitResize:         'no'    ,// 'no'|'auto'|'wh'|'hw'
cycleInterval:        5      ,// seconds
cycleFadeDuration:    4.5    ,// 0-10
/*** </Animation Options> ***/

/*** <Navigation Options> ***/
navType:            'both'    ,// 'overlay'|'button'|'both'|'none'
navOverlayWidth:     35       ,// 0-50
navOverlayPos:       30       ,// 0-100
showNavOverlay:     'never'   ,// 'always'|'once'|'never'
showHints:          'once'    ,// 'always'|'once'|'never'
enableWrap:          true     ,// true|false
enableKeyboardNav:   true     ,// true|false
outsideClickCloses:  true     ,// true|false
imageClickCloses:    false    ,// true|false
numIndexLinks:       0        ,// number, -1 = no limit
indexLinksPanel:    'control' ,// 'info'|'control'
showIndexThumbs:     true     ,// true|false
/*** </Navigation Options> ***/

/*** <Slideshow Options> ***/
doSlideshow:    false  ,// true|false
slideInterval:  4.5    ,// seconds
endTask:       'exit'  ,// 'stop'|'exit'|'loop'
showPlayPause:  true   ,// true|false
startPaused:    false  ,// true|false
pauseOnPrev:    true   ,// true|false
pauseOnNext:    false  ,// true|false
pauseOnResize:  true    // true|false
/*** </Slideshow Options> ***/
};

/*** <New Child Window Options> ***/
// Will inherit from the primary floatbox options unless overridden here.
// Add any you like.
this.childOptions = {
padding:             16,
overlayOpacity:      45,
resizeDuration:       3,
imageFadeDuration:    3,
overlayFadeDuration:  0
};
/*** </New Child Window Options> ***/

/*** <Custom Paths> ***/
// Normally leave these blank.
// Floatbox will auto-find folders based on the location of floatbox.js and background-images.
// If you have a custom odd-ball configuration, fill in the details here.
// (Trailing slashes please)
this.customPaths = {
	installBase: ''  ,// default: parsed from floatbox.js, framebox.js or floatbox.css include line
	jsModules: ''    ,// default: installBase/modules/
	cssModules: ''   ,// default: installBase/modules/
	languages: ''    ,// default: installBase/languages/
	graphics: ''      // default: from floatbox.css pathChecker background-image
};
/*** </Custom Paths> ***/

/***** END OPTIONS CONFIGURATION *****/
this.init();}
Floatbox.prototype={magicClass:"floatbox",cycleClass:"fbCycler",panelGap:20,infoLinkGap:16,draggerSize:12,controlOpacity:60,showHintsTime:1600,zoomPopBorder:1,controlSpacing:8,minInfoWidth:80,minIndexWidth:120,ctrlJump:5,slowLoadDelay:750,autoFitSpace:5,maxInitialSize:120,minInitialSize:70,defaultWidth:"85%",defaultHeight:"82%",init:function(){var g=this;g.doc=document;g.docEl=g.doc.documentElement;g.head=g.doc.getElementsByTagName("head")[0];g.bod=g.doc.getElementsByTagName("body")[0];g.getGlobalOptions();g.currentSet=[];g.nodes=[];g.hiddenEls=[];g.timeouts={};g.pos={};var d=navigator.userAgent,f=navigator.appVersion;g.mac=f.indexOf("Macintosh")!==-1;if(window.opera){g.opera=true;g.operaOld=parseFloat(f)<9.5}else{if(document.all){g.ie=true;g.ieOld=parseInt(f.substr(f.indexOf("MSIE")+5),10)<7;g.ieXP=parseInt(f.substr(f.indexOf("Windows NT")+11),10)<6}else{if(d.indexOf("Firefox")!==-1){g.ff=true;g.ffOld=parseInt(d.substr(d.indexOf("Firefox")+8),10)<3;g.ffNew=!g.ffOld;g.ffMac=g.mac}else{if(f.indexOf("WebKit")!==-1){g.webkit=true;g.webkitMac=g.mac}else{if(d.indexOf("SeaMonkey")!==-1){g.seaMonkey=true}}}}}g.browserLanguage=(navigator.language||navigator.userLanguage||navigator.systemLanguage||navigator.browserLanguage||"en").substring(0,2);g.isChild=!!self.fb;if(!g.isChild){g.parent=g.lastChild=g;g.anchors=[];g.children=[];g.popups=[];g.cycleDivs=[];g.preloads={};g.base=(location.protocol+"//"+location.host).toLowerCase();var b=function(j){return j},a=function(j){return j&&g.doAnimations},i=function(j){return a(j)&&g.resizeDuration};g.modules={enableKeyboardNav:{files:["keydownHandler.js"],test:b},enableDragMove:{files:["mousedownHandler.js"],test:b},enableDragResize:{files:["mousedownHandler.js"],test:b},centerOnResize:{files:["resizeHandler.js"],test:b},showPrint:{files:["printContents.js"],test:b},imageFadeDuration:{files:["animations.js"],test:a},overlayFadeDuration:{files:["animations.js"],test:a},resizeDuration:{files:["animations.js"],test:a},startAtClick:{files:["getLeftTop.js"],test:i},zoomImageStart:{files:["getLeftTop.js","zoomInOut.js"],test:i},loaded:{}};g.installFolder=g.customPaths.installBase||g.getPath("script","src",/(.*)f(?:loat|rame)box.js(?:\?|$)/i)||g.getPath("link","href",/(.*)floatbox.css(?:\?|$)/i)||"/floatbox/";g.jsModulesFolder=g.customPaths.jsModules||g.installFolder+"modules/";g.cssModulesFolder=g.customPaths.cssModules||g.installFolder+"modules/";g.languagesFolder=g.customPaths.languages||g.installFolder+"languages/";g.graphicsFolder=g.customPaths.graphics;if(!g.graphicsFolder){var e,c=g.doc.createElement("div");c.id="fbPathChecker";g.bod.appendChild(c);if((e=/(?:url\()?["']?(.*)blank.gif["']?\)?$/i.exec(g.getStyle(c,"background-image")))){g.graphicsFolder=e[1]}g.bod.removeChild(c);delete c;if(!g.graphicsFolder){g.graphicsFolder=(g.getPath("link","href",/(.*)floatbox.css(?:\?|$)/i)||"/floatbox/")+"graphics/"}}g.rtl=g.getStyle(g.bod,"direction")==="rtl"||g.getStyle(g.docEl,"direction")==="rtl"}else{g.parent=fb.lastChild;fb.lastChild=g;fb.children.push(g);g.anchors=fb.anchors;g.popups=fb.popups;g.cycleDivs=fb.cycleDivs;g.preloads=fb.preloads;g.modules=fb.modules;g.jsModulesFolder=fb.jsModulesFolder;g.cssModulesFolder=fb.cssModulesFolder;g.languagesFolder=fb.languagesFolder;g.graphicsFolder=fb.graphicsFolder;g.strings=fb.strings;g.rtl=fb.rtl;if(g.parent.isSlideshow){g.parent.pause(true)}}var h=g.graphicsFolder;g.resizeUpCursor=h+"magnify_plus.cur";g.resizeDownCursor=h+"magnify_minus.cur";g.notFoundImg=h+"404.jpg";g.blank=h+"blank.gif";g.zIndex={base:90000+(g.isChild?12*fb.children.length:0),fbOverlay:1,fbBox:2,fbCanvas:3,fbContent:4,fbMainLoader:5,fbLeftNav:6,fbRightNav:6,fbOverlayPrev:7,fbOverlayNext:7,fbResizer:8,fbInfoPanel:9,fbControlPanel:9,fbDragger:10,fbZoomDiv:11};var e=/\bautoStart=(.+?)(?:&|$)/i.exec(location.search);g.autoHref=e?e[1]:false},tagAnchors:function(c){var b=this;function a(e){var g=c.getElementsByTagName(e);for(var f=0,d=g.length;f<d;f++){b.tagOneAnchor(g[f],false)}}a("a");a("area");if(!fb.licenseKey){b.getModule("licenseKey.js")}b.getModule("core.js");b.getModules(b.defaultOptions,true);b.getModules(b.pageOptions,false);if(b.popups.length){b.getModule("getLeftTop.js");b.getModule("animations.js");b.getModule("tagPopup.js");if(b.tagPopup){while(b.popups.length){b.tagPopup(b.popups.pop())}}}if(b.ieOld){b.getModule("ieOld.js")}},tagOneAnchor:function(g,k){var n=this,b=!!g.getAttribute,j;if(b){var l={href:g.getAttribute("href")||"",rev:g.getAttribute("data-fb-options")||g.getAttribute("rev")||"",rel:g.getAttribute("rel")||"",title:g.getAttribute("title")||"",className:g.className||"",ownerDoc:g.ownerDocument,anchor:g,thumb:(g.getElementsByTagName("img")||[])[0]}}else{var l=g;l.anchor=l.thumb=l.ownerDoc=false}if((j=new RegExp("(?:^|\\s)"+n.magicClass+"(\\S*)","i").exec(l.className))){l.tagged=true;if(j[1]){l.group=j[1]}}if(n.autoGallery&&!l.tagged&&n.fileType(l.href)==="img"&&l.rel.toLowerCase()!=="nofloatbox"&&l.className.toLowerCase().indexOf("nofloatbox")===-1){l.tagged=true;l.group=".autoGallery";if(n.autoTitle&&!l.title){l.title=n.autoTitle}}if(!l.tagged){if((j=/^(?:floatbox|gallery|iframe|slideshow|lytebox|lyteshow|lyteframe|lightbox)(.*)/i.exec(l.rel))){l.tagged=true;l.group=j[1];if(/^(slide|lyte)show/i.test(l.rel)){l.rev+=" doSlideshow:true"}else{if(/^(i|lyte)frame/i.test(l.rel)){l.rev+=" type:iframe"}}}}if(l.thumb&&((j=/(?:^|\s)fbPop(up|down)(?:\s|$)/i.exec(g.className)))){l.popup=true;l.popupType=j[1];n.popups.push(l)}if(k!==false){l.tagged=true}if(l.tagged){l.options=n.parseOptionString(l.rev);l.href=l.options.href||l.href;l.group=l.options.group||l.group||"";if(!l.href&&l.options.showThis!==false){return}l.level=fb.children.length+(fb.lastChild.fbBox&&!l.options.sameBox?1:0);var f=n.anchors.length;while(f--){var h=n.anchors[f];if(h.href===l.href&&h.rev===l.rev&&h.rel===l.rel&&h.title===l.title&&h.level===l.level&&(h.anchor===l.anchor||(l.ownerDoc&&l.ownerDoc!==n.doc))){h.anchor=l.anchor;h.thumb=l.thumb;break}}if(f===-1){if(l.options.type){l.options.type=l.options.type.replace(/^(flash|quicktime|wmp|silverlight)$/i,"media:$1");if(l.options.type==="image"){l.options.type="img"}}if(l.html){l.type="direct"}else{l.type=l.options.type||n.fileType(l.href)}if(l.type==="html"){l.type="iframe";var j=/#(\w+)/.exec(l.href);if(j){var m=document;if(l.anchor){m=l.ownerDoc||m}if(m===document&&n.itemToShow&&n.itemToShow.anchor){m=n.itemToShow.ownerDoc||m}var d=m.getElementById(j[1]);if(d){l.type="inline";l.sourceEl=d}}}n.anchors.push(l);n.getModules(l.options,false);if(l.type.indexOf("media")===0){n.getModule("mediaHTML.js")}if(n.autoHref){if(l.options.showThis!==false&&n.autoHref===l.href.substr(l.href.length-n.autoHref.length)){n.autoStart=l}}else{if(l.options.autoStart===true){n.autoStart=l}else{if(l.options.autoStart==="once"){var j=/fbAutoShown=(.+?)(?:;|$)/.exec(document.cookie),e=j?j[1]:"",c=escape(l.href);if(e.indexOf(c)===-1){n.autoStart=l;document.cookie="fbAutoShown="+e+c+"; path=/"}}}}if(n.ieOld&&l.anchor){l.anchor.hideFocus="true"}}if(b){g.onclick=function(i){if(!i){var a=this.ownerDocument;i=a&&a.parentWindow&&a.parentWindow.event}if(!(i&&(i.ctrlKey||i.metaKey||i.shiftKey||i.altKey))||l.options.showThis===false||!/img|iframe/.test(l.type)){n.start(this);return n.stopEvent(i)}}}}if(k===true){return l}},
tagDivs:function(b){var a=this;if(a.getElementsByClassName(a.cycleClass,b).length){if(a.cycleInit){a.cycleInit(b)}else{a.getModule("cycler.js");a.getModule("animations.js")}}},fileType:function(a){var c=(a||"").toLowerCase(),b=c.indexOf("?");if(b!==-1){c=c.substr(0,b)}c=c.substr(c.lastIndexOf(".")+1);if(/^(jpe?g|png|gif|bmp)$/.test(c)){return"img"}if(c==="swf"||/^(http:)?\/\/(www.)?(youtube|dailymotion)\.com\/(v\/|watch\?v=|swf\/)/i.test(a)){return"media:flash"}if(/^(mov|mpe?g|movie|3gp|3g2|m4v|mp4|qt)$/.test(c)){return"media:quicktime"}if(/^(wmv?|avi)$/.test(c)){return"media:wmp"}if(c==="xap"){return"media:silverlight"}return"html"},getGlobalOptions:function(){var c=this;if(!c.isChild){c.setOptions(c.defaultOptions);if(typeof setFloatboxOptions==="function"){setFloatboxOptions()}c.pageOptions=typeof fbPageOptions==="object"?fbPageOptions:{}}else{for(var b in c.defaultOptions){if(c.defaultOptions.hasOwnProperty(b)){c[b]=c.parent[b]}}c.setOptions(c.childOptions);c.pageOptions={};for(var b in c.parent.pageOptions){if(c.parent.pageOptions.hasOwnProperty(b)){c.pageOptions[b]=c.parent.pageOptions[b]}}if(typeof fbChildOptions==="object"){for(var b in fbChildOptions){if(fbChildOptions.hasOwnProperty(b)){c.pageOptions[b]=fbChildOptions[b]}}}}c.setOptions(c.pageOptions);if(c.pageOptions.enableCookies){var a=/fbOptions=(.+?)(;|$)/.exec(document.cookie);if(a){c.setOptions(c.parseOptionString(a[1]))}}c.setOptions(c.parseOptionString(location.search.substring(1)))},parseOptionString:function(h){var l=this;if(!h){return{}}var g=[],e,c=/`([^`]*?)`/g;c.lastIndex=0;while((e=c.exec(h))){g.push(e[1])}if(g.length){h=h.replace(c,"``")}h=h.replace(/\s*[:=]\s*/g,":");h=h.replace(/\s*[;&]\s*/g," ");h=h.replace(/^\s+|\s+$/g,"");h=h.replace(/(:\d+)px\b/gi,function(i,m){return m});var b={},f=h.split(" "),d=f.length;while(d--){var k=f[d].split(":"),a=k[0],j=k[1];if(typeof j==="string"){if(!isNaN(j)){j=+j}else{if(j==="true"){j=true}else{if(j==="false"){j=false}}}}if(j==="``"){j=g.pop()||""}b[a]=j}return b},setOptions:function(d){var b=this;for(var a in d){if(b.defaultOptions.hasOwnProperty(a)){if(a==="licenseKey"){var c=window.fb||b;c.licenseKey=c.licenseKey||d[a]}else{b[a]=d[a]}}}},getModule:function(e){var d=this;if(d.modules.loaded[e]){return}if(e.slice(-3)===".js"){var b="script",a={type:"text/javascript",src:(e.indexOf("licenseKey")===-1?d.jsModulesFolder:d.installFolder)+e}}else{var b="link",a={rel:"stylesheet",type:"text/css",href:d.cssModulesFolder+e}}var f=d.doc.createElement(b);for(var c in a){if(a.hasOwnProperty(c)){f.setAttribute(c,a[c])}}d.head.appendChild(f);d.modules.loaded[e]=true},getModules:function(c,g){var f=this;for(var b in c){if(f.modules.hasOwnProperty(b)){var e=f.modules[b],h=g?f[b]:c[b],a=0,d=e.files.length;while(d--){if(e.test(h)){f.getModule(e.files[d]);a++}}if(a===e.files.length){delete f.modules[b]}}}},getStyle:function(a,c){if(!(a&&c)){return""}if(a.currentStyle){return a.currentStyle[c.replace(/-(\w)/g,function(d,e){return e.toUpperCase()})]||""}else{var b=a.ownerDocument&&(a.ownerDocument.defaultView||a.ownerDocument.parentWindow);return(b&&b.getComputedStyle&&b.getComputedStyle(a,"").getPropertyValue(c))||""}},getPath:function(b,a,g){var c,e=document.getElementsByTagName(b),d=e.length;while(d--){if((c=g.exec(e[d][a]))){var f=c[1].replace("compressed/","");return f||"./"}}return""},addEvent:function(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{if(b.attachEvent){b.attachEvent("on"+c,a)}else{b["prior"+c]=b["on"+c];b["on"+c]=a}}},removeEvent:function(b,c,a){if(b.removeEventListener){b.removeEventListener(c,a,false)}else{if(b.detachEvent){b.detachEvent("on"+c,a)}else{b["on"+c]=b["prior"+c];delete b["prior"+c]}}},stopEvent:function(b){b=b||window.event;if(b){if(b.stopPropagation){b.stopPropagation()}if(b.preventDefault){b.preventDefault()}try{b.cancelBubble=true}catch(a){}try{b.returnValue=false}catch(a){}}return false},getElementsByClassName:function(g,f){f=f||document.getElementsByTagName("body")[0];var d=[];if(f.getElementsByClassName){var b=f.getElementsByClassName(g),c=b.length;while(c--){d[c]=b[c]}}else{var h=new RegExp("(^|\\s)"+g+"(\\s|$)"),e=f.getElementsByTagName("*");for(var c=0,a=e.length;c<a;c++){if(h.test(e[c].className)){d.push(e[c])}}}return d},start:function(a){var b=this;setTimeout(function(){b.start(a)},100)},preload:function(a,c){var b=this;setTimeout(function(){b.preload(a,c)},250)}};var fb$=function(e){function d(a){return typeof a==="string"?(document.getElementById(a)||null):a}var b=[],c=arguments.length;if(c>1){while(c--){b[c]=d(arguments[c])}return b}else{return d(e)}};var fb;function initfb(){if(arguments.callee.done){return}var a="self";if(true){if(self!==parent){try{if(self.location.host===parent.location.host&&self.location.protocol===parent.location.protocol){a="parent"}}catch(c){}if(a==="parent"&&!parent.fb){return setTimeout(initfb,50)}}}arguments.callee.done=true;if(document.compatMode==="BackCompat"){alert("Floatbox does not support quirks mode.\nPage needs to have a valid doctype declaration.");return}fb=(a==="self"?new Floatbox():parent.fb);var b=self.document.getElementsByTagName("body")[0];fb.anchorCount=b.getElementsByTagName("a").length;fb.tagAnchors(b);fb.tagDivs(b)}(function(){function b(){initfb();if(!(self.fb&&self.fb.strings)){return setTimeout(arguments.callee,100)}var d=self.document.getElementsByTagName("body")[0],c=d.getElementsByTagName("a").length;if(c>fb.anchorCount){fb.tagAnchors(d)}if(fb.autoStart){if(fb.autoStart.ownerDoc===self.document){fb.setTimeout("start",function(){fb.start(fb.autoStart)},100)}}else{setTimeout(function(){if(fb.preloads.count===fb.undefined){fb.preload("",true)}},200)}}if(window.addEventListener){window.addEventListener("load",b,false)}else{if(window.attachEvent){window.attachEvent("onload",b)}else{var a=window.onload;window.onload=function(){if(typeof a==="function"){a()}b()}}}})();if(document.addEventListener){document.addEventListener("DOMContentLoaded",initfb,false)};(function(){/*@cc_on if(document.body){try{document.createElement('div').doScroll('left');return initfb();}catch(e){}}/*@if (false) @*/if(/loaded|complete/.test(document.readyState))return initfb();/*@end @*/if(!initfb.done)setTimeout(arguments.callee,30);})();