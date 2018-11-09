/* Floatbox v3.53.0 */
Floatbox.prototype.setSize_module=function(g){var o=this,f=false,k=[[],[]],a={},e,j=arguments.length;if(g==="wh"){a.top=1;a.height=1}else{if(g==="hw"){a.left=1;a.width=1}}while(j--){if(typeof arguments[j]==="object"&&arguments[j].id){var h=arguments[j],e=o[h.id];if(!o.pos[h.id]){o.pos[h.id]={}}for(var b in h){if(h.hasOwnProperty(b)&&b!=="id"){var l=e,d=h[b],n=0;if(!/IMG|IFRAME/.test(e.nodeName)||(b!=="width"&&b!=="height")){l=e.style;n="px"}var m=a[b]||0,c=o.pos[h.id][b];if(typeof c!=="number"||e.style.display||e.style.visibility){c=d}k[m].push({target:l,prop:b,start:c,finish:d,px:n});if(/width|height/i.test(b)){if(h.id==="fbMainDiv"){k[m].push({target:o.fbContent,prop:b,start:c,finish:d,px:0})}else{if(h.id==="fbZoomDiv"){k[m].push({target:o.fbZoomImg,prop:b,start:c,finish:d,px:0})}}}o.pos[h.id][b]=d}}}else{if(typeof arguments[j]==="function"){f=arguments[j]}}}o.resizeGroup(k[0],function(){o.resizeGroup(k[1],f)})};Floatbox.prototype.resizeGroup=function(a,g){var c=this,b=a.length;if(!b){return g?g():null}c.clearTimeout("resize");var f=0;while(b--){f=Math.max(f,Math.abs(a[b].finish-a[b].start))}var e=c.resizeDuration*(c.liveResize?0.65:1);var d=f&&e?Math.pow(Math.max(1,2.2-e/10),(Math.log(f)))/f:1;b=a.length;while(b--){a[b].diff=a[b].finish-a[b].start}c.stepResize(0,d,a,g)};Floatbox.prototype.stepResize=function(h,f,d,g){var j=this;if(h>1){h=1}var c=d.length;while(c--){var e=d[c].target,a=d[c].prop,b=Math.round(d[c].start+d[c].diff*h);if(!e){h=1;break}e[a]=b+d[c].px}if(h>=1){delete j.timeouts.resize;if(g){g()}}else{j.timeouts.resize=setTimeout(function(){j.stepResize(h+f,f,d,g)},20)}};Floatbox.prototype.setOpacity_module=function(c,e,d,i){var k=this;d=d||0;var h=+(c.style.opacity||0),j=e/100;k.clearTimeout["fade_"+c.id];var f=(h<=j&&j>0);if(d>10){d=10}if(d<0){d=0}if(d===0){h=j;var b=1}else{var g=Math.pow(100,0.1),a=d+((10-d)/9)*(Math.log(2)/Math.log(g)-1),b=1/Math.pow(g,a)}if(f){if(c.style.removeAttribute){c.style.filter="alpha(opacity="+h*100+")"}c.style.opacity=h+"";c.style.display=c.style.visibility=""}else{b=-b}k.stepFade(c,h+b,j,b,f,i)};Floatbox.prototype.stepFade=function(d,b,e,g,a,f){var c=this;if(!d){return}if((a&&b>=e)||(!a&&b<=e)){b=e}if(d.style.removeAttribute){d.style.filter="alpha(opacity="+b*100+")"}d.style.opacity=b+"";if(b===e){delete c.timeouts["fade_"+d.id];if(d.style.removeAttribute&&e>=1){d.style.removeAttribute("filter")}if(f){f()}}else{c.setTimeout("fade_"+d.id,function(){c.stepFade(d,b+g,e,g,a,f)},20)}};