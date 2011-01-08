/*
Copyright (c) 2007 John Dyer (http://johndyer.name)
MIT style license

Converted to MooTools by Scott Boyce (http://scottpowered.com)
*/

var Color = new Class({
	color: {
		r: 0,
		g: 0,
		b: 0,

		h: 0,
		s: 0,
		v: 0,

		hex: ''
	},
	setRgb: function(r, g, b) {
		this.color.r = r;
		this.color.g = g;
		this.color.b = b;
					
		var newCmyk = new ColorMethods();
		this.color.c = newCmyk.rgbToCmyk(this.color).c;
		this.color.m = newCmyk.rgbToCmyk(this.color).m;
		this.color.y = newCmyk.rgbToCmyk(this.color).y;
		this.color.k = newCmyk.rgbToCmyk(this.color).k;
					
		var newHsv = new ColorMethods();
		this.color.h = newHsv.rgbToHsv(this.color).h;
		this.color.s = newHsv.rgbToHsv(this.color).s;
		this.color.v = newHsv.rgbToHsv(this.color).v;

		var newHex = new ColorMethods();
		this.color.hex = newHex.rgbToHex(this.color);
	
		return this.color;
	},
	setHsv: function(h, s, v) {
		this.color.h = h;
		this.color.s = s;
		this.color.v = v;

		var newRgb = new ColorMethods();
		this.color.r = newRgb.hsvToRgb(this.color).r;
		this.color.g = newRgb.hsvToRgb(this.color).g;
		this.color.b = newRgb.hsvToRgb(this.color).b;

		var newHex = new ColorMethods();
		this.color.hex = newHex.rgbToHex(this.color);
					
		var newCmyk = new ColorMethods();
		this.color.c = newCmyk.rgbToCmyk(this.color).c;
		this.color.m = newCmyk.rgbToCmyk(this.color).m;
		this.color.y = newCmyk.rgbToCmyk(this.color).y;
		this.color.k = newCmyk.rgbToCmyk(this.color).k;

		return this.color;
	},
	setHex: function(hex) {
		this.color.hex = hex;

		var newRgb = new ColorMethods();
		this.color.r = newRgb.hexToRgb(this.color.hex).r;
		this.color.g = newRgb.hexToRgb(this.color.hex).g;
		this.color.b = newRgb.hexToRgb(this.color.hex).b;
					
		var newHsv = new ColorMethods();
		this.color.h = newHsv.rgbToHsv(this.color).h;
		this.color.s = newHsv.rgbToHsv(this.color).s;
		this.color.v = newHsv.rgbToHsv(this.color).v;
					
		var newCmyk = new ColorMethods();
		this.color.c = newCmyk.rgbToCmyk(this.color).c;
		this.color.m = newCmyk.rgbToCmyk(this.color).m;
		this.color.y = newCmyk.rgbToCmyk(this.color).y;
		this.color.k = newCmyk.rgbToCmyk(this.color).k;

		return this.color;
	},
	setCmyk: function(c, m, y, k) {
		this.color.c = c;
		this.color.m = m;
		this.color.y = y;
		this.color.k = k;

		var newRgb = new ColorMethods();
		this.color.r = newRgb.cmykToRgb(this.color).r;
		this.color.g = newRgb.cmykToRgb(this.color).g;
		this.color.b = newRgb.cmykToRgb(this.color).b;

		var newHex = new ColorMethods();
		this.color.hex = newHex.rgbToHex(this.color);
					
		var newHsv = new ColorMethods();
		this.color.h = newHsv.rgbToHsv(this.color).h;
		this.color.s = newHsv.rgbToHsv(this.color).s;
		this.color.v = newHsv.rgbToHsv(this.color).v;

		return this.color;
	}
});

var ColorMethods = new Class({
	hexToRgb: function(hex) {
		hex = this.validateHex(hex);

		var r='00',
			g='00',
			b='00';

		if (hex.length == 6) {
			r = hex.substring(0,2);
			g = hex.substring(2,4);
			b = hex.substring(4,6);	
		} else {
			if (hex.length > 4) {
				r = hex.substring(4, hex.length);
				hex = hex.substring(0,4);
			}
			if (hex.length > 2) {
				g = hex.substring(2,hex.length);
				hex = hex.substring(0,2);
			}
			if (hex.length > 0) {
				b = hex.substring(0,hex.length);
			}					
		}

		return { r:this.hexToInt(r), g:this.hexToInt(g), b:this.hexToInt(b) };
	},
	validateHex: function(hex) {
		hex = new String(hex).toUpperCase();
		hex = hex.replace(/[^A-F0-9]/g, '0');
		if (hex.length > 6) {
			hex = hex.substring(0, 6);
		}
		return hex;
	},
	rgbToHex: function (rgb) {
		return this.intToHex(rgb.r) + this.intToHex(rgb.g) + this.intToHex(rgb.b);
	},
	intToHex: function (dec){
		var result = (parseInt(dec).toString(16));
		if (result.length == 1)
			result = ("0" + result);
		return result.toUpperCase();
	},
	hexToInt: function (hex){
		return(parseInt(hex,16));
	},
	rgbToHsv: function (rgb) {

		var r = rgb.r / 255;
		var g = rgb.g / 255;
		var b = rgb.b / 255;

		hsv = {h:0, s:0, v:0};

		var min = 0
		var max = 0;

		if (r >= g && r >= b) {
			max = r;
			min = (g > b) ? b : g;
		} else if (g >= b && g >= r) {
			max = g;
			min = (r > b) ? b : r;
		} else {
			max = b;
			min = (g > r) ? r : g;
		}

		hsv.v = max;
		hsv.s = (max) ? ((max - min) / max) : 0;

		if (!hsv.s) {
			hsv.h = 0;
		} else {
			delta = max - min;
			if (r == max) {
				hsv.h = (g - b) / delta;
			} else if (g == max) {
				hsv.h = 2 + (b - r) / delta;
			} else {
				hsv.h = 4 + (r - g) / delta;
			}

			hsv.h = parseInt(hsv.h * 60);
			if (hsv.h < 0) {
				hsv.h += 360;
			}
		}

		hsv.s = parseInt(hsv.s * 100);
		hsv.v = parseInt(hsv.v * 100);

		return hsv;
	},
	rgbToCmyk: function(rgb) {
		var r = rgb.r; 
		var g = rgb.g; 
		var b = rgb.b; 

		var cmyk = {c:0, m:0, y:0, k:0};

		if (r==0 && g==0 && b==0) {
			cmyk = {c:0, m:0, y:0, k:1};
			return cmyk;
		}
		
		cmyk.c = 1 - (r/255);
		cmyk.m = 1 - (g/255);
		cmyk.y = 1 - (b/255);
		
		var minCMY = Math.min(cmyk.c,Math.min(cmyk.m,cmyk.y));
		
		cmyk.c = Math.round(100 * ((cmyk.c - minCMY) / (1 - minCMY)));
		cmyk.m = Math.round(100 * ((cmyk.m - minCMY) / (1 - minCMY)));
		cmyk.y = Math.round(100 * ((cmyk.y - minCMY) / (1 - minCMY)));
		cmyk.k = Math.round(100 * (minCMY));

		return cmyk;
	},
	cmykToRgb: function(cmyk) {	
		var c = cmyk.c/100;
		var m = cmyk.m/100;
		var y = cmyk.y/100;
		var k = cmyk.k/100;
		
		var rgb = {r:0, g:0, b:0};
		
		var r = 1 - (c * (1 - k)) - k;
		var g = 1 - (m * (1 - k)) - k;
		var b = 1 - (y * (1 - k)) - k;
		
		rgb.r = Math.round(r * 255);
		rgb.g = Math.round(g * 255);
		rgb.b = Math.round(b * 255);
		
		return rgb;
	},
	hsvToRgb: function (hsv) {

		rgb = {r:0, g:0, b:0};

		var h = hsv.h;
		var s = hsv.s;
		var v = hsv.v;

		if (s == 0) {
			if (v == 0) {
				rgb.r = rgb.g = rgb.b = 0;
			} else {
				rgb.r = rgb.g = rgb.b = parseInt(v * 255 / 100);
			}
		} else {
			if (h == 360) {
				h = 0;
			}
			h /= 60;

			// 100 scale
			s = s/100;
			v = v/100;

			var i = parseInt(h);
			var f = h - i;
			var p = v * (1 - s);
			var q = v * (1 - (s * f));
			var t = v * (1 - (s * (1 - f)));
			switch (i) {
				case 0:
					rgb.r = v;
					rgb.g = t;
					rgb.b = p;
					break;
				case 1:
					rgb.r = q;
					rgb.g = v;
					rgb.b = p;
					break;
				case 2:
					rgb.r = p;
					rgb.g = v;
					rgb.b = t;
					break;
				case 3:
					rgb.r = p;
					rgb.g = q;
					rgb.b = v;
					break;
				case 4:
					rgb.r = t;
					rgb.g = p;
					rgb.b = v;
					break;
				case 5:
					rgb.r = v;
					rgb.g = p;
					rgb.b = q;
					break;
			}

			rgb.r = parseInt(rgb.r * 255);
			rgb.g = parseInt(rgb.g * 255);
			rgb.b = parseInt(rgb.b * 255);
		}

		return rgb;
	}
});

