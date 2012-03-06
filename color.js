/*
Copyright (C) 2011 Landon Schropp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/;

/* 
color.js is a JavaScript color library. It's designed to be complete, flexible, error-free, well-documented and fast.  color.js is written by Landon Schropp.
*/

/*
Constructor for color.  This constructor can be called in the following ways:
* With a single argument hexadecimal string ignoring case:
* * new Color("#FF00FF");
* * new Color("FF00FF");
* * new Color("#F0F");]
* * new Color("F0F");
* With a single argument Color:
* * new Color(Color.cyan());
* With three red, green and blue integers.
* * new Color(255, 0, 255);
*/
function Color(redOrHexOrColor, green, blue) 
{
	if (arguments.length === 0)
	{
		// create a black color
		this._red = 0;
		this._green = 0;
		this._blue = 0;
		this._hue = 0;
		this._saturation = 0;
		this._value = 0;
		this._hex = "#000000";
	}
	else if (arguments.length === 1 && redOrHexOrColor instanceof Color)
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
	else if (arguments.length === 1 && typeof redOrHexOrColor === "string")
	{
		this.setHex(redOrHexOrColor);
	}
	else if (arguments.length === 3)
	{
		// interpret the values as colors
		this.setRGB(redOrHexOrColor, green, blue);
	}
	else
	{
		throw "illegal_argument_exception";
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
Returns a six-digit hexadecimal number preceeded by the "#" character which represents this color.
It's format will be "#RRGGBB".
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
method will throw an exception if any of the provided arguments are not a number.  This method 
returns the current color object.
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
Sets the red, green and blue values of this color using the provided hexadecimal string.  This 
method will calculate the red, green, blue, hue, saturation and value components using the 
provided hex string.  This method ignores the case of the argument and accepts strings in one of 
the following formats:
* "#FF00FF"
* "FF00FF"
* "#F0F"
* "F0F"
If the string argument is not in one of these formats, this method will throw an 
illegal_argument_exception.
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
Returns an exact copy of this Color object.
*/
Color.prototype.clone = function() {
	return new Color(this);
};

/*
Creates a new color using the red, green and blue color model.  This method takes three arguments, 
corresponding to each of these components.  The red, green and blue components will be clamped 
between 0 and 255.  Any decimal values will be rounded down to the nearest integer.  This method 
will calculate the hue, saturation and value components based upon the provided red, green and 
blue components.  It will throw an exception if any of the provided arguments are not a number.
*/
Color.rgb = function(red, green, blue) {
	return new Color().setRGB(red, green, blue);
};

/*
Creates a new color using the hue, saturation and value color model.  This method takes three 
arguments, corresponding to each of these components.  The hue components will be calculated 
modulo 360.  The saturation and value components will be clamped between 0 and 100.  Any decimal 
values will be rounded down to the nearest integer.  This method will calculate the red, green, 
blue, and hex components of this Color based upon the provided hue, saturation and value 
components.  This method will throw an exception if any of the provided arguments are not a number.
*/
Color.hsv = function(hue, saturation, value) {
	return new Color().setHSV(hue, saturation, value);
};

/*
Creates a new color using the provided hexadecimal string.  This method will calculate the red, 
green, blue, hue, saturation and value components using the provided hex string.  The string 
argument ignores case and can only be in one of the following formats:
* "#FF00FF"
* "FF00FF"
* "#F0F"
* "F0F"
If the string argument is not in one of these formats, this method will throw an 
illegal_argument_exception.
*/
Color.hex = function(hex) {
	return new Color().setHex(hex);
};

/*
Creates a new, random color object.
*/
Color.random = function() {
	var red = Math.floor(Math.random() * 255);
	var green = Math.floor(Math.random() * 255);
	var blue = Math.floor(Math.random() * 255);

	return new Color().setRGB(red, green, blue);
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

/*
Returns the color alice blue.
*/
Color.aliceBlue = function()
{
  return Color.rgb(240, 248, 255);
};

/*
Returns the color antique white.
*/
Color.antiqueWhite = function()
{
  return Color.rgb(250, 235, 215);
};

/*
Returns the color aqua.
*/
Color.aqua = function()
{
  return Color.rgb(0, 255, 255);
};

/*
Returns the color aquamarine.
*/
Color.aquamarine = function()
{
  return Color.rgb(127, 255, 212);
};

/*
Returns the color azure.
*/
Color.azure = function()
{
  return Color.rgb(240, 255, 255);
};

/*
Returns the color beige.
*/
Color.beige = function()
{
  return Color.rgb(245, 245, 220);
};

/*
Returns the color bisque.
*/
Color.bisque = function()
{
  return Color.rgb(255, 228, 196);
};

/*
Returns the color black.
*/
Color.black = function()
{
  return Color.rgb(0, 0, 0);
};

/*
Returns the color blanched almond.
*/
Color.blanchedAlmond = function()
{
  return Color.rgb(255, 235, 205);
};

/*
Returns the color blue.
*/
Color.blue = function()
{
  return Color.rgb(0, 0, 255);
};

/*
Returns the color blue violet.
*/
Color.blueViolet = function()
{
  return Color.rgb(138, 43, 226);
};

/*
Returns the color brown.
*/
Color.brown = function()
{
  return Color.rgb(165, 42, 42);
};

/*
Returns the color burlywood.
*/
Color.burlywood = function()
{
  return Color.rgb(222, 184, 135);
};

/*
Returns the color cadet blue.
*/
Color.cadetBlue = function()
{
  return Color.rgb(95, 158, 160);
};

/*
Returns the color chartreuse.
*/
Color.chartreuse = function()
{
  return Color.rgb(127, 255, 0);
};

/*
Returns the color chocolate.
*/
Color.chocolate = function()
{
  return Color.rgb(210, 105, 30);
};

/*
Returns the color coral.
*/
Color.coral = function()
{
  return Color.rgb(255, 127, 80);
};

/*
Returns the color cornflower blue.
*/
Color.cornflowerBlue = function()
{
  return Color.rgb(100, 149, 237);
};

/*
Returns the color cornsilk.
*/
Color.cornsilk = function()
{
  return Color.rgb(255, 248, 220);
};

/*
Returns the color crimson.
*/
Color.crimson = function()
{
  return Color.rgb(220, 20, 60);
};

/*
Returns the color cyan.
*/
Color.cyan = function()
{
  return Color.rgb(0, 255, 255);
};

/*
Returns the color dark blue.
*/
Color.darkBlue = function()
{
  return Color.rgb(0, 0, 139);
};

/*
Returns the color dark cyan.
*/
Color.darkCyan = function()
{
  return Color.rgb(0, 139, 139);
};

/*
Returns the color dark goldenrod.
*/
Color.darkGoldenrod = function()
{
  return Color.rgb(184, 134, 11);
};

/*
Returns the color dark gray.
*/
Color.darkGray = function()
{
  return Color.rgb(169, 169, 169);
};

/*
Returns the color dark green.
*/
Color.darkGreen = function()
{
  return Color.rgb(0, 100, 0);
};

/*
Returns the color dark grey.
*/
Color.darkGrey = function()
{
  return Color.rgb(169, 169, 169);
};

/*
Returns the color dark khaki.
*/
Color.darkKhaki = function()
{
  return Color.rgb(189, 183, 107);
};

/*
Returns the color dark magenta.
*/
Color.darkMagenta = function()
{
  return Color.rgb(139, 0, 139);
};

/*
Returns the color dark olive green.
*/
Color.darkOliveGreen = function()
{
  return Color.rgb(85, 107, 47);
};

/*
Returns the color dark orange.
*/
Color.darkOrange = function()
{
  return Color.rgb(255, 140, 0);
};

/*
Returns the color dark orchid.
*/
Color.darkOrchid = function()
{
  return Color.rgb(153, 50, 204);
};

/*
Returns the color dark red.
*/
Color.darkRed = function()
{
  return Color.rgb(139, 0, 0);
};

/*
Returns the color dark salmon.
*/
Color.darkSalmon = function()
{
  return Color.rgb(233, 150, 122);
};

/*
Returns the color dark sea green.
*/
Color.darkSeaGreen = function()
{
  return Color.rgb(143, 188, 143);
};

/*
Returns the color dark slate blue.
*/
Color.darkSlateBlue = function()
{
  return Color.rgb(72, 61, 139);
};

/*
Returns the color dark slate gray.
*/
Color.darkSlateGray = function()
{
  return Color.rgb(47, 79, 79);
};

/*
Returns the color dark slate grey.
*/
Color.darkSlateGrey = function()
{
  return Color.rgb(47, 79, 79);
};

/*
Returns the color dark turquoise.
*/
Color.darkTurquoise = function()
{
  return Color.rgb(0, 206, 209);
};

/*
Returns the color dark violet.
*/
Color.darkViolet = function()
{
  return Color.rgb(148, 0, 211);
};

/*
Returns the color deep pink.
*/
Color.deepPink = function()
{
  return Color.rgb(255, 20, 147);
};

/*
Returns the color deep sky blue.
*/
Color.deepSkyBlue = function()
{
  return Color.rgb(0, 191, 255);
};

/*
Returns the color dim gray.
*/
Color.dimGray = function()
{
  return Color.rgb(105, 105, 105);
};

/*
Returns the color dim grey.
*/
Color.dimGrey = function()
{
  return Color.rgb(105, 105, 105);
};

/*
Returns the color dodger blue.
*/
Color.dodgerBlue = function()
{
  return Color.rgb(30, 144, 255);
};

/*
Returns the color firebrick.
*/
Color.firebrick = function()
{
  return Color.rgb(178, 34, 34);
};

/*
Returns the color floral white.
*/
Color.floralWhite = function()
{
  return Color.rgb(255, 250, 240);
};

/*
Returns the color forest green.
*/
Color.forestGreen = function()
{
  return Color.rgb(34, 139, 34);
};

/*
Returns the color fuchsia.
*/
Color.fuchsia = function()
{
  return Color.rgb(255, 0, 255);
};

/*
Returns the color gainsboro.
*/
Color.gainsboro = function()
{
  return Color.rgb(220, 220, 220);
};

/*
Returns the color ghost white.
*/
Color.ghostWhite = function()
{
  return Color.rgb(248, 248, 255);
};

/*
Returns the color gold.
*/
Color.gold = function()
{
  return Color.rgb(255, 215, 0);
};

/*
Returns the color goldenrod.
*/
Color.goldenrod = function()
{
  return Color.rgb(218, 165, 32);
};

/*
Returns the color gray.
*/
Color.gray = function()
{
  return Color.rgb(128, 128, 128);
};

/*
Returns the color green.
*/
Color.green = function()
{
  return Color.rgb(0, 128, 0);
};

/*
Returns the color green yellow.
*/
Color.greenYellow = function()
{
  return Color.rgb(173, 255, 47);
};

/*
Returns the color grey.
*/
Color.grey = function()
{
  return Color.rgb(128, 128, 128);
};

/*
Returns the color honeydew.
*/
Color.honeydew = function()
{
  return Color.rgb(240, 255, 240);
};

/*
Returns the color hot pink.
*/
Color.hotPink = function()
{
  return Color.rgb(255, 105, 180);
};

/*
Returns the color indian red.
*/
Color.indianRed = function()
{
  return Color.rgb(205, 92, 92);
};

/*
Returns the color indigo.
*/
Color.indigo = function()
{
  return Color.rgb(75, 0, 130);
};

/*
Returns the color ivory.
*/
Color.ivory = function()
{
  return Color.rgb(255, 255, 240);
};

/*
Returns the color khaki.
*/
Color.khaki = function()
{
  return Color.rgb(240, 230, 140);
};

/*
Returns the color lavender.
*/
Color.lavender = function()
{
  return Color.rgb(230, 230, 250);
};

/*
Returns the color lavender blush.
*/
Color.lavenderBlush = function()
{
  return Color.rgb(255, 240, 245);
};

/*
Returns the color lawn green.
*/
Color.lawnGreen = function()
{
  return Color.rgb(124, 252, 0);
};

/*
Returns the color lemon chiffon.
*/
Color.lemonChiffon = function()
{
  return Color.rgb(255, 250, 205);
};

/*
Returns the color light blue.
*/
Color.lightBlue = function()
{
  return Color.rgb(173, 216, 230);
};

/*
Returns the color light coral.
*/
Color.lightCoral = function()
{
  return Color.rgb(240, 128, 128);
};

/*
Returns the color light cyan.
*/
Color.lightCyan = function()
{
  return Color.rgb(224, 255, 255);
};

/*
Returns the color light goldenrod yellow.
*/
Color.lightGoldenrodYellow = function()
{
  return Color.rgb(250, 250, 210);
};

/*
Returns the color light gray.
*/
Color.lightGray = function()
{
  return Color.rgb(211, 211, 211);
};

/*
Returns the color light green.
*/
Color.lightGreen = function()
{
  return Color.rgb(144, 238, 144);
};

/*
Returns the color light grey.
*/
Color.lightGrey = function()
{
  return Color.rgb(211, 211, 211);
};

/*
Returns the color light pink.
*/
Color.lightPink = function()
{
  return Color.rgb(255, 182, 193);
};

/*
Returns the color light salmon.
*/
Color.lightSalmon = function()
{
  return Color.rgb(255, 160, 122);
};

/*
Returns the color light sea green.
*/
Color.lightSeaGreen = function()
{
  return Color.rgb(32, 178, 170);
};

/*
Returns the color light sky blue.
*/
Color.lightSkyBlue = function()
{
  return Color.rgb(135, 206, 250);
};

/*
Returns the color light slate gray.
*/
Color.lightSlateGray = function()
{
  return Color.rgb(119, 136, 153);
};

/*
Returns the color light slate grey.
*/
Color.lightSlateGrey = function()
{
  return Color.rgb(119, 136, 153);
};

/*
Returns the color light steel blue.
*/
Color.lightSteelBlue = function()
{
  return Color.rgb(176, 196, 222);
};

/*
Returns the color light yellow.
*/
Color.lightYellow = function()
{
  return Color.rgb(255, 255, 224);
};

/*
Returns the color lime.
*/
Color.lime = function()
{
  return Color.rgb(0, 255, 0);
};

/*
Returns the color lime green.
*/
Color.limeGreen = function()
{
  return Color.rgb(50, 205, 50);
};

/*
Returns the color linen.
*/
Color.linen = function()
{
  return Color.rgb(250, 240, 230);
};

/*
Returns the color magenta.
*/
Color.magenta = function()
{
  return Color.rgb(255, 0, 255);
};

/*
Returns the color maroon.
*/
Color.maroon = function()
{
  return Color.rgb(128, 0, 0);
};

/*
Returns the color medium aquamarine.
*/
Color.mediumAquamarine = function()
{
  return Color.rgb(102, 205, 170);
};

/*
Returns the color medium blue.
*/
Color.mediumBlue = function()
{
  return Color.rgb(0, 0, 205);
};

/*
Returns the color medium orchid.
*/
Color.mediumOrchid = function()
{
  return Color.rgb(186, 85, 211);
};

/*
Returns the color medium purple.
*/
Color.mediumPurple = function()
{
  return Color.rgb(147, 112, 219);
};

/*
Returns the color medium sea green.
*/
Color.mediumSeaGreen = function()
{
  return Color.rgb(60, 179, 113);
};

/*
Returns the color medium slate blue.
*/
Color.mediumSlateBlue = function()
{
  return Color.rgb(123, 104, 238);
};

/*
Returns the color medium spring green.
*/
Color.mediumSpringGreen = function()
{
  return Color.rgb(0, 250, 154);
};

/*
Returns the color medium turquoise.
*/
Color.mediumTurquoise = function()
{
  return Color.rgb(72, 209, 204);
};

/*
Returns the color medium violet red.
*/
Color.mediumVioletRed = function()
{
  return Color.rgb(199, 21, 133);
};

/*
Returns the color midnight blue.
*/
Color.midnightBlue = function()
{
  return Color.rgb(25, 25, 112);
};

/*
Returns the color mint cream.
*/
Color.mintCream = function()
{
  return Color.rgb(245, 255, 250);
};

/*
Returns the color misty rose.
*/
Color.mistyRose = function()
{
  return Color.rgb(255, 228, 225);
};

/*
Returns the color moccasin.
*/
Color.moccasin = function()
{
  return Color.rgb(255, 228, 181);
};

/*
Returns the color navajo white.
*/
Color.navajoWhite = function()
{
  return Color.rgb(255, 222, 173);
};

/*
Returns the color navy.
*/
Color.navy = function()
{
  return Color.rgb(0, 0, 128);
};

/*
Returns the color old lace.
*/
Color.oldLace = function()
{
  return Color.rgb(253, 245, 230);
};

/*
Returns the color olive.
*/
Color.olive = function()
{
  return Color.rgb(128, 128, 0);
};

/*
Returns the color olive drab.
*/
Color.oliveDrab = function()
{
  return Color.rgb(107, 142, 35);
};

/*
Returns the color orange.
*/
Color.orange = function()
{
  return Color.rgb(255, 165, 0);
};

/*
Returns the color orange red.
*/
Color.orangeRed = function()
{
  return Color.rgb(255, 69, 0);
};

/*
Returns the color orchid.
*/
Color.orchid = function()
{
  return Color.rgb(218, 112, 214);
};

/*
Returns the color pale goldenrod.
*/
Color.paleGoldenrod = function()
{
  return Color.rgb(238, 232, 170);
};

/*
Returns the color pale green.
*/
Color.paleGreen = function()
{
  return Color.rgb(152, 251, 152);
};

/*
Returns the color pale turquoise.
*/
Color.paleTurquoise = function()
{
  return Color.rgb(175, 238, 238);
};

/*
Returns the color pale violet red.
*/
Color.paleVioletRed = function()
{
  return Color.rgb(219, 112, 147);
};

/*
Returns the color papaya whip.
*/
Color.papayaWhip = function()
{
  return Color.rgb(255, 239, 213);
};

/*
Returns the color peach puff.
*/
Color.peachPuff = function()
{
  return Color.rgb(255, 218, 185);
};

/*
Returns the color peru.
*/
Color.peru = function()
{
  return Color.rgb(205, 133, 63);
};

/*
Returns the color pink.
*/
Color.pink = function()
{
  return Color.rgb(255, 192, 203);
};

/*
Returns the color plum.
*/
Color.plum = function()
{
  return Color.rgb(221, 160, 221);
};

/*
Returns the color powder blue.
*/
Color.powderBlue = function()
{
  return Color.rgb(176, 224, 230);
};

/*
Returns the color purple.
*/
Color.purple = function()
{
  return Color.rgb(128, 0, 128);
};

/*
Returns the color red.
*/
Color.red = function()
{
  return Color.rgb(255, 0, 0);
};

/*
Returns the color rosy brown.
*/
Color.rosyBrown = function()
{
  return Color.rgb(188, 143, 143);
};

/*
Returns the color royal blue.
*/
Color.royalBlue = function()
{
  return Color.rgb(65, 105, 225);
};

/*
Returns the color saddle brown.
*/
Color.saddleBrown = function()
{
  return Color.rgb(139, 69, 19);
};

/*
Returns the color salmon.
*/
Color.salmon = function()
{
  return Color.rgb(250, 128, 114);
};

/*
Returns the color sandy brown.
*/
Color.sandyBrown = function()
{
  return Color.rgb(244, 164, 96);
};

/*
Returns the color sea green.
*/
Color.seaGreen = function()
{
  return Color.rgb(46, 139, 87);
};

/*
Returns the color seashell.
*/
Color.seashell = function()
{
  return Color.rgb(255, 245, 238);
};

/*
Returns the color sienna.
*/
Color.sienna = function()
{
  return Color.rgb(160, 82, 45);
};

/*
Returns the color silver.
*/
Color.silver = function()
{
  return Color.rgb(192, 192, 192);
};

/*
Returns the color sky blue.
*/
Color.skyBlue = function()
{
  return Color.rgb(135, 206, 235);
};

/*
Returns the color slate blue.
*/
Color.slateBlue = function()
{
  return Color.rgb(106, 90, 205);
};

/*
Returns the color slate gray.
*/
Color.slateGray = function()
{
  return Color.rgb(112, 128, 144);
};

/*
Returns the color slate grey.
*/
Color.slateGrey = function()
{
  return Color.rgb(112, 128, 144);
};

/*
Returns the color snow.
*/
Color.snow = function()
{
  return Color.rgb(255, 250, 250);
};

/*
Returns the color spring green.
*/
Color.springGreen = function()
{
  return Color.rgb(0, 255, 127);
};

/*
Returns the color steel blue.
*/
Color.steelBlue = function()
{
  return Color.rgb(70, 130, 180);
};

/*
Returns the color tan.
*/
Color.tan = function()
{
  return Color.rgb(210, 180, 140);
};

/*
Returns the color teal.
*/
Color.teal = function()
{
  return Color.rgb(0, 128, 128);
};

/*
Returns the color thistle.
*/
Color.thistle = function()
{
  return Color.rgb(216, 191, 216);
};

/*
Returns the color tomato.
*/
Color.tomato = function()
{
  return Color.rgb(255, 99, 71);
};

/*
Returns the color turquoise.
*/
Color.turquoise = function()
{
  return Color.rgb(64, 224, 208);
};

/*
Returns the color violet.
*/
Color.violet = function()
{
  return Color.rgb(238, 130, 238);
};

/*
Returns the color wheat.
*/
Color.wheat = function()
{
  return Color.rgb(245, 222, 179);
};

/*
Returns the color white.
*/
Color.white = function()
{
  return Color.rgb(255, 255, 255);
};

/*
Returns the color white smoke.
*/
Color.whiteSmoke = function()
{
  return Color.rgb(245, 245, 245);
};

/*
Returns the color yellow.
*/
Color.yellow = function()
{
  return Color.rgb(255, 255, 0);
};

/*
Returns the color yellow green.
*/
Color.yellowGreen = function()
{
  return Color.rgb(154, 205, 50);
};