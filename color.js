/*
Copyright (C) 2011 Landon Schropp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* 
color.js is a simple JavaScript color library. It's designed to be complete, flexible, error-free, well-documented and fast.  color.js is written by Landon Schropp.
*/

/*
Constructor for color.  This constructor can be called in the following ways:
* With a single argument hexadecimal string:
* * new Color("#FF00FF");
* * new Color("#ff00ff");
* * new Color("FF00FF");
* * new Color("ff00ff");
* * new Color("#F0F");
* * new Color("#f0f");
* * new Color("F0F");
* * new Color("f0f");
* With a single argument Color:
* * new Color(Color.cyan());
* With three red, green and blue integers.
* * new Color(255, 0, 255);
*/
function Color(redOrHexOrColor, green, blue) 
{
	if (redOrHexOrColor instanceof Color)
	{
		// perform copy
		this._red = redOrHexOrColor.red();
		this._green = redOrHexOrColor.green();
		this._blue = redOrHexOrColor.blue();
		this._hue = redOrHexOrColor.hue();
		this._saturation = redOrHexOrColor.saturation();
		this._value = redOrHexOrColor.value();
		this._hex = redOrHexOrColor.hex();
	}
	else if (typeof redOrHexOrColor === "string")
	{
		this.setHex(redOrHexOrColor);
	}
	else
	{
		// interpret the values as colors
		this.setRGB(redOrHexOrColor, green, blue);
	}
}

/*
Accessor for the red component of this Color.
*/
Color.prototype.red = function()
{
	return this._red;
};

/*
Accessor for the green component of this Color.
*/
Color.prototype.green = function()
{
	return this._green;
};

/*
Accessor for the blue component of this Color.
*/
Color.prototype.blue = function()
{
	return this._blue;
};

/*
Accessor for the hue component of this Color.
*/
Color.prototype.hue = function()
{
	return this._hue;
};

/*
Accessor for the saturation component of this Color.
*/
Color.prototype.saturation = function()
{
	return this._saturation;
};

/*
Accessor for the value component of this Color.
*/
Color.prototype.value = function()
{
	return this._value;
};

/*
Returns a string representing this color.  This string will be a six-digit hexadecimal number 
preceeded by the "#" character.  It's format will be "#RRGGBB".
*/
Color.prototype.hex = function()
{
	return this._hex;
};

/*
Returns a representation of this color which can be used with a canvas context fillStyle property.
*/
Color.prototype.toString = function()
{
	return this.hex();
};

/*
Sets the red, green, and blue components of this color.  This method takes three arguments, 
corresponding to each of these components.  The red, green and blue components will be clamped 
between 0 and 255.  Any decimal values will be rounded down to the nearest integer.  This method 
will calculate the hue, saturation and value components based upon the provided red, green and 
blue components.  It will throw an exception if any of the provided arguments are not a number 
object.  This method returns the current color object.
*/
Color.prototype.setRGB = function(red, green, blue)
{
	if (typeof red !== "number" || typeof green !== "number" || typeof blue !== "number")
		throw "illegal_argument_exception";

	// floor the values
	red = Math.floor(red);
	green = Math.floor(green);
	blue = Math.floor(blue);

	// clamp the values
	if (red < 0) red = 0;
	if (red > 255) red = 255;

	if (green < 0) green = 0;
	if (green > 255) green = 255;

	if (blue < 0) blue = 0;
	if (blue > 255) blue = 255;

	// set the components
	this._red = red;
	this._green = green;
	this._blue = blue;

	// calculate the other components
	this._calculateHSV();
	this._calculateHex();

	return this;
};

/*
Sets the hue, saturation and value of this color.  This method takes three arguments, 
corresponding to each of these components.  The hue components will be calculated modulo 360.  The 
saturation and value components will be clamped between 0 and 255.  Any decimal values will be 
rounded down to the nearest integer.  This method will calculate the red, green, blue, and hex 
components of this Color based upon the provided hue, saturation and value components.  This 
method will throw an exception if any of the provided arguments are not a number object.  This 
method returns the current color object.
*/
Color.prototype.setHSV = function(hue, saturation, value)
{
	if (typeof hue !== "number" || typeof saturation !== "number" || typeof value !== "number")
		throw "illegal_argument_exception";

	// floor the values
	hue = Math.floor(hue);
	saturation = Math.floor(saturation);
	value = Math.floor(value);

	// properly mod the hue
	hue = (hue % 360 + 360) % 360;

	// clamp the saturation and value
	if (saturation < 0) saturation = 0;
	if (saturation > 100) saturation = 100;

	if (value < 0) value = 0;
	if (value > 100) value = 100;

	// set the components
	this._hue = hue;
	this._saturation = saturation;
	this._value = value;

	// calculate the other components
	this._calculateRGB();
	this._calculateHex();

	return this;
};