var ColorValuePicker = new Class({
	initialize: function(id) {
		this.id = id;

		this.onValuesChanged = null;

		this._hueInput = $(this.id + '_Hue');
		this._valueInput = $(this.id + '_Brightness');
		this._saturationInput = $(this.id + '_Saturation');

		this._redInput = $(this.id + '_Red');
		this._greenInput = $(this.id + '_Green');
		this._blueInput = $(this.id + '_Blue');

		this._hexInput = $(this.id + '_Hex');

		this._cyanInput = $(this.id + '_Cyan');
		this._magentaInput = $(this.id + '_Magenta');
		this._yellowInput = $(this.id + '_Yellow');
		this._blackInput = $(this.id + '_Black');
		
		this.hitTimer, this.hitRate = 500; //milliseconds, rate limiter

		// HSV
		
		//IE6&7 do not fire the onChange event properly
/*		this._hueInput.addEvent('change', function(e){
			this._onHsvChange(e);
		}.bind(this));
		this._valueInput.addEvent('change', function(e){
			this._onHsvChange(e);
		}.bind(this));
		this._saturationInput.addEvent('change', function(e){
			this._onHsvChange(e);
		}.bind(this));
*/		this._hueInput.addEvent('keyup', function(e){
			this._onHsvKeyUp(e);
		}.bind(this));
		this._valueInput.addEvent('keyup', function(e){
			this._onHsvKeyUp(e);
		}.bind(this));
		this._saturationInput.addEvent('keyup', function(e){
			this._onHsvKeyUp(e);
		}.bind(this));
		this._hueInput.addEvent('blur', function(e){
			this._onHsvBlur(e);
		}.bind(this));
		this._valueInput.addEvent('blur', function(e){
			this._onHsvBlur(e);
		}.bind(this));
		this._saturationInput.addEvent('blur', function(e){
			this._onHsvBlur(e);
		}.bind(this));

		// RGB
		this._redInput.addEvent('keyup', function(e){
			this._onRgbKeyUp(e);
		}.bind(this));
		this._greenInput.addEvent('keyup', function(e){
			this._onRgbKeyUp(e);
		}.bind(this));
		this._blueInput.addEvent('keyup', function(e){
			this._onRgbKeyUp(e);
		}.bind(this));
		this._redInput.addEvent('blur', function(e){
			this._onRgbBlur(e);
		}.bind(this));
		this._greenInput.addEvent('blur', function(e){
			this._onRgbBlur(e);
		}.bind(this));
		this._blueInput.addEvent('blur', function(e){
			this._onRgbBlur(e);
		}.bind(this));
/*		this._redInput.addEvent('change', function(e){
			this._onRgbChange(e);
		}.bind(this));
		this._greenInput.addEvent('change', function(e){
			this._onRgbChange(e);
		}.bind(this));
		this._blueInput.addEvent('change', function(e){
			this._onRgbChange(e);
		}.bind(this));
*/
		// HEX
		this._hexInput.addEvent('keyup', function(e){
			this._onHexKeyUp(e);
		}.bind(this));
/*		this._hexInput.addEvent('change', function(e){
			this._onHexChange(e);
		}.bind(this));
*/

		// CMYK
		this._cyanInput.addEvent('keyup', function(e){
			this._onCmykKeyUp(e);
		}.bind(this));
		this._magentaInput.addEvent('keyup', function(e){
			this._onCmykKeyUp(e);
		}.bind(this));
		this._yellowInput.addEvent('keyup', function(e){
			this._onCmykKeyUp(e);
		}.bind(this));
		this._blackInput.addEvent('keyup', function(e){
			this._onCmykKeyUp(e);
		}.bind(this));
		this._cyanInput.addEvent('blur', function(e){
			this._onCmykBlur(e);
		}.bind(this));
		this._magentaInput.addEvent('blur', function(e){
			this._onCmykBlur(e);
		}.bind(this));
		this._yellowInput.addEvent('blur', function(e){
			this._onCmykBlur(e);
		}.bind(this));
		this._blackInput.addEvent('blur', function(e){
			this._onCmykBlur(e);
		}.bind(this));
/*		this._cyanInput.addEvent('change', function(e){
			this._onCmykChange(e);
		}.bind(this));
		this._magentaInput.addEvent('change', function(e){
			this._onCmykChange(e);
		}.bind(this));
		this._yellowInput.addEvent('change', function(e){
			this._onCmykChange(e);
		}.bind(this));
		this._blackInput.addEvent('change', function(e){
			this._onCmykChange(e);
		}.bind(this));
*/
		this.color = new Color();

		// get an initial value
		var initial = this._hexInput.getProperty('value');
		var newcolor = {};
		if (initial == '') {
			this._hexInput.setProperty('value', 'FF0000')
			initial = 'FF0000';
		}
		newcolor = this.color.setHex(initial);

		this.color.hex = newcolor.hex;

		this.color.r = newcolor.r;
		this.color.g = newcolor.g;
		this.color.b = newcolor.b;

		this.color.h = newcolor.h;
		this.color.s = newcolor.s;
		this.color.v = newcolor.v;

		this.color.c = newcolor.c;
		this.color.m = newcolor.m;
		this.color.y = newcolor.y;
		this.color.k = newcolor.k;

		// set the others based on initial value
		this._hexInput.value = this.color.hex;
		
		this._redInput.value = this.color.r;
		this._greenInput.value = this.color.g;
		this._blueInput.value = this.color.b;
		
		this._hueInput.value = this.color.h;
		this._saturationInput.value = this.color.s;
		this._valueInput.value = this.color.v;
		
		this._cyanInput.value = this.color.c;
		this._magentaInput.value = this.color.m;
		this._yellowInput.value = this.color.y;
		this._blackInput.value = this.color.k;
	},
	_onHsvKeyUp: function(e) {
		this.hitTimer && clearTimeout(this.hitTimer);
		this.hitTimer = setTimeout(function() {
			if (e.target.value == '') {
				return;
			}
			this.validateHsv(e);
			this.setValuesFromHsv();
			if (this.onValuesChanged) {
				this.onValuesChanged(this);
			}
			this.hitTimer = null;
		}.bind(this), this.hitRate);	
	},
	_onRgbKeyUp: function(e) {
		this.hitTimer && clearTimeout(this.hitTimer);
		this.hitTimer = setTimeout(function() {
			if (e.target.value == '') {
				return;
			}
			this.validateRgb(e);
			this.setValuesFromRgb();
			if (this.onValuesChanged) {
				this.onValuesChanged(this);
			}
			this.hitTimer = null;
		}.bind(this), this.hitRate);	
	},
	_onHexKeyUp: function(e) {
		this.hitTimer && clearTimeout(this.hitTimer);
		this.hitTimer = setTimeout(function() {
			if (e.target.value == '') {
				return;
			}
			this.validateHex(e);
			this.setValuesFromHex();
			if (this.onValuesChanged) {
				this.onValuesChanged(this);
			}
			this.hitTimer = null;
		}.bind(this), this.hitRate);	
	},
	_onCmykKeyUp: function(e) {
		this.hitTimer && clearTimeout(this.hitTimer);
		this.hitTimer = setTimeout(function() {
			if (e.target.value == '') {
				return;
			}
			this.validateCmyk(e);
			this.setValuesFromCmyk();
			if (this.onValuesChanged) {
				this.onValuesChanged(this);
			}
			this.hitTimer = null;
		}.bind(this), this.hitRate);	
	},
/*	_onHsvChange: function(e) {
		if (e.target.value == '') {
			return;
		}
		this.validateHsv(e);
		this.setValuesFromHsv();
		if (this.onValuesChanged) {
			this.onValuesChanged(this);
		}
	},
	_onRgbChange: function(e) {
		if (e.target.value == '') {
			return;
		}
		this.validateRgb(e);
		this.setValuesFromRgb();
		if (this.onValuesChanged) {
			this.onValuesChanged(this);
		}
	},
	_onHexChange: function(e) {
		if (e.target.value == '') {
			return;
		}
		this.validateHex(e);
		this.setValuesFromHex();
		if (this.onValuesChanged) {
			this.onValuesChanged(this);
		}
	},
	_onCmykChange: function(e) {
		if (e.target.value == '') {
			return;
		}
		this.validateCmyk(e);
		this.setValuesFromCmyk();
		if (this.onValuesChanged) {
			this.onValuesChanged(this);
		}
	},	
*/	_onHsvBlur: function(e) {
		if (e.target.value == '')
			this.setValuesFromRgb();
	},
	_onRgbBlur: function(e) {
		if (e.target.value == '') {
			this.setValuesFromHsv();
		}
	},
	HexBlur: function(e) {
		if (e.target.value == '') {
			this.setValuesFromHsv();
		}
	},
	_onCmykBlur: function(e) {
		if (e.target.value == '') {
			this.setValuesFromCmyk();
		}
	},
	validateRgb: function(e) {
		if (!this._keyNeedsValidation(e)) {
			return e;
		}
		this._redInput.value = this._setValueInRange(this._redInput.value,0,255);
		this._greenInput.value = this._setValueInRange(this._greenInput.value,0,255);
		this._blueInput.value = this._setValueInRange(this._blueInput.value,0,255);
	},
	validateHsv: function(e) {
		if (!this._keyNeedsValidation(e)) {
			return e;
		}
		this._hueInput.value = this._setValueInRange(this._hueInput.value,0,359);
		this._saturationInput.value = this._setValueInRange(this._saturationInput.value,0,100);
		this._valueInput.value = this._setValueInRange(this._valueInput.value,0,100);
	},
	validateHex: function(e) {
		if (!this._keyNeedsValidation(e)) {
			return e;
		}
		var hex = new String(this._hexInput.value).toUpperCase();
		hex = hex.replace(/[^A-F0-9]/g, '0');
		if (hex.length > 6) {
			hex = hex.substring(0, 6);
		}
		this._hexInput.value = hex;
	},
	validateCmyk: function(e) {
		if (!this._keyNeedsValidation(e)) {
			return e;
		}
		this._cyanInput.value = this._setValueInRange(this._cyanInput.value,0,100);
		this._magentaInput.value = this._setValueInRange(this._magentaInput.value,0,100);
		this._yellowInput.value = this._setValueInRange(this._yellowInput.value,0,100);
		this._blackInput.value = this._setValueInRange(this._blackInput.value,0,100);
	},
	_keyNeedsValidation: function(e) {
		if (e.keyCode == 9  || // TAB
			e.keyCode == 16  || // Shift
			e.keyCode == 38 || // Up arrow
			e.keyCode == 29 || // Right arrow
			e.keyCode == 40 || // Down arrow
			e.keyCode == 37    // Left arrow
			||
			(e.ctrlKey && (e.keyCode == 'c'.charCodeAt() || e.keyCode == 'v'.charCodeAt()) )
		) {
			return false;
		} else {
			return true;
		}
	},
	_setValueInRange: function(value, min, max) {
		if (value == '' || isNaN(value)) {	
			return min;
		}

		value = parseInt(value);

		if (value > max) {
			return max;
		} else if (value < min) {
			return min;
		} else {
			return value;
		}
	},
	setValuesFromRgb: function() {
		var newcolor = this.color.setRgb(this._redInput.value, this._greenInput.value, this._blueInput.value);

		this.color.hex = newcolor.hex;

		this.color.r = newcolor.r;
		this.color.g = newcolor.g;
		this.color.b = newcolor.b;

		this.color.h = newcolor.h;
		this.color.s = newcolor.s;
		this.color.v = newcolor.v;

		this.color.c = newcolor.c;
		this.color.m = newcolor.m;
		this.color.y = newcolor.y;
		this.color.k = newcolor.k;

		this._hexInput.value = this.color.hex;

		this._hueInput.value = this.color.h;
		this._saturationInput.value = this.color.s;
		this._valueInput.value = this.color.v;

		this._cyanInput.value = this.color.c;
		this._magentaInput.value = this.color.m;
		this._yellowInput.value = this.color.y;
		this._blackInput.value = this.color.k;
	},
	setValuesFromHsv: function() {
		var newcolor = this.color.setHsv(this._hueInput.value, this._saturationInput.value, this._valueInput.value);

		this.color.hex = newcolor.hex;

		this.color.r = newcolor.r;
		this.color.g = newcolor.g;
		this.color.b = newcolor.b;

		this.color.h = newcolor.h;
		this.color.s = newcolor.s;
		this.color.v = newcolor.v;

		this.color.c = newcolor.c;
		this.color.m = newcolor.m;
		this.color.y = newcolor.y;
		this.color.k = newcolor.k;

		this._hexInput.value = newcolor.hex;

		this._redInput.value = this.color.r;
		this._greenInput.value = this.color.g;
		this._blueInput.value = this.color.b;

		this._cyanInput.value = this.color.c;
		this._magentaInput.value = this.color.m;
		this._yellowInput.value = this.color.y;
		this._blackInput.value = this.color.k;
	},
	setValuesFromHex: function() {
		var newcolor = this.color.setHex(this._hexInput.value);

		this.color.hex = newcolor.hex;

		this.color.r = newcolor.r;
		this.color.g = newcolor.g;
		this.color.b = newcolor.b;

		this.color.h = newcolor.h;
		this.color.s = newcolor.s;
		this.color.v = newcolor.v;

		this.color.c = newcolor.c;
		this.color.m = newcolor.m;
		this.color.y = newcolor.y;
		this.color.k = newcolor.k;

		this._redInput.value = this.color.r;
		this._greenInput.value = this.color.g;
		this._blueInput.value = this.color.b;

		this._hueInput.value = this.color.h;
		this._saturationInput.value = this.color.s;
		this._valueInput.value = this.color.v;

		this._cyanInput.value = this.color.c;
		this._magentaInput.value = this.color.m;
		this._yellowInput.value = this.color.y;
		this._blackInput.value = this.color.k;
	},
	setValuesFromCmyk: function() {
		var newcolor = this.color.setCmyk(this._cyanInput.value, this._magentaInput.value, this._yellowInput.value, this._blackInput.value);

		this.color.hex = newcolor.hex;

		this.color.r = newcolor.r;
		this.color.g = newcolor.g;
		this.color.b = newcolor.b;

		this.color.h = newcolor.h;
		this.color.s = newcolor.s;
		this.color.v = newcolor.v;

		this.color.c = newcolor.c;
		this.color.m = newcolor.m;
		this.color.y = newcolor.y;
		this.color.k = newcolor.k;

		this._hexInput.value = newcolor.hex;

		this._redInput.value = this.color.r;
		this._greenInput.value = this.color.g;
		this._blueInput.value = this.color.b;

		this._hueInput.value = this.color.h;
		this._saturationInput.value = this.color.s;
		this._valueInput.value = this.color.v;
	}
});

