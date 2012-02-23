/* 
This program is free software. It comes without any warranty, to the extent permitted by 
applicable law. You can redistribute it and/or modify it under the terms of the Do What The Fuck 
You Want To Public License, Version 2, as published by Sam Hocevar. See 
http://sam.zoy.org/wtfpl/COPYING for more details. 
*/

/*
Constructor for color.  This constructor can be called in the following ways:
* With a single argument hexidecimal string:
* * new Color("#00FF00");
* * new Color("00FF00");
* * new Color("#0F0");
* * new Color("0F0");
* With a single argument Color:
* * new Color(Color.red());
* With three red, green and blue integers.
* * new Color(0, 255, 0);
*/
function Color(redOrHexOrColor, green, blue) 
{
	if (redOrHexOrColor instanceof Color)
	{
		// perform copy
		this.setRGB(redOrHexOrColor.red(), redOrHexOrColor.green(), redOrHexOrColor.blue());
	}
	else if (typeof redOrHexOrColor === "string")
	{

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
Sets the red, green, and blue values of this color.  This method takes three arguments, 
corresponding to each of these colors.  These values are expected to be in the range 0 to 255 
inclusive.  If they are not, the values will be clamped.  Any decimal values will also be 
converted to integer values.
*/
Color.prototype.setRGB = function(red, green, blue)
{
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

	/*
	All of these calculations are taken from: http://en.wikipedia.org/wiki/HSL_and_HSV.
	*/
	red /= 255;
	green /= 255;
	blue /= 255;

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
};