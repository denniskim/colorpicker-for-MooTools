/*
---
description: Photoshop-style color picker.

license: MIT-style

authors:
- Dennis Kim
- Scott Boyce

requires:
- core/1.3: '*'
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
		
		this.buildPickerHTML(this.options.prefix);
		this.buildRgbHTML(this.options.prefix);
	},

	buildPickerHTML: function(prefix) {
		this.colorMap = new Element('div', {
			id: prefix + 'colorMap'
		}).inject(this.element);
		
		this.colorBar = new Element('div', {
			id: prefix + 'colorBar'
		}).inject(this.element);
		
		return this;
	},
	
	buildRgbHTML: function(prefix) {
		this.rgbContainer = new Element('div', {
			id: prefix + 'rgbContainer',
			styles: {
				position: 'relative'
			}
		}).inject(this.element);
		
		this.rgbRedLock = new Element('input', {
			id: prefix + 'rgbRedLock',
			'class': prefix + 'rgbLock',
			name: prefix + 'mode',
			type: 'radio',
			title: this.options.lockTip
		}).inject(this.rgbContainer);
		this.rgbRedVal = new Element('input', {
			id: prefix + 'rgbRedVal',
			'class': prefix + 'rgbVal',
			type: 'text',
			value: '0',
			maxlength: '3'
		}).inject(this.rgbContainer);
		this.rgbRedLabel = new Element('label', {
			id: prefix + 'rgbRedLabel',
			'class': prefix + 'rgbLabel',
			html: 'R'
		}).inject(this.rgbContainer).grab(this.rgbRedVal);
		this.rgbRed = new Element('p', {
			id: prefix + 'rgbRed',
			'class': prefix + 'rgbP'
		}).inject(this.rgbContainer).adopt(this.rgbRedLock, this.rgbRedLabel);
		
		this.rgbGreenLock = new Element('input', {
			id: prefix + 'rgbGreenLock',
			'class': prefix + 'rgbLock',
			name: prefix + 'mode',
			type: 'radio',
			title: this.options.lockTip
		}).inject(this.rgbContainer);
		this.rgbGreenVal = new Element('input', {
			id: prefix + 'rgbGreenVal',
			'class': prefix + 'rgbVal',
			type: 'text',
			value: '0',
			maxlength: '3'
		}).inject(this.rgbContainer);
		this.rgbGreenLabel = new Element('label', {
			id: prefix + 'rgbGreenLabel',
			'class': prefix + 'rgbLabel',
			html: 'G'
		}).inject(this.rgbContainer).grab(this.rgbGreenVal);
		this.rgbGreen = new Element('p', {
			id: prefix + 'rgbGreen',
			'class': prefix + 'rgbP'
		}).inject(this.rgbContainer).adopt(this.rgbGreenLock, this.rgbGreenLabel);
		
		this.rgbBlueLock = new Element('input', {
			id: prefix + 'rgbBlueLock',
			'class': prefix + 'rgbLock',
			name: prefix + 'mode',
			type: 'radio',
			title: this.options.lockTip
		}).inject(this.rgbContainer);
		this.rgbBlueVal = new Element('input', {
			id: prefix + 'rgbBlueVal',
			'class': prefix + 'rgbVal',
			type: 'text',
			value: '0',
			maxlength: '3'
		}).inject(this.rgbContainer);
		this.rgbBlueLabel = new Element('label', {
			id: prefix + 'rgbBlueLabel',
			'class': prefix + 'rgbLabel',
			html: 'B'
		}).inject(this.rgbContainer).grab(this.rgbBlueVal);
		this.rgbBlue = new Element('p', {
			id: prefix + 'rgbBlue',
			'class': prefix + 'rgbP'
		}).inject(this.rgbContainer).adopt(this.rgbBlueLock, this.rgbBlueLabel);
		
		if (this.options.applyDefaultStyles) {
			$$('.' + prefix + 'rgbLock').each(function(el) {
				el.setStyles({
					width: '1.5em'
				});
			});
			$$('.' + prefix + 'rgbVal').each(function(el) {
				el.setStyles({
					marginLeft: '.2em',
					width: '3.5em'
				});
			});
			$$('.' + prefix + 'rgbLabel').each(function(el) {
				el.setStyles({
					width: '7em',
					textAlign: 'right'
				});
			})
			
		}
	}
	
});
