# color.js

color.js is a simple JavaScript color library.  It's designed to be complete, flexible, error-free, well-documented and fast.

## Creating Colors

color.js provides several different methods for creating colors.

``` javascript
// constructors
var red = new Color(255, 0, 0);    // RGB constructor
var green = new Color("#00FF00");  // hexidecimal constructor six digits with hash
var blue = new Color("#00F");      // hexidecimal constructor three digits with hash
var white = new Color("FFFFFF");   // hexidecimal constructor six digits without hash
var black = new Color("000");      // hexidecimal constructor three digits without hash

// color model functions.
var green = Color.rgb(0, 255, 0);  // RGB color model
var blue = Color.hsl(240, 1, 0.5); // HSL color model
var cyan = Color.hsv(180, 1, 1);   // HSV color model

// hexidecimal functions
var cyan = Color.hex("#00FFFF");   // hexideciaml six digits with hash
var magenta = Color.hex("#F0F");   // hexidecimal three digits with hash
var yellow = Color.hex("FFFF00");  // hexidecimal six digits without hash
var black = Color.hex("000");      // hexidecimal three digits without hash
```

In addition, named colors functions are provided.  These colors are defined in the [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/ "CSS Color Module Level 3") specification.

TODO: add CSS3 Color list http://www.w3.org/TR/css3-color/

## Getting and Setting Color Properties

Several accessors for color properties are provided:

``` javascript
var color = Color.yellow();

var hue = color.hue();               // hue = 60
var saturation = color.saturation(); // saturation = 1
var value = color.value();           // value = 1
var lightness = color.lightness();   // lightness = 0.5

var red = color.red();               // red = 255
var green = color.green();           // green = 255
var blue = color.blue();             // blue = 0

var hexValue = color.toString();     // hexValue = "#FFFF00"
```

Color proerties are also mutable:

``` javascript
var color = Color.white();

color.setRed(255);
color.setGreen(255);
color.setBlue(255);
color.setRGB(255, 255, 255);

color.setHue(0);
color.setSaturation(0);
color.setValue(1);
color.setLightness(1);
color.setHSV(0, 0, 1);
color.setHSL(0, 0, 1);

color.setHex("#FFFFFF");
color.setHex("#FFF");
color.setHex("FFFFFF");
color.setHex("FFF");
```

## Color Comparisons

Colors can be compared for equality.  Two colors are equal if their red, green and blue 
values are equal.

``` javascript
var color1 = Color.red();
var color2 = Color.red();
var color3 = Color.green();

var result1 = color1.equals(color2); // result1 = true
var result2 = color1.equals(color3); // result2 = false
```