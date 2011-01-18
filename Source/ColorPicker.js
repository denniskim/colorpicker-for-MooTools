/*
---
description: Photoshop-style color picker.

license: MIT-style

authors:
- Dennis Kim
- Scott Boyce

requires:
- core/1.3: '*'
- more/1.3: Drag.Slider
- more/1.3: Utilities.Color
- more/1.3: Drag.Slider

provides: ColorPicker

...
*/

/*…*/
var Slider2d = new Class({
	
	Implements: [Options, Events],
	
	options: {
		xMin: 0,
		xMax: 255,
		yMin: 0,
		yMax: 255,
		element: 'cp1_colorMap',
		prefix: 'cp1_'	
	},
	
	initialize: function(pointer, options) {
		this.pointer = pointer;
		this.setOptions(options);
		
		this.xVal = 50;
		this.yVal = 50;
		
		this.map = document.id(this.options.element);
		
		this.setPositioningVariables();
		this.setPointerPositionFromValues();
	},
	
	setPositioningVariables: function() {
		// {height, width, top, right, bottom, left}
		this.mapCrds = this.map.getCoordinates(this.map.getOffsetParent);
		console.log(this.mapCrds);

		this.pointerCrds = this.pointer.getCoordinates();
		console.log(this.pointerCrds);
	},
	
	setPointerPositionFromValues: function(e) {
		// sets the pointer position from XValue and YValue properties
		var pointerOffsetX = 0;
		var pointerOffsetY = 0;

		// X Value/Position
		if (this.options.xMin !== this.options.xMax) {

			if (this.xVal === this.options.xMin) {
				pointerOffsetX = 0;
			} else if (this.xVal === this.options.xMax) {
				pointerOffsetX = this.mapCrds.width - 1;
			} else {
				var xMax = this.options.xMax;

				if (this.options.xMin < 1)  {
					xMax = xMax + Math.abs(this.options.xMin) + 1;
				}

				var xVal = this.xVal;

				if (this.xVal < 1) {
					xVal = xVal + 1;
				}

				pointerOffsetX = xVal / xMax * this.mapCrds.width;

				if (parseInt(pointerOffsetX, 10) === (xMax - 1)) {
					pointerOffsetX = xMax;
				} else {
					pointerOffsetX = parseInt(pointerOffsetX, 10);
				}

				// shift back to normal values
				if (this.options.xMin < 1)  {
					pointerOffsetX = pointerOffsetX - Math.abs(this.options.xMin) - 1;
				}
			}
		}

		// Y Value/Position
		if (this.options.yMin !== this.options.yMax) {	
			
			if (this.yVal === this.options.yMin) {
				pointerOffsetY = 0;
			} else if (this.yVal === this.options.yMax) {
				pointerOffsetY = this.mapCrds.height - 1;
			} else {
				var yMax = this.options.yMax;

				if (this.options.yMin < 1) {
					yMax = yMax + Math.abs(this.options.yMin) + 1;
				}

				var yVal = this.yVal;

				if (this.yVal < 1) {
					yVal = yVal + 1;
				}

				pointerOffsetY = yVal / yMax * this.mapCrds.height;

				if (parseInt(pointerOffsetY, 10) === (yMax - 1)) { 
					pointerOffsetY = yMax;
				} else{ 
					pointerOffsetY = parseInt(pointerOffsetY, 10);
				}

				if (this.options.yMin < 1)  {
					pointerOffsetY = pointerOffsetY - Math.abs(this.options.yMin) - 1;
				}
			}
		}

		this._setPointerPosition(pointerOffsetX, pointerOffsetY);
	},
	
	_setPointerPosition: function(offsetX, offsetY) {
		console.log('offsetX: '+offsetX+', offsetY: '+offsetY);
		// check/enforce bounds
		if (offsetX < 0) {
			offsetX = 0;
		}
		if (offsetX > this.mapCrds.width) {
			offsetX = this.mapCrds.width;
		}
		if (offsetY < 0) {
			offsetY = 0;
		}
		if (offsetY > this.mapCrds.height) {
			offsetY = this.mapCrds.height;
		}

		var posX = this.mapCrds.left + offsetX;
		var posY = this.mapCrds.top + offsetY;

		// check if the arrow is bigger than the bar area
		if (this.pointerCrds.width > this.mapCrds.width) {
			posX = posX - (this.pointerCrds.width / 2 - this.mapCrds.width / 2);
		} else {
			posX = posX - parseInt(this.pointerCrds.width / 2, 10);
		}
		if (this.pointerCrds.height > this.mapCrds.height) {
			posY = posY - (this.pointerCrds.height / 2 - this.mapCrds.height / 2);
		} else {
			posY = posY - parseInt(this.pointerCrds.height / 2, 10);
		}
		this.pointer.setStyles({
			left: posX + 'px',
			top: posY + 'px'
		});
		console.log('posX: '+posX+', posY: '+posY);
	},
	
});

