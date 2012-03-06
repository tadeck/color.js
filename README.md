# color.js

color.js is a simple JavaScript color library.  It's designed to be complete, flexible, fast, and dependency-free.

color.js is open source and is released under the [MIT License](http://en.wikipedia.org/wiki/MIT_License "MIT License").

## Creating Colors

color.js provides several different methods for creating colors.

``` javascript
// constructors
var black = new Color();                // default constructor
var white = new Color(255, 255, 255);   // RGB constructor
var gray = new Color("#7F7F7F");        // hexadecimal constructor six digits with hash
var red = new Color("#F00");            // hexadecimal constructor three digits with hash
var green = new Color("00FF00");        // hexadecimal constructor six digits without hash
var blue = new Color("00F");            // hexadecimal constructor three digits without hash
var navy = new Color(new Color.navy()); // copy constructor

// color model functions.
var maroon = Color.rgb(128, 0, 0);      // RGB color model
var teal = Color.hsv(0, 128, 128);      // HSV color model

// hexadecimal functions
var cyan = Color.hex("#00FFFF");        // hexadecimal six digits with hash
var magenta = Color.hex("#F0F");        // hexadecimal three digits with hash
var yellow = Color.hex("FFFF00");       // hexadecimal six digits without hash
var purple = Color.hex("707");          // hexadecimal three digits without hash

// random color
var color = Color.random();             // returns a random color
```

In addition, named colors functions are provided.  These colors are defined in the [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/ "CSS Color Module Level 3") specification.

``` javascript
var aliceBlue = Color.aliceBlue();
var antiqueWhite = Color.antiqueWhite();
var aqua = Color.aqua();
var aquamarine = Color.aquamarine();
var azure = Color.azure();
var beige = Color.beige();
var bisque = Color.bisque();
var black = Color.black();
var blanchedAlmond = Color.blanchedAlmond();
var blue = Color.blue();
var blueViolet = Color.blueViolet();
var brown = Color.brown();
var burlywood = Color.burlywood();
var cadetBlue = Color.cadetBlue();
var chartreuse = Color.chartreuse();
var chocolate = Color.chocolate();
var coral = Color.coral();
var cornflowerBlue = Color.cornflowerBlue();
var cornsilk = Color.cornsilk();
var crimson = Color.crimson();
var cyan = Color.cyan();
var darkBlue = Color.darkBlue();
var darkCyan = Color.darkCyan();
var darkGoldenrod = Color.darkGoldenrod();
var darkGray = Color.darkGray();
var darkGreen = Color.darkGreen();
var darkGrey = Color.darkGrey();
var darkKhaki = Color.darkKhaki();
var darkMagenta = Color.darkMagenta();
var darkOliveGreen = Color.darkOliveGreen();
var darkOrange = Color.darkOrange();
var darkOrchid = Color.darkOrchid();
var darkRed = Color.darkRed();
var darkSalmon = Color.darkSalmon();
var darkSeaGreen = Color.darkSeaGreen();
var darkSlateBlue = Color.darkSlateBlue();
var darkSlateGray = Color.darkSlateGray();
var darkSlateGrey = Color.darkSlateGrey();
var darkTurquoise = Color.darkTurquoise();
var darkViolet = Color.darkViolet();
var deepPink = Color.deepPink();
var deepSkyBlue = Color.deepSkyBlue();
var dimGray = Color.dimGray();
var dimGrey = Color.dimGrey();
var dodgerBlue = Color.dodgerBlue();
var firebrick = Color.firebrick();
var floralWhite = Color.floralWhite();
var forestGreen = Color.forestGreen();
var fuchsia = Color.fuchsia();
var gainsboro = Color.gainsboro();
var ghostWhite = Color.ghostWhite();
var gold = Color.gold();
var goldenrod = Color.goldenrod();
var gray = Color.gray();
var green = Color.green();
var greenYellow = Color.greenYellow();
var grey = Color.grey();
var honeydew = Color.honeydew();
var hotPink = Color.hotPink();
var indianRed = Color.indianRed();
var indigo = Color.indigo();
var ivory = Color.ivory();
var khaki = Color.khaki();
var lavender = Color.lavender();
var lavenderBlush = Color.lavenderBlush();
var lawnGreen = Color.lawnGreen();
var lemonChiffon = Color.lemonChiffon();
var lightBlue = Color.lightBlue();
var lightCoral = Color.lightCoral();
var lightCyan = Color.lightCyan();
var lightGoldenrodYellow = Color.lightGoldenrodYellow();
var lightGray = Color.lightGray();
var lightGreen = Color.lightGreen();
var lightGrey = Color.lightGrey();
var lightPink = Color.lightPink();
var lightSalmon = Color.lightSalmon();
var lightSeaGreen = Color.lightSeaGreen();
var lightSkyBlue = Color.lightSkyBlue();
var lightSlateGray = Color.lightSlateGray();
var lightSlateGrey = Color.lightSlateGrey();
var lightSteelBlue = Color.lightSteelBlue();
var lightYellow = Color.lightYellow();
var lime = Color.lime();
var limeGreen = Color.limeGreen();
var linen = Color.linen();
var magenta = Color.magenta();
var maroon = Color.maroon();
var mediumAquamarine = Color.mediumAquamarine();
var mediumBlue = Color.mediumBlue();
var mediumOrchid = Color.mediumOrchid();
var mediumPurple = Color.mediumPurple();
var mediumSeaGreen = Color.mediumSeaGreen();
var mediumSlateBlue = Color.mediumSlateBlue();
var mediumSpringGreen = Color.mediumSpringGreen();
var mediumTurquoise = Color.mediumTurquoise();
var mediumVioletRed = Color.mediumVioletRed();
var midnightBlue = Color.midnightBlue();
var mintCream = Color.mintCream();
var mistyRose = Color.mistyRose();
var moccasin = Color.moccasin();
var navajoWhite = Color.navajoWhite();
var navy = Color.navy();
var oldLace = Color.oldLace();
var olive = Color.olive();
var oliveDrab = Color.oliveDrab();
var orange = Color.orange();
var orangeRed = Color.orangeRed();
var orchid = Color.orchid();
var paleGoldenrod = Color.paleGoldenrod();
var paleGreen = Color.paleGreen();
var paleTurquoise = Color.paleTurquoise();
var paleVioletRed = Color.paleVioletRed();
var papayaWhip = Color.papayaWhip();
var peachPuff = Color.peachPuff();
var peru = Color.peru();
var pink = Color.pink();
var plum = Color.plum();
var powderBlue = Color.powderBlue();
var purple = Color.purple();
var red = Color.red();
var rosyBrown = Color.rosyBrown();
var royalBlue = Color.royalBlue();
var saddleBrown = Color.saddleBrown();
var salmon = Color.salmon();
var sandyBrown = Color.sandyBrown();
var seaGreen = Color.seaGreen();
var seashell = Color.seashell();
var sienna = Color.sienna();
var silver = Color.silver();
var skyBlue = Color.skyBlue();
var slateBlue = Color.slateBlue();
var slateGray = Color.slateGray();
var slateGrey = Color.slateGrey();
var snow = Color.snow();
var springGreen = Color.springGreen();
var steelBlue = Color.steelBlue();
var tan = Color.tan();
var teal = Color.teal();
var thistle = Color.thistle();
var tomato = Color.tomato();
var turquoise = Color.turquoise();
var violet = Color.violet();
var wheat = Color.wheat();
var white = Color.white();
var whiteSmoke = Color.whiteSmoke();
var yellow = Color.yellow();
var yellowGreen = Color.yellowGreen();
```

## Getting and Setting Color Properties

Several accessors for color properties are provided.

``` javascript
var color = Color.yellow();

var red = color.red();               // red = 255
var green = color.green();           // green = 255
var blue = color.blue();             // blue = 0

var hue = color.hue();               // hue = 60
var saturation = color.saturation(); // saturation = 100
var value = color.value();           // value = 100

var hex = color.hex();               // hex = "#FFFF00"
var string = color.toString();       // string = "#FFFF00"
```

Color properties are mutable.

``` javascript
var color = Color.white();

// set red, green and blue
color.setRed(255);
color.setGreen(255);
color.setBlue(255);

// set hue, saturation and value
color.setHue(0);
color.setSaturation(0);
color.setValue(100);

// set red, green, and blue or hue, saturation and value all at the same time
color.setRGB(255, 255, 255);
color.setHSV(0, 0, 100);

// set the hexadecimal string representation of the color
color.setHex("#FFFFFF");
color.setHex("#FFF");
color.setHex("FFFFFF");
color.setHex("FFF");

// adjust the hue of the color
color.rotateHue(-30);
color.complement();

// increase and decrease the saturation of the color
color.saturate(25);
color.desaturate(25);

// darken and lighten the value of the color
color.lighten(25);
color.darken(25);
```

All mutator methods return the color object.  This allows them to be chained.

``` javascript
new Color().setHue(40).desaturate(30).darken(10);
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

## Cloning Objects

The Color prototype implements a clone function.

``` javascript
var redClone = Color.red().clone();
```