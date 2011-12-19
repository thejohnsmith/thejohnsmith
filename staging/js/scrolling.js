
var Base = function() {
	if (arguments.length) {
		if (this == window) { // cast an object to this class
			Base.prototype.extend.call(arguments[0], arguments.callee.prototype);
		} else {
			this.extend(arguments[0]);
		}
	}
};
Base.version = "1.0.2";
Base.prototype = {
	extend:function(source, value) {
		var extend = Base.prototype.extend;
		if (arguments.length == 2) {
			var ancestor = this[source];
			// overriding?
			if ((ancestor instanceof Function) && (value instanceof Function) &&
				ancestor.valueOf() != value.valueOf() && /\bbase\b/.test(value)) {
				var method = value;
			//	var _prototype = this.constructor.prototype;
			//	var fromPrototype = !Base._prototyping && _prototype[source] == ancestor;
				value = function() {
					var previous = this.base;
				//	this.base = fromPrototype ? _prototype[source] :ancestor;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function() {
					return method;
				};
				value.toString = function() {
					return String(method);
				};
			}
			return this[source] = value;
		} else if (source) {
			var _prototype = {toSource:null};
			// do the "toString" and other methods manually
			var _protected = ["toString", "valueOf"];
			// if we are prototyping then include the constructor
			if (Base._prototyping) _protected[2] = "constructor";
			for (var i = 0; (name = _protected[i]); i++) {
				if (source[name] != _prototype[name]) {
					extend.call(this, name, source[name]);
				}
			}
			// copy each of the source object's properties to this object
			for (var name in source) {
				if (!_prototype[name]) {
					extend.call(this, name, source[name]);
				}
			}
		}
		return this;
	},

	base:function() {
		// call this method from any other method to invoke that method's ancestor
	}
};
Base.extend = function(_instance, _static) {
	var extend = Base.prototype.extend;
	if (!_instance) _instance = {};
	// build the prototype
	Base._prototyping = true;
	var _prototype = new this;
	extend.call(_prototype, _instance);
	var constructor = _prototype.constructor;
	_prototype.constructor = this;
	delete Base._prototyping;
	// create the wrapper for the constructor function
	var klass = function() {
		if (!Base._prototyping) constructor.apply(this, arguments);
		this.constructor = klass;
	};
	klass.prototype = _prototype;
	// build the class interface
	klass.extend = this.extend;
	klass.implement = this.implement;
	klass.toString = function() {
		return String(constructor);
	};
	extend.call(klass, _static);
	// single instance
	var object = constructor ? klass :_prototype;
	// class initialisation
	if (object.init instanceof Function) object.init();
	return object;
};
Base.implement = function(_interface) {
	if (_interface instanceof Function) _interface = _interface.prototype;
	this.prototype.extend(_interface);
};
function delegate (that, thatMethod){
			var _params = [];
			for(var n = 2; n < arguments.length; n++) _params.push(arguments[n]);
			return function() {
				 var paramsToUse = [];
				 for(var n = 0; n < arguments.length; n++) {
					paramsToUse.push(arguments[n]);
				 }
				 for(var n = 0; n < _params.length; n++) {
					paramsToUse.push(_params[n]);
				 }
				 
			 try {
			  if (paramsToUse.length > 0){
				return thatMethod.apply(that, paramsToUse)
			  }else {
				return thatMethod.call(that)
			  }
			 }catch(e){
			  e.func = thatMethod;
			  e.params = _params.join(",");
			  console.log(e.message);
			 };
			}
}
function addEvent( obj, type, fn, uniqueid ) {
		  if ( obj.attachEvent ) {
			if (uniqueid == null){
			 uniqueid = fn;
			}
			obj['e'+type+uniqueid] = fn;
			obj[type+uniqueid] = function(){obj['e'+type+uniqueid]( window.event );}
			obj.attachEvent( 'on'+type, obj[type+uniqueid] );
		  } else
			obj.addEventListener( type, fn, false );
}
function removeEvent ( obj, type, fn, uniqueid ) {
		  if ( obj.detachEvent ) {
			if (uniqueid == null){
			 uniqueid = fn;
			}
			obj.detachEvent( 'on'+type, obj[type+uniqueid] );
			obj[type+uniqueid] = null;
		  } else
			obj.removeEventListener( type, fn, false );
}
function dimensions (){
		var bd = {};
		if (window.innerHeight && window.scrollMaxY) {
			bd.xfull = window.innerWidth + window.scrollMaxX;//window.innerWidth;//;//document.body.scrollWidth;
			bd.yfull = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){
			bd.xfull = document.body.scrollWidth;
			bd.yfull = document.body.scrollHeight;
		} else {
			bd.xfull = document.body.scrollWidth;// || document.documentElement.scrollLeft;
			bd.yfull = document.body.offsetHeight;
		}
		if (self.innerHeight) {	// all except Explorer
			bd.xview = self.innerWidth +11;
			bd.yview = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) {
			bd.xview = document.documentElement.clientWidth;
			bd.yview = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			bd.xview = document.body.clientWidth;
			bd.yview = document.body.clientHeight;
		}
		if(bd.yfull < bd.yview){
			bd.yfull = bd.yview;
		}
		if (self.pageYOffset) {
			bd.yscroll = self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop){
			bd.yscroll = document.documentElement.scrollTop;
		} else if (document.body) {
			bd.yscroll = document.body.scrollTop;
		}
		return bd;
}
var Game;
function loadClouds (){

  Game = new (Base.extend({
	cloudpos1 :0,
	cloudpos2 :0,
	cloudpos3 :0,
	cloudmovement :2,
	dim :null,
	constructor :function (){
		addEvent(window, "resize", delegate(this, this.resize));
		/*addEvent(document, "mousemove", delegate(this, this.mousemove));*/
		this.resize();
		setInterval(delegate(this, this.onEnterFrame), 40);
	},
	resize :function (){
		this.dim = dimensions();
		var cloud1 = document.getElementById('cloud1');
		var cloud2 = document.getElementById('cloud2');
		var cloud3 = document.getElementById('cloud3');
		cloud3.style.width = this.dim.xview + 'px';
		cloud3.style.height = '200px';
		cloud2.style.width = this.dim.xview + 'px';
		cloud2.style.height = '200px';
		cloud1.style.width = this.dim.xview + 'px';
		cloud1.style.height = '200px';
	},
	mousemove :function (e){
		var e = window.event?window.event:e;
		this.cloudmovement = ((this.dim.xview/2) - e.clientX)/40;
	},
	onEnterFrame :function (e){

		this.cloudpos1 += Math.floor(this.cloudmovement);
		this.cloudpos2 += Math.floor(this.cloudmovement/1.5);
		this.cloudpos3 += Math.floor(this.cloudmovement/-3);
		
		document.getElementById('cloud3').style.backgroundPosition = this.cloudpos3+'px 0px';
		document.getElementById('cloud2').style.backgroundPosition = this.cloudpos2+'px 0px';
		document.getElementById('cloud1').style.backgroundPosition = this.cloudpos1+'px 0px';
	}
  }))();
 }	