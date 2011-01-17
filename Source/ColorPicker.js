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

var ColorPicker = new Class({

	Implements: [Options, Events],

	options: {
		'element': 'colorPicker',		// element to contain ColorPicker UI
		'prefix': 'cp1_',			// prefix for HTML elements
		'input': ['rgb','hex'],	// ['rgb','hex','hsv'] which inputs to show/accept
		'initColor': '#ff0000',	// starting color
		'imgPath': '../../Source/img/',		// where the ColorPicker images are, relative to page or absolute
		'lockTip': 'Select to modify only this value.',	// title attribute for lock radio buttons
		'applyDefaultStyles': true	// set to false when using your own CSS styles
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
	},

	buildPickerHTML: function() {
		var prefix = this.options.prefix;
		
		this.colorMap = new Element('div', {
			id: prefix + 'colorMap'
		}).inject(this.element);
		
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
				html: key
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
			that.inputs[val]['label'].inject(container).grab(that.inputs[val]['val']);
			that.inputs[val]['wrapper'].inject(container).adopt(that.inputs[val]['lock'], that.inputs[val]['label']);
		});
	},
	
	buildHTMLStyles: function() {
		var prefix = this.options.prefix;
		
		if (this.options.applyDefaultStyles) {
			$$('.' + prefix + 'Lock').each(function(el) {
				el.setStyles({
					width: '1.5em'
				});
			});
			$$('.' + prefix + 'Val').each(function(el) {
				el.setStyles({
					marginLeft: '.2em',
					width: '3.5em'
				});
			});
			$$('.' + prefix + 'Label').each(function(el) {
				el.setStyles({
					width: '7em',
					textAlign: 'right'
				});
			})
			
		}
	}
	
});
