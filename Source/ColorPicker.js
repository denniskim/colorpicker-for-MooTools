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

provides: ColorPicker

...
*/

/*…*/

var ColorPicker = new Class({

	Implements: Options,

	options: {
		'input': 'rgbhex'
	},

	initialize: function(options) {
		this.setOptions(options);
		this.viewport = $(this.options.input);
	},

	methodName: function(foobar) {
		return foobar;
	}
	
});