var ColorPicker = new Class({

	Implements: [Options, Events],

	options: {
		element: 'colorPicker',		// element to contain ColorPicker UI
		prefix: 'cp1_',			// prefix for HTML elements
		input: ['rgb','hex'],	// ['rgb','hex','hsv'] which inputs to show/accept
		initColor: '#ff0000',	// starting color
		imgPath: '../Source/img/',		// where the ColorPicker images are, relative to page or absolute
		lockTip: 'Select to modify only this value.',	// title attribute for lock radio buttons
		applyDefaultStyles: true	// set to false when using your own CSS styles
	},

	initialize: function(options) {
		this.setOptions(options);

		this.element = document.id(this.options.element);
		
		this.inputs = {
			R: {
				name: 'Red'
				// properties to be defined in .buildInputsHTML
				// lock: radio button to lock value
				// val: numerical input/display
				// label: field label
				// wrapper: wrapping block element
			},
			G: {name: 'Green'},
			B: {name: 'Blue'},
			H: {name: 'Hue'},
			S: {name: 'Saturation'},
			V: {name: 'Value'}
		};
		
		this.buildPickerHTML();
		this.buildInputsHTML();
		this.buildHTMLStyles();
		
		this.mapSlider = new Slider2d(this.pointer, {
			element: this.colorMap,
			prefix: this.options.prefix
		});
	},

	buildPickerHTML: function() {
		var prefix = this.options.prefix;
		
		this.colorMap = new Element('div', {
			id: prefix + 'colorMap',
			styles: {
				margin: '15px',
				padding: '0',
				width: '256px',
				height: '256px',
				border: '0 none',
				backgroundColor: '#335533',
				position: 'relative'
			}
		}).inject(this.element);
		
		this.pointer = new Element('div', {
			id: this.options.prefix + 'pointer',
			styles: {
				background: "transparent url('" + this.options.imgPath + "mappoint.png') no-repeat 0 0",
				margin: '0',
				padding: '0',
				width: '15px',
				height: '15px',
				border: '0 none',
				position: 'absolute',
				top: '0',
				left: '0'
			}			
		}).inject(this.colorMap);
		
		this.colorBar = new Element('div', {
			id: prefix + 'colorBar'
		}).inject(this.element);
		
		this.rgbContainer = new Element('div', {
			id: prefix + 'rgbContainer',
			styles: {
				position: 'relative'
			}
		}).inject(this.element);
		
		this.hsvContainer = new Element('div', {
			id: prefix + 'hsvContainer',
			styles: {
				position: 'relative'
			}
		}).inject(this.element);
		
		return this;
	},
	
	buildInputsHTML: function() {
		var that = this;
		var prefix = this.options.prefix;
		
		Object.each(this.inputs, function(val, key) {
			that.inputs[key]['lock'] = new Element('input', {
				id: prefix + key + 'Lock',
				'class': prefix + 'Lock',
				name: prefix + 'mode',
				type: 'radio',
				title: that.options.lockTip
			});
			that.inputs[key]['val'] = new Element('input', {
				id: prefix + key + 'Val',
				'class': prefix + 'Val',
				type: 'text',
				value: '0',
				maxlength: '3'
			});
			that.inputs[key]['label'] = new Element('label', {
				id: prefix + key + 'Label',
				'class': prefix + 'Label',
				'for': prefix + key + 'Val',
				html: '<abbr title="' + that.inputs[key]['name'] + '">' + key + '</abbr>'
			});
			that.inputs[key]['wrapper'] = new Element('p', {
				id: prefix + key + 'InputWrapper',
				'class': prefix + 'InputWrapper'
			});
		});
		
		['R','G','B','H','S','V'].each(function(val, idx) {
			var container = '';
			
			if (idx < 3) {
				container = that.rgbContainer;
			} else {
				container = that.hsvContainer;
			}
			that.inputs[val]['lock'].inject(container);
			that.inputs[val]['val'].inject(container);
			that.inputs[val]['label'].inject(container);
			that.inputs[val]['wrapper'].inject(container).adopt(that.inputs[val]['lock'], that.inputs[val]['label'], that.inputs[val]['val']);
		});
	},
	
	buildHTMLStyles: function() {
		var prefix = this.options.prefix;
		
		if (this.options.applyDefaultStyles) {
			$$('.' + prefix + 'Lock').each(function(el) {
				el.setStyles({
					margin: '0 5px 0 0',
					padding: '0',
					width: '10px'
				});
			});
			$$('.' + prefix + 'Val').each(function(el) {
				el.setStyles({
					margin: '0 0 0 5px',
					padding: '0',
					width: '30px'
				});
			});
			$$('.' + prefix + 'Label').each(function(el) {
				el.setStyles({
					margin: '0',
					padding: '0',
					fontFamily: 'monospace',
					fontSize: '12px'
				});
			});
			$$('.' + prefix + 'InputWrapper').each(function(el) {
				el.setStyles({
					margin: '0',
					padding: '0',
					width: '70px'
				});
			});
			
		}
	}
	
});