/*
Sets the red, green and blue values of this color using the provided hexadecimal string.  This method will calculate the red, green, blue, hue, saturation and value components using the provided hex string.  The string argument may be uppercase or lowercase but can only be in one of the following formats:
* "#FF00FF"
* "FF00FF"
* "#F0F"
* "F0F"
If the string argument is not in one of these formats, this method will throw an illegal_argument_exception.
*/
Color.prototype.setHex = function(hex)
{
	if (typeof hex !== "string")
		throw "illegal_argument_exception";

	// parse out the components
	var components;

	// check the lengths of the components and parse accordingly
	if (hex.length === 6 || hex.length === 7)
	{
		components = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i.exec(hex);
	}
	else if (hex.length === 3 || hex.length === 4)
	{
		components = /^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i.exec(hex);

		if (components)
		{
			components[1] = components[1] + components[1];
			components[2] = components[2] + components[2];
			components[3] = components[3] + components[3];
		}
	}
	else
	{
		throw "illegal_argument_exception";
	}

	// make sure the components were successfully parsed
	if (!components)
		throw "illegal_argument_exception";

	// set the components
	this._red = parseInt(components[1], 16);
	this._green = parseInt(components[2], 16);
	this._blue = parseInt(components[3], 16);

	// calculate the other components
	this._calculateHSV();
	this._calculateHex();

	return this;
};

/*
Sets the red component of this color.  This method takes one argument, which is the new value of 
red to set.  This number will be clamped between 0 and 255.  Any decimal number will be rounded 
down to the nearest integer.  This method will throw an exception if the provided argument is not 
a number.  This method returns the current color object.
*/
Color.prototype.setRed = function(red)
{
	this.setRGB(red, this._green, this._blue);
	return this;
};

/*
Sets the green component of this color.  This method takes one argument, which is the new value of 
green to set.  This number will be clamped between 0 and 255.  Any decimal number will be rounded 
down to the nearest integer.  This method will throw an exception if the provided argument is not 
a number.  This method returns the current color object.
*/
Color.prototype.setGreen = function(green)
{
	this.setRGB(this._red, green, this._blue);
	return this;
};

/*
Sets the blue component of this color.  This method takes one argument, which is the new value of 
blue to set.  This number will be clamped between 0 and 255.  Any decimal number will be rounded 
down to the nearest integer.  This method will throw an exception if the provided argument is not 
a number.  This method returns the current color object.
*/
Color.prototype.setBlue = function(blue)
{
	this.setRGB(this._red, this._green, blue);
	return this;
};

/*
Sets the hue component of this color.  This method takes one argument, which is the new value of 
hue to set.  This number will be computed modulo 360.  Any decimal number will be rounded down to 
the nearest integer.  This method will throw an exception if the provided argument is not a number.
This method returns the current color object.
*/
Color.prototype.setHue = function(hue)
{
	this.setHSV(hue, this._saturation, this._value);
	return this;
};

/*
Sets the saturation component of this color.  This method takes one argument, which is the new value of saturation to set.  This number will be clamped between 0 and 255.  Any decimal number 
will be rounded down to the nearest integer.  This method will throw an exception if the provided 
argument is not a number.  This method returns the current color object.
*/
Color.prototype.setSaturation = function(saturation)
{
	this.setHSV(this._hue, saturation, this._value);
	return this;
};

/*
Sets the value component of this color.  This method takes one argument, which is the new value of 
value to set.  This number will be clamped between 0 and 255.  Any decimal number will be rounded 
down to the nearest integer.  This method will throw an exception if the provided argument is not 
a number.  This method returns the current color object.
*/
Color.prototype.setValue = function(value)
{
	this.setHSV(this._hue, this._saturation, value);
	return this;
};

/*
Rotates the hue component of this color.  This method takes one argument, which is the amount to
rotate the hue, expressed in degrees.  If the hue is rotated to a value outside of 0 to 360, then 
it will be computed modulo 360.  This method will throw an exception if the provided argument is
not a number.  This method returns the current color object.
*/
Color.prototype.rotateHue = function(amount)
{
	this.setHue(this._hue + amount);
	return this;
};

/*
Sets the hue of this color to the complement of the current hue.
*/
Color.prototype.complement = function() 
{
	this.setHue(this._hue + 180);
	return this;
};