var SlidersList = [];

var DefaultSliderSettings = {
	xMinValue: 0,
	xMaxValue: 100,
	yMinValue: 0,
	yMaxValue: 100,
	arrowImage: './img/rangearrows.png',
	isMapPointer: false,
	isIE6: false,
	contEl: 'body'
}

var Slider = new Class({
	_bar: null,
	_arrow: null,

	initialize: function(id, settings) {
	
		this.id = id;
		this.settings = $extend($extend({}, DefaultSliderSettings), settings || {});

		this.xValue = 0;
		this.yValue = 0;
		
		// hook up controls
		this._bar = $(this.id);

		// build controls
		this._arrow = document.createElement('img');
		this._arrow.border = '0';
		this._arrow.src = this.settings.arrowImage;
		this._arrow.margin = '0';
		this._arrow.padding = '0';
		this._arrow.style.position = 'absolute';
		this._arrow.style.top = '0';
		this._arrow.style.left = '0';
		this._arrow.style.zIndex = '99';
		//console.log('isMapPointer: ', this.settings.isMapPointer, ', isIE6: ', this.settings.isIE6);
		if (this.settings.isMapPointer && this.settings.isIE6) {
			this._arrow.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + this.settings.arrowImage + '\');';
			this._arrow.src = this.settings.blankImage;
		}
		//console.log('contEl: ', this.settings.contEl);
		//document.body.appendChild(this._arrow);
		this.contEl = $(this.settings.contEl);
		this.contEl.appendChild(this._arrow);
		this.contOffset = $(this.settings.contEl).getPosition();
		//console.log('x: ', this.contOffset.x, ', y: ', this.contOffset.y);

		// attach 'this' to html objects
		var slider = this;

		this.setPositioningVariables();

		this._bar.addEvent('mousedown', function(e){
			this._bar_mouseDown(e);
		}.bind(this));
		this._arrow.addEvent('mousedown', function(e){
			this._arrow_mouseDown(e);
		}.bind(this));

		// set initial position
		this.setArrowPositionFromValues();

		// fire events
		if(this.onValuesChanged) {
			this.onValuesChanged(this);
		}

		// final setup
		SlidersList.push(this);
	},
	setPositioningVariables: function() {
		// calculate sizes and ranges
		// BAR

		this._barWidth = this._bar.getWidth();
		this._barHeight = this._bar.getHeight();

		var pos = this._bar.getPosition(this.contEl);
		this._barTop = pos.y;
		this._barLeft = pos.x;

		this._barBottom = this._barTop + this._barHeight;
		this._barRight = this._barLeft + this._barWidth;

		// ARROW
		this._arrow = $(this._arrow);
		this._arrowWidth = this._arrow.getWidth();
		this._arrowHeight = this._arrow.getHeight();

		// MIN & MAX
		this.MinX = this._barLeft;
		this.MinY = this._barTop;

		this.MaxX = this._barRight;
		this.MinY = this._barBottom;
	},
	
	setArrowPositionFromValues: function(e) {
		this.setPositioningVariables();

		// sets the arrow position from XValue and YValue properties

		var arrowOffsetX = 0;
		var arrowOffsetY = 0;

		// X Value/Position
		if (this.settings.xMinValue != this.settings.xMaxValue) {

			if (this.xValue == this.settings.xMinValue) {
				arrowOffsetX = 0;
			} else if (this.xValue == this.settings.xMaxValue) {
				arrowOffsetX = this._barWidth-1;
			} else {
				var xMax = this.settings.xMaxValue;

				if (this.settings.xMinValue < 1)  {
					xMax = xMax + Math.abs(this.settings.xMinValue) + 1;
				}

				var xValue = this.xValue;

				if (this.xValue < 1) {
					xValue = xValue + 1;
				}

				arrowOffsetX = xValue / xMax * this._barWidth;

				if (parseInt(arrowOffsetX) == (xMax-1)) {
					arrowOffsetX=xMax;
				} else {
					arrowOffsetX=parseInt(arrowOffsetX);
				}

				// shift back to normal values
				if (this.settings.xMinValue < 1)  {
					arrowOffsetX = arrowOffsetX - Math.abs(this.settings.xMinValue) - 1;
				}
			}
		}

		// Y Value/Position
		if (this.settings.yMinValue != this.settings.yMaxValue) {	
			
			if (this.yValue == this.settings.yMinValue) {
				arrowOffsetY = 0;
			} else if (this.yValue == this.settings.yMaxValue) {
				arrowOffsetY = this._barHeight-1;
			} else {
				var yMax = this.settings.yMaxValue;

				if (this.settings.yMinValue < 1)  {
					yMax = yMax + Math.abs(this.settings.yMinValue) + 1;
				}

				var yValue = this.yValue;

				if (this.yValue < 1) {
					yValue = yValue + 1;
				}

				var arrowOffsetY = yValue / yMax * this._barHeight;

				if (parseInt(arrowOffsetY) == (yMax-1)) { 
					arrowOffsetY=yMax;
				} else{ 
					arrowOffsetY=parseInt(arrowOffsetY);
				}

				if (this.settings.yMinValue < 1)  {
					arrowOffsetY = arrowOffsetY - Math.abs(this.settings.yMinValue) - 1;
				}
			}
		}

		this._setArrowPosition(arrowOffsetX, arrowOffsetY);

	},
	_setArrowPosition: function(offsetX, offsetY) {
		// validate
		if (offsetX < 0) offsetX = 0
		if (offsetX > this._barWidth) offsetX = this._barWidth;
		if (offsetY < 0) offsetY = 0
		if (offsetY > this._barHeight) offsetY = this._barHeight;	

		var posX = this._barLeft + offsetX;
		var posY = this._barTop + offsetY;

		// check if the arrow is bigger than the bar area
		if (this._arrowWidth > this._barWidth) {
			posX = posX - (this._arrowWidth/2 - this._barWidth/2);
		} else {
			posX = posX - parseInt(this._arrowWidth/2);
		}
		if (this._arrowHeight > this._barHeight) {
			posY = posY - (this._arrowHeight/2 - this._barHeight/2);
		} else {
			posY = posY - parseInt(this._arrowHeight/2);
		}
		this._arrow.style.left = posX + 'px';
		this._arrow.style.top = posY + 'px';	
	},
	_bar_mouseDown: function(e) {
		this._mouseDown(e);
	},
	_arrow_mouseDown: function(e) {
		this._mouseDown(e);
	},
	_mouseDown: function(e) {
		e.stop();
		ActiveSlider = this;

		this.setValuesFromMousePosition(e);

		document.addEvent('mousemove', function(e){
			this._docMouseMove(e);
		}.bind(this));

		document.addEvent('mouseup', function(e){
			this._docMouseUp(e);
		}.bind(this));
	},
	_docMouseMove: function(e) {
		e.stop();
		this.setValuesFromMousePosition(e);
	},
	_docMouseUp: function(e) {
		e.stop();
		document.removeEvents('mouseup');
		document.removeEvents('mousemove');
		// pulls values from RGB fields and makes data request
		productResultsReq.makeRequest();
	},	
	setValuesFromMousePosition: function(e) {
		
		var mouse = {};
		mouse.x = e.page.x - this.contOffset.x + 1;
		mouse.y = e.page.y - this.contOffset.y + 1;

		var relativeX = 0;
		var relativeY = 0;

		// mouse relative to object's top left
		if (mouse.x < this._barLeft)
			relativeX = 0;
		else if (mouse.x > this._barRight)
			relativeX = this._barWidth;
		else
			relativeX = mouse.x - this._barLeft + 1;

		if (mouse.y < this._barTop)
			relativeY = 0;
		else if (mouse.y > this._barBottom)
			relativeY = this._barHeight;
		else
			relativeY = mouse.y - this._barTop + 1;
			

		var newXValue = parseInt(relativeX / this._barWidth * this.settings.xMaxValue);
		var newYValue = parseInt(relativeY / this._barHeight * this.settings.yMaxValue);

		// set values
		this.xValue = newXValue;
		this.yValue = newYValue;	

		// position arrow
		if (this.settings.xMaxValue == this.settings.xMinValue)
			relativeX = 0;
		if (this.settings.yMaxValue == this.settings.yMinValue)
			relativeY = 0;		
		this._setArrowPosition(relativeX, relativeY);

		// fire events
		if(this.onValuesChanged) {
			this.onValuesChanged(this);
		}
	}
});


