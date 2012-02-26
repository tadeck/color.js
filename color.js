/* 
This program is free software. It comes without any warranty, to the extent permitted by 
applicable law. You can redistribute it and/or modify it under the terms of the Do What The Fuck 
You Want To Public License, Version 2, as published by Sam Hocevar. See 
http://sam.zoy.org/wtfpl/COPYING for more details. 
*/

/*
Constructor for color.  This constructor can be called in the following ways:
* With a single argument hexidecimal string:
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
	else if(typeof redOrHexOrColor === "number" && typeof green === "number" && typeof blue === "number")
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
Returns a string representing this color.  This string will be a six-digit hexidecimal number 
preceeded by the "#" character.  It's format will be "#RRGGBB".
*/
Color.prototype.hex = function()
{
	return this._hex;
}

/*
Alias for hex().
*/
Color.prototype.toString = function()
{
	return this.hex();
};

/*
Sets the red, green, and blue values of this color.  This method takes three arguments, 
corresponding to each of these colors.  These values are expected to be in the range 0 to 255 
inclusive.  If they are not, the values will be clamped.  Any decimal values will also be 
converted to integer values.
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

	// set the values
	this._red = red;
	this._green = green;
	this._blue = blue;

	this._calculateHSV();
	this._calculateHex();
};

/*
Sets the red, green and blue values of this color using the provided hexidecimal string.  The 
string may be in the formats:
* "#FF00FF"
* "#ff00ff"
* "FF00FF"
* "ff00ff"
* "#F0F"
* "#f0f"
* "F0F"
* "f0f"
*/
Color.prototype.setHex = function(hex)
{
	if (typeof hex !== "string")
		throw "illegal_argument_exception";

	// parse out the components
	var components;

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

	if (!components)
		throw "illegal_argument_exception";

	this._red = parseInt(components[1], 16);
	this._green = parseInt(components[2], 16);
	this._blue = parseInt(components[3], 16);

	this._calculateHSV();
	this._calculateHex();
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

	// multiplay and round the values
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
}