/*
Saturates the saturation component of this color.  This method takes one argument, which is the
amount to saturate this color.  The saturation of this color will be clamped between 0 and 100.  
Any decimal value will be rounded down to the nearest integer.  This method will throw an 
exception if the provided argument is not a number.  This method returns the current object.
*/
Color.prototype.saturate = function(amount)
{
	this.setSaturation(this._saturation + amount);
	return this;
};

/*
Desaturates the saturation component of this color.  This method takes one argument, which is the 
amount to desaturate this color.  The saturation of this color will be clamped between 0 and 100.  
Any decimal value will be rounded down to the nearest integer.  This method will throw an 
exception if the provided argument is not a number.  This method returns the current object.
*/
Color.prototype.desaturate = function(amount)
{
	this.setSaturation(this._saturation - amount);
	return this;
};

/*
Lightens the value component of this color.  This method takes one argument, which is the amount 
to lighten this color.  The value of this color will be clamped between 0 and 100.  Any decimal 
value will be rounded down to the nearest integer.  This method will throw an exception if the 
provided argument is not a number.  This method returns the current object.
*/
Color.prototype.lighten = function(amount)
{
	this.setValue(this._value + amount);
	return this;
};

/*
Darkens the value component of this color.  This method takes one argument, which is the amount to 
darken this color.  The value of this color will be clamped between 0 and 100.  Any decimal value 
will be rounded down to the nearest integer.  This method will throw an exception if the provided 
argument is not a number.  This method returns the current object.
*/
Color.prototype.darken = function(amount)
{
	this.setValue(this._value - amount);
	return this;
};

/*
Returns true if this color equals the provided object and false otherwise.  Two colors are 
considered to be equal if their red, green and blue components are equal.
*/
Color.prototype.equals = function(color)
{
	if (!(color instanceof Color))
		return false;

	return this._red === color._red && this._green === color._green && this._blue === color._blue;
};

/*
Private helper method which calculates the red, green and blue values based upon the current HSV 
values.  These calculations are taken from: http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV.
*/
Color.prototype._calculateRGB = function()
{
	// calculate the color distributions
	var chroma = this._value * this._saturation / 10000;
	var huePrime = this._hue / 60;
	var middleComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));

	// set the correct colors based upon the hue
	if (huePrime < 1)
	{
		this._red = chroma;
		this._green = middleComponent;
		this._blue = 0;
	}
	else if (huePrime < 2)
	{
		this._red = middleComponent;
		this._green = chroma;
		this._blue = 0;
	}
	else if (huePrime < 3)
	{
		this._red = 0;
		this._green = chroma;
		this._blue = middleComponent;
	}
	else if (huePrime < 4)
	{
		this._red = 0;
		this._green = middleComponent;
		this._blue = chroma;
	}
	else if (huePrime < 5)
	{
		this._red = middleComponent;
		this._green = 0;
		this._blue = chroma;
	}
	else
	{
		this._red = chroma;
		this._green = 0;
		this._blue = middleComponent;
	}

	// add the match value to the components
	var matchValue = this._value / 100 - chroma;

	this._red += matchValue;
	this._green += matchValue;
	this._blue += matchValue;

	// multiply out the colors and floor them
	this._red = Math.floor(this._red * 255);
	this._green = Math.floor(this._green * 255);
	this._blue = Math.floor(this._blue * 255);
};

/*
Private helper method which calculates the hue, saturation, and lightness values based upon the
current RGB values.  These calculations are taken from: http://en.wikipedia.org/wiki/HSL_and_HSV.
*/
Color.prototype._calculateHSV = function()
{
	var red = this._red / 255;
	var green = this._green / 255;
	var blue = this._blue / 255;

	// calculate the value
	this._value = Math.max(red, green, blue);

	// calculate the chroma
	var chroma = this._value - Math.min(red, green, blue);

	// calculate the saturation
	if (this._value === 0)
		this._saturation = 0;
	else
		this._saturation = chroma / this._value;

	// calculate the hue
	if (chroma === 0)
		this._hue = 0;
	else if (this._value === red)
		this._hue = ((green - blue) / chroma + 6) % 6 * 60;
	else if (this._value === green)
		this._hue = ((blue - red) / chroma + 2) * 60;
	else
		this._hue = ((red - green) / chroma + 4) * 60;

	// multiply and round the values
	this._hue = Math.round(this._hue);
	this._value = Math.round(this._value * 100);
	this._saturation = Math.round(this._saturation * 100);
};

/*
Private helper method which calculates the hex value based upon the current RGB values.
*/
Color.prototype._calculateHex = function()
{
	var hex = (this._red * 256 * 256 + this._green * 256 + this._blue).toString(16);
	this._hex = "#00000".slice(0, 7 - hex.length) + hex.toUpperCase();
};