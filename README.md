# color.js

color.js is a simple JavaScript color library.  It's designed to be:

* Complete: color.js should contain every useful color function.
* Flexibile: color.js should allow the developer to use it in multiple ways.
* Error-free: color.js should be well-tested.
* Fast: color.js should be as efficient as possible.

## Creating Colors

color.js provides several different methods for creating colors.

``` javascript
/*
Constructors
*/
var red = new Color(255, 0, 0);     // RGB constructor
var green = new Color("#00FF00");   // hexidecimal constructor
var blue = new Color("#00F");       // hexidecimal constructor
var white = new Color("FFFFFF");    // hexidecimal constructor
var black = new Color("000");       // hexidecimal constructor

/*
Color model functions.
*/
var green = Color.rgb(0, 255, 0);   // RGB color model
var blue = Color.hsl(240, 1, 0.5);  // HSL color model
var cyan = Color.hsv(180, 1, 1);    // HSV color model

/*
Hexidecimal function.
*/
var magenta = Color.hex("#FF00FF"); // 
var yellow = Color.hex("#FF0");
var white = Color.hex("FFFFFF");
var black = Color.hex("000");
```

In addition, named colors functions are provided.  These colors are defined in the [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/ "CSS Color Module Level 3") specification.

TODO: add CSS3 Color list http://www.w3.org/TR/css3-color/

## Getting and Setting Color Properties

Several accessors for color properties are provided:

``` javascript
var yellow = Color.yellow();

var hue = yellow.hue();               // hue = 60
var saturation = yellow.saturation(); // saturation = 1
var value = yellow.value();           // value = 1
var lightness = yellow.lightness();   // lightness = 0.5

var red = yellow.red();               // red = 255
var green = yellow.green();           // green = 255
var blue = yellow.blue();             // blue = 0

var hexValue = yellow.toString();     // hexValue = "#FFFF00"
```

Color proerties are also mutable:

``` javascript
var color = new Color.white();

color.setRed(255);
color.setGreen(255);
color.setBlue(255);
color.setRGB(255, 255, 255);

color.setHue(0);
color.setSaturation(0);
color.setValue(1);
color.setLightness(1);
color.setHSV(0, 0, 1);
color.setHSL(0, 1, 1);

color.setHex("#FFFFFF");
color.setHex("#FFF");
color.setHex("FFFFFF");
color.setHex("FFF");
```

## Color Comparisons

Finally, colors can be compared for equality.  Two colors are equal if their red, green and blue 
values are equal.

``` javascript
var red1 = Color.red();
var red2 = new Color("#FF0000")
var green = Color.green();

var result1 = red1.equals(red2);  // result1 = true
var result2 = red1.equals(green); // result2 = false
```