var DefaultColorPickerSettings = {
	'startMode': 'h',
	'startHex': 'ff0000',
	'clientFilesPath': '../img/'
};

var ColorPicker = new Class({
	initialize: function(id, settings) {
		// rate limiter for event calls
		var hitTimer, hitRate = 500;

		this.id = id;
		this.settings = $extend($extend({}, DefaultColorPickerSettings), settings || {});

		// attach radio & check boxes
		this._hueRadio = $(this.id + '_HueRadio');
		this._saturationRadio = $(this.id + '_SaturationRadio');
		this._valueRadio = $(this.id + '_BrightnessRadio');

		this._redRadio = $(this.id + '_RedRadio');
		this._greenRadio = $(this.id + '_GreenRadio');
		this._blueRadio = $(this.id + '_BlueRadio');

		this._hueRadio.value = 'h';
		this._saturationRadio.value = 's';
		this._valueRadio.value = 'v';

		this._redRadio.value = 'r';
		this._greenRadio.value = 'g';
		this._blueRadio.value = 'b';

		// attach events to radio & checks

		this._hueRadio.addEvent('click', function(e){
			this._onRadioClicked(e);
		}.bind(this));
		this._saturationRadio.addEvent('click', function(e){
			this._onRadioClicked(e);
		}.bind(this));
		this._valueRadio.addEvent('click', function(e){
			this._onRadioClicked(e);
		}.bind(this));

		this._redRadio.addEvent('click', function(e){
			this._onRadioClicked(e);
		}.bind(this));
		this._greenRadio.addEvent('click', function(e){
			this._onRadioClicked(e);
		}.bind(this));
		this._blueRadio.addEvent('click', function(e){
			this._onRadioClicked(e);
		}.bind(this));

		// attach simple properties
		this._preview = $(this.id + '_Preview');

		// MAP
		this._mapBase = $(this.id + '_ColorMap');
		this._mapBase.setStyles({
			'float': 'left',
			'height': '256px',
			'margin': '0',
			'padding': '0',
			'width': '256px'
		});

		this._mapL1 = new Element('img', {
			'src': this.settings.clientFilesPath + 'blank.png',
			'width': '256',
			'height': '256',
			'styles': {
				'display': 'block',
				'margin': '0',
				'overflow': 'hidden'
			}
		}).inject(this._mapBase);
	
		this._mapL2 = new Element('img', {
			'src': this.settings.clientFilesPath + 'blank.png',
			'width': '256',
			'height': '256',
			'styles': {
				'clear': 'both',
				'display': 'block',
				'margin': '-256px 0 0 0',
				'overflow': 'hidden'
			}
		}).set('opacity', '.5').inject(this._mapBase);

		// BAR
		this._bar = $(this.id + '_ColorBar');
		this._bar.setStyles({
			'float': 'left',
			'padding': '0',
			'margin': '0 12px',
			'padding': '0',
			'height': '256px',
			'width': '20px'
		});

		this._barL1 = new Element('img', {
			'src': this.settings.clientFilesPath + 'blank.png',
			'width': '20',
			'height': '256',
			'styles': {
				'display': 'block',
				'margin': '0',
				'overflow': 'hidden'
			}
		}).inject(this._bar);

		this._barL2 = new Element('img', {
			'src': this.settings.clientFilesPath + 'blank.png',
			'width': '20',
			'height': '256',
			'styles': {
				'display': 'block',
				'margin': '-256px 0 0 0',
				'overflow': 'hidden'
			}
		}).inject(this._bar);

		this._barL3 = new Element('img', {
			'src': this.settings.clientFilesPath + 'blank.png',
			'width': '20',
			'height': '256',
			'styles': {
				'background-color': '#ff0000',
				'display': 'block',
				'margin': '-256px 0 0 0',
				'overflow': 'hidden'
			}
		}).inject(this._bar);

		this._barL4 = new Element('img', {
			'src': this.settings.clientFilesPath + 'bar-brightness.png',
			'width': '20',
			'height': '256',
			'styles': {
				'display': 'block',
				'margin': '-256px 0 0 0',
				'overflow': 'hidden'
			}
		}).inject(this._bar);

		// browser!
		this.isLessThanIE7 = false;
		var version = parseFloat(navigator.appVersion.split("MSIE")[1]);
		if ((version < 7) && (document.body.filters))
			this.isLessThanIE7 = true;
		
		// attach map slider
		var mappointer = 'mappoint-magnifier-sm.png';
		var containerElement = 'colorPicker';
			
		this._map = new Slider(this._mapL2, {'xMaxValue': 255, 'yMinValue': 255, 'arrowImage': this.settings.clientFilesPath + mappointer, 'isIE6': this.isLessThanIE7, 'blankImage': this.settings.clientFilesPath + 'blank.png', 'isMapPointer': true, 'contEl': containerElement});

		// attach color slider
		this._slider = new Slider(this._barL4, {'xMinValue': 1, 'xMaxValue': 1, 'yMinValue': 255, 'arrowImage': this.settings.clientFilesPath + 'rangearrows.png', 'isIE6': false, 'blankImage': this.settings.clientFilesPath + 'blank.png', 'isMapPointer': false, 'contEl': containerElement});

		// attach color values
		this._cvp = new ColorValuePicker(this.id);
		
		// add in submit button for IE6
/*		if (this.isLessThanIE7) {
			var colorPickerContainer = document.getElementById('colorPicker');
			valuesSubmitButton = document.createElement('input');
			valuesSubmitButton.id = 'ie6CPSubmit';
			valuesSubmitButton.type = 'submit';		
			valuesSubmitButton.value = 'Submit';
			colorPickerContainer.appendChild(valuesSubmitButton);
			var cpValueSubmit = $('ie6CPSubmit');
			cpValueSubmit.addEvent('click', function () { productResultsReq.makeRequest(); });
		}

*/		// link up events
		var cp = this;
		
		this._slider.onValuesChanged = function() { cp.sliderValueChanged() };
		this._map.onValuesChanged = function() { cp.mapValueChanged(); }
		this._cvp.onValuesChanged = function() { cp.textValuesChanged(); }

		// initialize values
		this.setColorMode(this.settings.startMode);
		if (this.settings.startHex) {
			this._cvp._hexInput.value = this.settings.startHex;
		}
		this._cvp.setValuesFromHex();
		this.positionMapAndSliderArrows();
		this.updateVisuals();
		
		this.color = null;
	},
	show: function() {
		this._map.Arrow.style.display = '';
		this._slider.Arrow.style.display = '';
		this._map.setPositioningVariables();
		this._slider.setPositioningVariables();
		this.positionMapAndSliderArrows();
	},
	hide: function() {
		this._map.Arrow.style.display = 'none';
		this._slider.Arrow.style.display = 'none';
	},
	_onRadioClicked: function(e) {
		this.setColorMode(e.target.value);
	},
	textValuesChanged: function() {
		this.positionMapAndSliderArrows();
		this.updateVisuals();
		productResultsReq.makeRequest();
	},
	setColorMode: function(colorMode) {

		this.color = this._cvp.color;
		
		// reset all images		
		function resetImage(cp, img) {
			cp.setAlpha(img, 100);	
			img.style.backgroundColor = '';
			img.src = cp.settings.clientFilesPath + 'blank.png';
			img.style.filter = '';
		}
		resetImage(this, this._mapL1);
		resetImage(this, this._mapL2);
		resetImage(this, this._barL1);
		resetImage(this, this._barL2);
		resetImage(this, this._barL3);
		resetImage(this, this._barL4);

		this._hueRadio.checked = false;
		this._saturationRadio.checked = false;
		this._valueRadio.checked = false;
		this._redRadio.checked = false;
		this._greenRadio.checked = false;
		this._blueRadio.checked = false;
	

		switch (colorMode) {
			case 'h':
				this._hueRadio.checked = true;

				// MAP
				// put a color layer on the bottom
				this._mapL1.style.backgroundColor = '#' + this.color.hex;				

				// add a hue map on the top
				this._mapL2.style.backgroundColor = 'transparent';
				this.setImg(this._mapL2, this.settings.clientFilesPath + 'map-hue.png');
				this.setAlpha(this._mapL2, 100);

				// SLIDER
				// simple hue map
				this.setImg(this._barL4,this.settings.clientFilesPath + 'bar-hue.png');

				this._map.settings.xMaxValue = 100;
				this._map.settings.yMaxValue = 100;
				this._slider.settings.yMaxValue = 359;

				break;
				
			case 's':
				this._saturationRadio.checked = true;			

				// MAP
				// bottom has saturation map
				this.setImg(this._mapL1, this.settings.clientFilesPath + 'map-saturation.png');

				// top has overlay
				this.setImg(this._mapL2, this.settings.clientFilesPath + 'map-saturation-overlay.png');
				this.setAlpha(this._mapL2,0);

				// SLIDER
				// bottom: color
				this.setBG(this._barL3, this.color.hex);
				
				// top: graduated overlay
				this.setImg(this._barL4, this.settings.clientFilesPath + 'bar-saturation.png');
				

				this._map.settings.xMaxValue = 359;
				this._map.settings.yMaxValue = 100;
				this._slider.settings.yMaxValue = 100;

				break;
				
			case 'v':
				this._valueRadio.checked = true;			

				// MAP
				// bottom: nothing
				
				// top
				this.setBG(this._mapL1,'000');
				this.setImg(this._mapL2, this.settings.clientFilesPath + 'map-brightness.png');				
				
				// SLIDER
				// bottom
				this._barL3.style.backgroundColor = '#' + this.color.hex;
				
				// top				
				this.setImg(this._barL4, this.settings.clientFilesPath + 'bar-brightness.png');
				

				this._map.settings.xMaxValue = 359;
				this._map.settings.yMaxValue = 100;
				this._slider.settings.yMaxValue = 100;
				break;
				
			case 'r':
				this._redRadio.checked = true;
				this.setImg(this._mapL2, this.settings.clientFilesPath + 'map-red-max.png');
				this.setImg(this._mapL1, this.settings.clientFilesPath + 'map-red-min.png');
				
				this.setImg(this._barL4, this.settings.clientFilesPath + 'bar-red-tl.png');
				this.setImg(this._barL3, this.settings.clientFilesPath + 'bar-red-tr.png');
				this.setImg(this._barL2, this.settings.clientFilesPath + 'bar-red-br.png');
				this.setImg(this._barL1, this.settings.clientFilesPath + 'bar-red-bl.png');				
				
				break;

			case 'g':
				this._greenRadio.checked = true;
				this.setImg(this._mapL2, this.settings.clientFilesPath + 'map-green-max.png');
				this.setImg(this._mapL1, this.settings.clientFilesPath + 'map-green-min.png');
				
				this.setImg(this._barL4, this.settings.clientFilesPath + 'bar-green-tl.png');
				this.setImg(this._barL3, this.settings.clientFilesPath + 'bar-green-tr.png');
				this.setImg(this._barL2, this.settings.clientFilesPath + 'bar-green-br.png');
				this.setImg(this._barL1, this.settings.clientFilesPath + 'bar-green-bl.png');				
				
				break;
				
			case 'b':
				this._blueRadio.checked = true;
				this.setImg(this._mapL2, this.settings.clientFilesPath + 'map-blue-max.png');
				this.setImg(this._mapL1, this.settings.clientFilesPath + 'map-blue-min.png');
				
				this.setImg(this._barL4, this.settings.clientFilesPath + 'bar-blue-tl.png');
				this.setImg(this._barL3, this.settings.clientFilesPath + 'bar-blue-tr.png');
				this.setImg(this._barL2, this.settings.clientFilesPath + 'bar-blue-br.png');
				this.setImg(this._barL1, this.settings.clientFilesPath + 'bar-blue-bl.png');
				
				//this.setImg(this._barL4, this.settings.clientFilesPath + 'bar-hue.png');			
				
				break;
				
			default:
				alert('invalid mode');
				break;
		}
		
		switch (colorMode) {
			case 'h':
			case 's':
			case 'v':
			
				this._map.settings.xMinValue = 1;
				this._map.settings.yMinValue = 1;				
				this._slider.settings.yMinValue = 1;
				break;
				
			case 'r':
			case 'g':
			case 'b':
			
				this._map.settings.xMinValue = 0;
				this._map.settings.yMinValue = 0;				
				this._slider.settings.yMinValue = 0;					
				
				this._map.settings.xMaxValue = 255;
				this._map.settings.yMaxValue = 255;				
				this._slider.settings.yMaxValue = 255;	
				break;
		}
				
		this.ColorMode = colorMode;

		this.positionMapAndSliderArrows();
		
		this.updateMapVisuals();
		this.updateSliderVisuals();
	},
	mapValueChanged: function() {
		// update values

		switch(this.ColorMode) {
			case 'h':
				this._cvp._saturationInput.value = this._map.xValue;
				this._cvp._valueInput.value = 100 - this._map.yValue;
				break;
				
			case 's':
				this._cvp._hueInput.value = this._map.xValue;
				this._cvp._valueInput.value = 100 - this._map.yValue;
				break;
				
			case 'v':
				this._cvp._hueInput.value = this._map.xValue;
				this._cvp._saturationInput.value = 100 - this._map.yValue;
				break;
								
			case 'r':
				this._cvp._blueInput.value = this._map.xValue;
				this._cvp._greenInput.value = 256 - this._map.yValue;
				break;
				
			case 'g':
				this._cvp._blueInput.value = this._map.xValue;
				this._cvp._redInput.value = 256 - this._map.yValue;
				break;
				
			case 'b':
				this._cvp._redInput.value = this._map.xValue;
				this._cvp._greenInput.value = 256 - this._map.yValue;
				break;				
		}
		
		switch(this.ColorMode) {
			case 'h':
			case 's':
			case 'v':
				this._cvp.setValuesFromHsv();
				break;
				
			case 'r':
			case 'g':
			case 'b':
				this._cvp.setValuesFromRgb();
				break;				
		}		

		
		this.updateVisuals();
	},
	sliderValueChanged: function() {
		
		switch(this.ColorMode) {
			case 'h':
				this._cvp._hueInput.value = 360 - this._slider.yValue;
				break;
			case 's':
				this._cvp._saturationInput.value = 100 - this._slider.yValue;
				break;
			case 'v':
				this._cvp._valueInput.value = 100 - this._slider.yValue;
				break;
				
			case 'r':
				this._cvp._redInput.value = 255 - this._slider.yValue;
				break;
			case 'g':
				this._cvp._greenInput.value = 255 - this._slider.yValue;
				break;
			case 'b':
				this._cvp._blueInput.value = 255 - this._slider.yValue;
				break;				
		}
		
		switch(this.ColorMode) {
			case 'h':
			case 's':
			case 'v':
				this._cvp.setValuesFromHsv();
				break;
				
			case 'r':
			case 'g':
			case 'b':
				this._cvp.setValuesFromRgb();
				break;				
		}		

		this.updateVisuals();
	},
	positionMapAndSliderArrows: function() {
		this.color = this._cvp.color;
		
		// Slider
		var sliderValue = 0;
		switch(this.ColorMode) {
			case 'h':
				sliderValue = 360 - this.color.h;
				break;
			
			case 's':
				sliderValue = 100 - this.color.s;
				break;
				
			case 'v':
				sliderValue = 100 - this.color.v;
				break;
				
			case 'r':
				sliderValue = 255- this.color.r;
				break;
			
			case 'g':
				sliderValue = 255- this.color.g;
				break;
				
			case 'b':
				sliderValue = 255- this.color.b;
				break;				
		}	
		
		this._slider.yValue = sliderValue;
		this._slider.setArrowPositionFromValues();

		// color map
		var mapXValue = 0;
		var mapYValue = 0;
		switch(this.ColorMode) {
			case 'h':
				mapXValue = this.color.s;
				mapYValue = 100 - this.color.v;
				break;
				
			case 's':
				mapXValue = this.color.h;
				mapYValue = 100 - this.color.v;
				break;
				
			case 'v':
				mapXValue = this.color.h;
				mapYValue = 100 - this.color.s;
				break;
				
			case 'r':
				mapXValue = this.color.b;
				mapYValue = 256 - this.color.g;
				break;
				
			case 'g':
				mapXValue = this.color.b;
				mapYValue = 256 - this.color.r;
				break;
				
			case 'b':
				mapXValue = this.color.r;
				mapYValue = 256 - this.color.g;
				break;				
		}
		this._map.xValue = mapXValue;
		this._map.yValue = mapYValue;
		this._map.setArrowPositionFromValues();
	},
	updateVisuals: function() {
		this.updatePreview();
		this.updateMapVisuals();
		this.updateSliderVisuals();
	},
	updatePreview: function() {
		try {
			this._preview.style.backgroundColor = '#' + this._cvp.color.hex;
		} catch (e) {}
	},
	updateMapVisuals: function() {
		
		this.color = this._cvp.color;
		
		switch(this.ColorMode) {
			case 'h':
				// fake color with only hue				
				this.setBG(this._mapL1, this.color.hex);
				break;
				
			case 's':
				this.setAlpha(this._mapL2, 100 - this.color.s);
				break;
				
			case 'v':
				this.setAlpha(this._mapL2, this.color.v);
				break;
				
			case 'r':								
				this.setAlpha(this._mapL2, this.color.r/256*100);
				break;
				
			case 'g':
				this.setAlpha(this._mapL2, this.color.g/256*100);
				break;
				
			case 'b':
				this.setAlpha(this._mapL2, this.color.b/256*100);
				break;				
		}
	},
	updateSliderVisuals: function() {
	
		this.color = this._cvp.color;
		
		switch(this.ColorMode) {
			case 'h':
				break;
				
			case 's':
				this.setBG(this._barL3, this.color.hex);
				break;
				
			case 'v':
				this.setBG(this._barL3, this.color.hex);
				break;
			case 'r':
			case 'g':				
			case 'b':
			
				var hValue = 0;
				var vValue = 0;
				
				if (this.ColorMode == 'r') {
					hValue = this._cvp._blueInput.value;
					vValue = this._cvp._greenInput.value;
				} else if (this.ColorMode == 'g') {
					hValue = this._cvp._blueInput.value;
					vValue = this._cvp._redInput.value;
				} else if (this.ColorMode == 'b') {
					hValue = this._cvp._redInput.value;
					vValue = this._cvp._greenInput.value;
				}
			
				var horzPer = (hValue /256)*100;
				var vertPer = ( vValue/256)*100;
				
				var horzPerRev = ( (256-hValue)/256)*100;
				var vertPerRev = ( (256-vValue)/256)*100;
										
				this.setAlpha(this._barL4, (vertPer>horzPerRev) ? horzPerRev : vertPer);
				this.setAlpha(this._barL3, (vertPer>horzPer) ? horzPer : vertPer); 
				this.setAlpha(this._barL2, (vertPerRev>horzPer) ? horzPer : vertPerRev);
				this.setAlpha(this._barL1, (vertPerRev>horzPerRev) ? horzPerRev : vertPerRev);
			
				break;
							
			
		}
	},
	setBG: function(el, c) {
		try {
			el.style.backgroundColor = '#' + c;
		} catch (e) {}
	},
	setImg: function(img, src) {
		if (src.indexOf('png') && this.isLessThanIE7) {
			img.pngSrc = src;
			img.src = this.settings.clientFilesPath + 'blank.png';
			img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\');';
		} else {
			img.src = src;
		}
	},
	setAlpha: function(obj, alpha) {
		if (alpha == 0) {
			alpha = .1;
		}
		if (this.isLessThanIE7) {
			var src = obj.pngSrc;
			// exception for the hue map
			if (src != null && src.indexOf('map-hue') == -1) {
				obj.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\') progid:DXImageTransform.Microsoft.Alpha(opacity=' + alpha + ')';	
			}
		} else {
			obj.set('opacity', alpha/100);		
		}
	}
});
