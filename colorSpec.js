// load the color library
eval(require('fs').readFileSync('./color.js','utf-8'));

/*
Shared specs for color modification.  Takes the following arguments:
* colorData An array of objects used to create the colors.  Each one of these items will be
  iterated over and will be passed to colorModificationFunction.
* comparisonData This is the data to be used to determine the expected results.
* colorModificationFunction A function used to create colors.  This should take in one argument,
  which is a color data object, and should return a newly created color.
*/
function colorSharedSpecs(colorData, comparisonData, colorModificationFunction) {

  var newColors;

  // set the comparison data
  comparisonData = comparisonData || colorData;

  beforeEach(function() {
    newColors = [];

    for (var i = 0; i < colorData.length; i++)
      newColors[i]= colorModificationFunction(colorData[i]); 
  });

  it("should set the red component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].red()).toEqual(comparisonData[i].r);
    }
  });

  it("should set the green component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].green()).toEqual(comparisonData[i].g);
    }
  });

  it("should set the blue component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].blue()).toEqual(comparisonData[i].b);
    }
  });

  it("should set the hue component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].hue()).toAlmostEqual(comparisonData[i].h);
    }
  });

  it("should set the saturation component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].saturation()).toAlmostEqual(comparisonData[i].s);
    }
  });

  it("should set the value component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].value()).toAlmostEqual(comparisonData[i].v);
    }
  });

  it("should set the hex component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].hex()).toEqual(comparisonData[i].hex);
    }
  });

  it("should set the string component", function() {
    for(var i = 0; i < colorData.length; i++) {
      expect(newColors[i].toString()).toEqual(comparisonData[i].hex);
    }
  });
}

describe("Color", function() {

  // a large array of pre-calculated test color properties
  var colors = JSON.parse(require('fs').readFileSync('./colorSpecColors.json','utf-8')).colors;

  // a large array of pre-calculated test color properties with three-digit hex codes
  var threeDigitHexColors = JSON.parse(require('fs').readFileSync('./colorSpecColors.json','utf-8')).threeDigitHexColors;

  // an array of colors to be created by the spec for testing
  var newColors;

  beforeEach(function() {

    // the margin of error for tests
    var epsilon = 0.000001

    // add custom matchers
    this.addMatchers({
      toAlmostEqual: function(expected) {
        return Math.abs(this.actual - expected) <= epsilon;
      }
    });
  });

  describe("constructor", function() {

    describe("when no arguments are provided", function() {
      it("should have a red component of 0", function() {
        expect(new Color().red()).toEqual(0);
      });
      
      it("should have a green component of 0", function() {
        expect(new Color().green()).toEqual(0);
      });
      
      it("should have a blue component of 0", function() {
        expect(new Color().blue()).toEqual(0);
      });
      
      it("should have a hue component of 0", function() {
        expect(new Color().hue()).toEqual(0);
      });
      
      it("should have a saturation component of 0", function() {
        expect(new Color().saturation()).toEqual(0);
      });
      
      it("should have a value component of 0", function() {
        expect(new Color().value()).toEqual(0);
      });
      
      it("should have a hex component of #000000", function() {
        expect(new Color().hex()).toEqual("#000000");
      });
      
      it("should have a string component of #000000", function() {
        expect(new Color().toString()).toEqual("#000000");
      });
    });

    describe("when three numbers are provided for the arguments", function() {

      /*
      WARNING: This spec caters to the implementation.
      */
      it("should call the setRGB method with the provided arguments", function() {
        spyOn(Color.prototype, 'setRGB');
        var color = new Color(63, 127, 191);
        expect(color.setRGB).wasCalledWith(63, 127, 191);
      });
    });

    describe("when a Color is provided for the first argument", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(data.r, data.g, data.b)
        return new Color(color); 
      });

    });

    describe("when a string is provided for the first argument", function() {
      /*
      WARNING: This spec caters to the implementation.
      */
      it("should call the setHex method with the provided argument", function() {
        spyOn(Color.prototype, 'setHex');
        var color = new Color("#FFFFFF");
        expect(color.setHex).wasCalledWith("#FFFFFF");
      });
    });

    describe("when some other kind of object is provided for the first argument", function() {

      it("should throw an exception", function() {
        var objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];

        for (var i = 0; i < objects.length; i++)
          expect(function() { new Color(objects[i]); }).toThrow("illegal_argument_exception");
      });
    });
  });

  describe("setRGB() method", function() {

    colorSharedSpecs(colors, colors, function(data) { 
      var color = new Color(0, 0, 0);
      color.setRGB(data.r, data.g, data.b);
      return color; 
    });

    it("should return the object being mutated", function() {
      var color = new Color(0, 0, 0);
      expect(color.setRGB(0, 0, 0)).toEqual(color);
    });

    describe("and the values are not between 0 and 255", function() {

      var colorData = [
        { r:-96, g:255, b:255, h:180, s:100, v:100, hex:"#00FFFF" },
        { r:383, g:255, b:255, h:  0, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:-96, b:255, h:300, s:100, v:100, hex:"#FF00FF" },
        { r:255, g:383, b:255, h:  0, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:255, b:-96, h: 60, s:100, v:100, hex:"#FFFF00" },
        { r:255, g:255, b:383, h:  0, s:  0, v:100, hex:"#FFFFFF" }
      ];

      var comparisonData = [
        { r:  0, g:255, b:255, h:180, s:100, v:100, hex:"#00FFFF" },
        { r:255, g:255, b:255, h:  0, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:  0, b:255, h:300, s:100, v:100, hex:"#FF00FF" },
        { r:255, g:255, b:255, h:  0, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:255, b:  0, h: 60, s:100, v:100, hex:"#FFFF00" },
        { r:255, g:255, b:255, h:  0, s:  0, v:100, hex:"#FFFFFF" }
      ];

      colorSharedSpecs(colorData, comparisonData, function(data) {
        var color = new Color(0, 0, 0);
        color.setRGB(data.r, data.g, data.b);
        return color; 
      });
    });

    describe("and the red contains a decimal", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setRGB(data.r + 0.75, data.g, data.b);
        return color; 
      });
    });

    describe("and the green contains a decimal", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setRGB(data.r, data.g + 0.75, data.b);
        return color; 
      });
    });

    describe("and the blue contains a decimal", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setRGB(data.r, data.g, data.b + 0.75);
        return color; 
      });
    });

    describe("and the first argument is not a number", function() {
      it("should throw an exception", function() {
        var color = new Color(0, 0, 0);
        expect(function() { color.setRGB("testing", 0, 0); }).toThrow("illegal_argument_exception");
      });
    });

    describe("and the second argument is not a number", function() {
      it("should throw an exception", function() {
        var color = new Color(0, 0, 0);
        expect(function() { color.setRGB(0, "testing", 0); }).toThrow("illegal_argument_exception");
      });
    });

    describe("and the third argument is not a number", function() {
      it("should throw an exception", function() {
        var color = new Color(0, 0, 0);
        expect(function() { color.setRGB(0, 0, "testing"); }).toThrow("illegal_argument_exception");
      });
    });
  });

  describe ("setHex() method", function() {

    it("should return the object being mutated", function() {
      var color = new Color(0, 0, 0);
      expect(color.setHex("#000000")).toEqual(color);
    });

    describe("with a hash and capitalized six hexadecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex);
        return color;
      });
    });

    describe("with a hash and lowercased six hexadecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex.toLowerCase());
        return color;
      });
    });

    describe("with six capitalized hexadecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex.slice(1, 8));
        return color;
      });
    });

    describe("with six lowercased hexadecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex.slice(1, 8).toLowerCase());
        return color;
      });
    });

    describe("with a hash and three capitalized hexadecimal digits", function() {

      colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) {
        var color = new Color(0, 0, 0);
        color.setHex(data.threeDigitHex);
        return color; 
      });
    });

    describe("with a hash and three lowercased hexadecimal digits", function() {

      colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.threeDigitHex.toLowerCase());
        return color;
      });
    });

    describe("with three capitalized hexadecimal digits", function() {

      colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.threeDigitHex.slice(1, 5));
        return color;
      });
    });

    describe("with three lowercased hexadecimal digits", function() {

      colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.threeDigitHex.slice(1, 5).toLowerCase());
        return color;
      });
    });

    describe("and the string is in some other format", function() {

      it("should throw an exception", function() {
        var invalidStrings = [ "","0", "00", "0000", "00000", "0000000", "00000000", "#0", 
          "#00", "#0000", "#00000", "#0000000", "#00000000", "rgba(0, 0, 0, 0)", "#G0FFFF", 
          "#FFG0FF", "#FFFFG0", "G0FFFF", "FFG0FF", "FFFFG0", "#GFF", "#FGF", "#FFG", "GFF", 
          "FGF", "FFG", "#g0ffff", "#ffg0ff", "#ffffg0", "g0ffff", "ffg0ff", "ffffg0", "#gff", 
          "#fgf", "#ffg", "gff", "fgf", "ffg", "invalid", "black", "white", "FFFFFF\nFFFFFF" ];

        for (var i = 0; i < invalidStrings.length; i++) {
          var color = new Color(0, 0, 0);
          expect(function() { color.setHex(invalidStrings[i]); }).toThrow("illegal_argument_exception");
        }
      });
    });

    describe("and something other than a string is provided as an argument", function() {
      it("should throw an exception", function() {
        var objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];

        for (var i = 0; i < objects.length; i++) {
          var color = new Color(0, 0, 0);
          expect(function() { color.setHex(objects[i]); }).toThrow("illegal_argument_exception");
        }
      });
    });
  });



  describe("setHSV() method", function() {

    colorSharedSpecs(colors, colors, function(data) { 
      var color = new Color(0, 0, 0);
      color.setHSV(data.h, data.s, data.v);
      return color; 
    });

    it("should return the object being mutated", function() {
      var color = new Color(0, 0, 0);
      expect(color.setHSV(0, 0, 0)).toEqual(color);
    });

    describe("when the hue is out of range", function() {

      var colorData = [
        { r:255, g:  0, b:  0, h:-360, s:100, v:100, hex:"#FF0000" },
        { r:255, g:255, b:  0, h:-300, s:100, v:100, hex:"#FFFF00" },
        { r:  0, g:255, b:  0, h:-240, s:100, v:100, hex:"#00FF00" },
        { r:  0, g:255, b:255, h:-180, s:100, v:100, hex:"#00FFFF" },
        { r:  0, g:  0, b:255, h:-120, s:100, v:100, hex:"#0000FF" },
        { r:255, g:  0, b:255, h: -60, s:100, v:100, hex:"#FF00FF" },
        { r:255, g:  0, b:  0, h: 360, s:100, v:100, hex:"#FF0000" },
        { r:255, g:255, b:  0, h: 420, s:100, v:100, hex:"#FFFF00" },
        { r:  0, g:255, b:  0, h: 480, s:100, v:100, hex:"#00FF00" },
        { r:  0, g:255, b:255, h: 540, s:100, v:100, hex:"#00FFFF" },
        { r:  0, g:  0, b:255, h: 600, s:100, v:100, hex:"#0000FF" },
        { r:255, g:  0, b:255, h: 660, s:100, v:100, hex:"#FF00FF" }
      ];

      var comparisonData = [
        { r:255, g:  0, b:  0, h:   0, s:100, v:100, hex:"#FF0000" },
        { r:255, g:255, b:  0, h:  60, s:100, v:100, hex:"#FFFF00" },
        { r:  0, g:255, b:  0, h: 120, s:100, v:100, hex:"#00FF00" },
        { r:  0, g:255, b:255, h: 180, s:100, v:100, hex:"#00FFFF" },
        { r:  0, g:  0, b:255, h: 240, s:100, v:100, hex:"#0000FF" },
        { r:255, g:  0, b:255, h: 300, s:100, v:100, hex:"#FF00FF" },
        { r:255, g:  0, b:  0, h:   0, s:100, v:100, hex:"#FF0000" },
        { r:255, g:255, b:  0, h:  60, s:100, v:100, hex:"#FFFF00" },
        { r:  0, g:255, b:  0, h: 120, s:100, v:100, hex:"#00FF00" },
        { r:  0, g:255, b:255, h: 180, s:100, v:100, hex:"#00FFFF" },
        { r:  0, g:  0, b:255, h: 240, s:100, v:100, hex:"#0000FF" },
        { r:255, g:  0, b:255, h: 300, s:100, v:100, hex:"#FF00FF" }
      ];

      colorSharedSpecs(colorData, comparisonData, function(data) {
        var color = new Color(0, 0, 0);
        color.setHSV(data.h, data.s, data.v);
        return color; 
      });
    });

    describe("when the saturation and value are out of range it should clamp their values", function() {

      var colorData = [
        { r:255, g:  0, b:  0, h:  0, s:150, v:100, hex:"#FF0000" },
        { r:255, g:255, b:255, h:  0, s:-50, v:100, hex:"#FFFFFF" },
        { r:255, g:  0, b:  0, h:  0, s:100, v:150, hex:"#FF0000" },
        { r:  0, g:  0, b:  0, h:  0, s:100, v:-50, hex:"#000000" }
      ];

      var comparisonData = [
        { r:255, g:  0, b:  0, h:  0, s:100, v:100, hex:"#FF0000" },
        { r:255, g:255, b:255, h:  0, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:  0, b:  0, h:  0, s:100, v:100, hex:"#FF0000" },
        { r:  0, g:  0, b:  0, h:  0, s:100, v:  0, hex:"#000000" }
      ];

      colorSharedSpecs(colorData, comparisonData, function(data) {
        var color = new Color(0, 0, 0);
        color.setHSV(data.h, data.s, data.v);
        return color; 
      });
    });

    describe("when the hue can correspond to multiple RGB values it should retain the provided value", function() {

      var colorData = [
        { r:255, g:255, b:255, h:  0, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:255, b:255, h: 60, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:255, b:255, h:120, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:255, b:255, h:180, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:255, b:255, h:240, s:  0, v:100, hex:"#FFFFFF" },
        { r:255, g:255, b:255, h:300, s:  0, v:100, hex:"#FFFFFF" }
      ];

      colorSharedSpecs(colorData, colorData, function(data) {
        var color = new Color(0, 0, 0);
        color.setHSV(data.h, data.s, data.v);
        return color; 
      });

    });

    describe("when the saturation can correspond to multiple RGB values", function() {

      var colorData = [
        { r:  0, g:  0, b:  0, h:  0, s:  0, v:  0, hex:"#000000" },
        { r:  0, g:  0, b:  0, h:  0, s: 25, v:  0, hex:"#000000" },
        { r:  0, g:  0, b:  0, h:  0, s: 50, v:  0, hex:"#000000" },
        { r:  0, g:  0, b:  0, h:  0, s: 75, v:  0, hex:"#000000" },
        { r:  0, g:  0, b:  0, h:  0, s:100, v:  0, hex:"#000000" }
      ];

      colorSharedSpecs(colorData, colorData, function(data) {
        var color = new Color(0, 0, 0);
        color.setHSV(data.h, data.s, data.v);
        return color; 
      });
    });

    describe("when the hue contains a decimal", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHSV(data.h + 0.75, data.s, data.v);
        return color; 
      });
    });

    describe("when the saturation contains a decimal", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHSV(data.h, data.s + 0.75, data.v);
        return color; 
      });
    });

    describe("when the value contains a decimal", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHSV(data.h, data.s, data.v + 0.75);
        return color; 
      });
    });

    describe("when something other than a number is provided for the first argument", function() {
      it("should throw an exception", function() {
        var objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];

        for (var i = 0; i < objects.length; i++) {
          var color = new Color(0, 0, 0);
          expect(function() { color.setHSV(objects[i], 0, 0); }).toThrow("illegal_argument_exception");
        }
      });
    });

    describe("when something other than a number is provided for the second argument", function() {
      it("should throw an exception", function() {
        var objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];

        for (var i = 0; i < objects.length; i++) {
          var color = new Color(0, 0, 0);
          expect(function() { color.setHSV(0, objects[i], 0); }).toThrow("illegal_argument_exception");
        }
      });
    });

    describe("when something other than a number is provided for the third argument", function() {
      it("should throw an exception", function() {
        var objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];

        for (var i = 0; i < objects.length; i++) {
          var color = new Color(0, 0, 0);
          expect(function() { color.setHSV(0, 0, objects[i]); }).toThrow("illegal_argument_exception");
        }
      });
    });
  });



  describe("setRed() method", function() {

    /*
    WARNING: This spec caters to the implementation.
    */
    it("should call the setRGB method with the new value of red and the current values of green and blue", function() {
      var color = new Color(63, 127, 191);
      spyOn(Color.prototype, 'setRGB');
      color.setRed(255);
      expect(color.setRGB).wasCalledWith(255, 127, 191);
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.setRed(0)).toEqual(color);
    });
  });

  describe("setGreen() method", function() {

    /*
    WARNING: This spec caters to the implementation.
    */
    it("should call the setRGB method with the new value of green and the current values of red and blue", function() {
      var color = new Color(63, 127, 191);
      spyOn(Color.prototype, 'setRGB');
      color.setGreen(255);
      expect(color.setRGB).wasCalledWith(63, 255, 191);
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.setGreen(0)).toEqual(color);
    });
  });

  describe("setBlue() method", function() {

    /*
    WARNING: This spec caters to the implementation.
    */
    it("should call the setRGB method with the new value of blue and the current values of red and green", function() {
      var color = new Color(63, 127, 191);
      spyOn(Color.prototype, 'setRGB');
      color.setBlue(255);
      expect(color.setRGB).wasCalledWith(63, 127, 255);
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.setBlue(0)).toEqual(color);
    });
  });

  describe("setHue() method", function() {

    /*
    WARNING: This spec caters to the implementation.
    */
    it("should call the setHSV method with the new value of hue and the current values of saturation and value", function() {
      var color = new Color(0, 0, 0);
      color.setHSV(0, 50, 75);
      spyOn(Color.prototype, 'setHSV');
      color.setHue(180);
      expect(color.setHSV).wasCalledWith(180, 50, 75);
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.setHue(0)).toEqual(color);
    });
  });

  describe("setSaturation() method", function() {

    /*
    WARNING: This spec caters to the implementation.
    */
    it("should call the setHSV method with the new value of saturation and the current values of hue and value", function() {
      var color = new Color(0, 0, 0);
      color.setHSV(0, 50, 75);
      spyOn(Color.prototype, 'setHSV');
      color.setSaturation(25);
      expect(color.setHSV).wasCalledWith(0, 25, 75);
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.setSaturation(0)).toEqual(color);
    });
  });

  describe("setValue() method", function() {

    /*
    WARNING: This spec caters to the implementation.
    */
    it("should call the setHSV method with the new value of value and the current values of hue and saturation", function() {
      var color = new Color(0, 0, 0);
      color.setHSV(0, 50, 75);
      spyOn(Color.prototype, 'setHSV');
      color.setValue(25);
      expect(color.setHSV).wasCalledWith(0, 50, 25);
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.setValue(0)).toEqual(color);
    });
  });

  describe("rotate() method", function() {

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.rotate(0)).toEqual(color);
    });

    describe("when the provided value is positive", function() {
      describe("when the provided value plus the current hue is not out of bounds", function() {
        /*
        WARNING: This spec caters to the implementation.
        */
        it("should call setHue with the current value plus the provided value", function() {
          var color = new Color(0, 0, 0).setHue(30);
          spyOn(Color.prototype, 'setHue');
          color.rotate(60);
          expect(color.setHue).wasCalledWith(90);
        });
      });

      describe("when the provided value plus the current hue is out of bounds", function() {
        /*
        WARNING: This spec caters to the implementation.
        */
        it("should call setHue with the current value plus the provided value", function() {
          var color = new Color(0, 0, 0).setHue(330);
          spyOn(Color.prototype, 'setHue');
          color.rotate(60);
          expect(color.setHue).wasCalledWith(390);
        });
      });
    });

    describe("when the provided value is negative", function() {
      describe("when the provided value plus the current hue is not out of bounds", function() {
        /*
        WARNING: This spec caters to the implementation.
        */
        it("should call setHue with the current value plus the provided value", function() {
          var color = new Color(0, 0, 0).setHue(330);
          spyOn(Color.prototype, 'setHue');
          color.rotate(-60);
          expect(color.setHue).wasCalledWith(270);
        });
      });

      describe("when the provided value plus the current hue is out of bounds", function() {
        /*
        WARNING: This spec caters to the implementation.
        */
        it("should call setHue with the current value plus the provided value", function() {
          var color = new Color(0, 0, 0).setHue(30);
          spyOn(Color.prototype, 'setHue');
          color.rotate(-60);
          expect(color.setHue).wasCalledWith(-30);
        });
      });
    });
  });

  describe("complement() method", function() {
    it("should call setHue with the current value of hue plus 180", function() {
      spyOn(Color.prototype, 'setHue');

      for (var amount = 0; amount < 360; amount += 30)
      {
        /*
        spyOn breaks the setHue method, so it can't actually be used here.
        */
        var color = (new Color(0, 0, 0));
        color.setHSV(amount, 0, 0);
        color.setHue.reset();
        color.complement();
        expect(color.setHue).wasCalledWith(amount + 180);
      }
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.complement()).toEqual(color);
    });
  });

  describe("saturate() method", function() {
    it("should call the setSaturation method with the current value of saturation plus the provided value", function() {
      spyOn(Color.prototype, 'setSaturation');

      for (var amount = 0; amount <= 100; amount += 25)
      {
        /*
        spyOn breaks the setSaturation method, so it can't actually be used here.
        */
        var color = (new Color(0, 0, 0));
        color.setHSV(0, 50, 0);
        color.setSaturation.reset();
        color.saturate(amount);
        expect(color.setSaturation).wasCalledWith(50 + amount);
      }
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.saturate(0)).toEqual(color);
    });
  });

  describe("desaturate() method", function() {
    it("should call the setSaturation method with the current value of saturation minus the provided value", function() {
      spyOn(Color.prototype, 'setSaturation');

      for (var amount = 0; amount <= 100; amount += 25)
      {
        /*
        spyOn breaks the setSaturation method, so it can't actually be used here.
        */
        var color = (new Color(0, 0, 0));
        color.setHSV(0, 50, 0);
        color.setSaturation.reset();
        color.desaturate(amount);
        expect(color.setSaturation).wasCalledWith(50 - amount);
      }
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.desaturate(0)).toEqual(color);
    });
  });

  describe("lighten() method", function() {
    it("should call the setValue() method with the current value of the value component plus the provided value", function() {
      spyOn(Color.prototype, 'setValue');

      for (var amount = 0; amount <= 100; amount += 25)
      {
        /*
        spyOn breaks the setValue method, so it can't actually be used here.
        */
        var color = (new Color(0, 0, 0));
        color.setHSV(0, 0, 50);
        color.setValue.reset();
        color.lighten(amount);
        expect(color.setValue).wasCalledWith(50 + amount);
      }
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.lighten(0)).toEqual(color);
    });
  });

  describe("darken() method", function() {
    it("should call the setValue() method with the current value of the value component plus the provided value", function() {
      spyOn(Color.prototype, 'setValue');

      for (var amount = 0; amount <= 100; amount += 25)
      {
        /*
        spyOn breaks the setValue method, so it can't actually be used here.
        */
        var color = (new Color(0, 0, 0));
        color.setHSV(0, 0, 50);
        color.setValue.reset();
        color.darken(amount);
        expect(color.setValue).wasCalledWith(50 - amount);
      }
    });

    it("should return the current color", function() {
      var color = new Color(0, 0, 0);
      expect(color.darken(0)).toEqual(color);
    });
  });

  describe("equals() method", function() {
    it ("should return true if two colors are exactly the same", function() {
      var color1 = new Color(255, 0, 0);
      var color2 = new Color(255, 0, 0);
      expect(color1.equals(color2)).toEqual(true);
    });
    
    it ("should return true if two have the same RGB values but different hues", function() {
      var color1 = new Color(0, 0, 0);
      var color2 = new Color(0, 0, 0);
      color2.setHue(180);
      expect(color1.equals(color2)).toEqual(true);
    });
    
    it ("should return true if two have the same RGB values but different saturations", function() {
      var color1 = new Color(0, 0, 0);
      var color2 = new Color(0, 0, 0);
      color2.setSaturation(50);
      expect(color1.equals(color2)).toEqual(true);
    });
    
    it ("should return false if two colors have different red components", function() {
      var color1 = new Color(255, 0, 0);
      var color2 = new Color(0, 0, 0);
      expect(color1.equals(color2)).toEqual(false);
    });
    
    it ("should return false if two colors have different green components", function() {
      var color1 = new Color(0, 255, 0);
      var color2 = new Color(0, 0, 0);
      expect(color1.equals(color2)).toEqual(false);
    });
    
    it ("should return false if two colors have different blue components", function() {
      var color1 = new Color(0, 0, 255);
      var color2 = new Color(0, 0, 0);
      expect(color1.equals(color2)).toEqual(false);
    });

    it("should return false if the provided object is not a color", function() {
      var color = new Color(0, 0, 0);
      var objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];

        for (var i = 0; i < objects.length; i++)
          expect(color.equals(objects[i])).toEqual(false);
    });
  });

  describe("clone() method", function() {
    it("should return a color object", function() {
      var color = new Color(0, 127, 255);
      var clone = color.clone();

      expect(clone instanceof Color).toEqual(true);
    });

    it("should have all of the same properties as the original color", function() {
      var color = new Color(0, 127, 255);
      var clone = color.clone();

      expect(color.red() === clone.red()).toEqual(true);
      expect(color.green() === clone.green()).toEqual(true);
      expect(color.blue() === clone.blue()).toEqual(true);
      expect(color.hue() === clone.hue()).toEqual(true);
      expect(color.saturation() === clone.saturation()).toEqual(true);
      expect(color.value() === clone.value()).toEqual(true);
      expect(color.hex() === clone.hex()).toEqual(true);
      expect(color.toString() === clone.toString()).toEqual(true);
    });

    it("should not be the same object as the original", function() {
      var color = new Color(0, 127, 255);
      var clone = color.clone();

      expect(color === clone).toEqual(false);
    });
  });

  describe("Color.rgb() method", function() {
    it("should return a new color", function() {
      expect(Color.rgb(0, 0, 0) instanceof Color).toEqual(true);
    });

    it("should call the setRGB() method with the provided parameters", function() {
      spyOn(Color.prototype, "setRGB");
      Color.rgb(30, 50, 70);
      expect(Color.prototype.setRGB).wasCalledWith(30, 50, 70);
    });
  });

  describe("Color.hsv() method", function() {
    it("should return a new color", function() {
      expect(Color.hsv(0, 0, 0) instanceof Color).toEqual(true);
    });

    it("should call the setHSV() method with the provided parameters", function() {
      spyOn(Color.prototype, "setHSV");
      Color.hsv(30, 50, 70);
      expect(Color.prototype.setHSV).wasCalledWith(30, 50, 70);
    });
  });

  describe("Color.hex() method", function() {
    it("should return a new color", function() {
      expect(Color.hex("#FFFFFF") instanceof Color).toEqual(true);
    });

    it("should call the setHex() method with the provided parameters", function() {
      spyOn(Color.prototype, "setHex");
      Color.hex("#FFFFFF");
      expect(Color.prototype.setHex).wasCalledWith("#FFFFFF");
    });
  });

  describe("Color.random() method", function() {
    it("should return a new color", function() {
      expect(Color.random() instanceof Color).toEqual(true);
    });
  });

  describe("Color.aliceBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.aliceBlue().red()).toEqual(240);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.aliceBlue().green()).toEqual(248);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.aliceBlue().blue()).toEqual(255);
    });
  });

  describe("Color.antiqueWhite() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.antiqueWhite().red()).toEqual(250);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.antiqueWhite().green()).toEqual(235);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.antiqueWhite().blue()).toEqual(215);
    });
  });

  describe("Color.aqua() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.aqua().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.aqua().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.aqua().blue()).toEqual(255);
    });
  });

  describe("Color.aquamarine() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.aquamarine().red()).toEqual(127);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.aquamarine().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.aquamarine().blue()).toEqual(212);
    });
  });

  describe("Color.azure() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.azure().red()).toEqual(240);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.azure().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.azure().blue()).toEqual(255);
    });
  });

  describe("Color.beige() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.beige().red()).toEqual(245);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.beige().green()).toEqual(245);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.beige().blue()).toEqual(220);
    });
  });

  describe("Color.bisque() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.bisque().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.bisque().green()).toEqual(228);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.bisque().blue()).toEqual(196);
    });
  });

  describe("Color.black() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.black().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.black().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.black().blue()).toEqual(0);
    });
  });

  describe("Color.blanchedAlmond() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.blanchedAlmond().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.blanchedAlmond().green()).toEqual(235);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.blanchedAlmond().blue()).toEqual(205);
    });
  });

  describe("Color.blue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.blue().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.blue().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.blue().blue()).toEqual(255);
    });
  });

  describe("Color.blueViolet() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.blueViolet().red()).toEqual(138);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.blueViolet().green()).toEqual(43);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.blueViolet().blue()).toEqual(226);
    });
  });

  describe("Color.brown() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.brown().red()).toEqual(165);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.brown().green()).toEqual(42);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.brown().blue()).toEqual(42);
    });
  });

  describe("Color.burlywood() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.burlywood().red()).toEqual(222);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.burlywood().green()).toEqual(184);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.burlywood().blue()).toEqual(135);
    });
  });

  describe("Color.cadetBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.cadetBlue().red()).toEqual(95);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.cadetBlue().green()).toEqual(158);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.cadetBlue().blue()).toEqual(160);
    });
  });

  describe("Color.chartreuse() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.chartreuse().red()).toEqual(127);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.chartreuse().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.chartreuse().blue()).toEqual(0);
    });
  });

  describe("Color.chocolate() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.chocolate().red()).toEqual(210);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.chocolate().green()).toEqual(105);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.chocolate().blue()).toEqual(30);
    });
  });

  describe("Color.coral() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.coral().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.coral().green()).toEqual(127);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.coral().blue()).toEqual(80);
    });
  });

  describe("Color.cornflowerBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.cornflowerBlue().red()).toEqual(100);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.cornflowerBlue().green()).toEqual(149);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.cornflowerBlue().blue()).toEqual(237);
    });
  });

  describe("Color.cornsilk() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.cornsilk().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.cornsilk().green()).toEqual(248);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.cornsilk().blue()).toEqual(220);
    });
  });

  describe("Color.crimson() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.crimson().red()).toEqual(220);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.crimson().green()).toEqual(20);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.crimson().blue()).toEqual(60);
    });
  });

  describe("Color.cyan() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.cyan().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.cyan().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.cyan().blue()).toEqual(255);
    });
  });

  describe("Color.darkBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkBlue().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkBlue().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkBlue().blue()).toEqual(139);
    });
  });

  describe("Color.darkCyan() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkCyan().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkCyan().green()).toEqual(139);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkCyan().blue()).toEqual(139);
    });
  });

  describe("Color.darkGoldenrod() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkGoldenrod().red()).toEqual(184);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkGoldenrod().green()).toEqual(134);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkGoldenrod().blue()).toEqual(11);
    });
  });

  describe("Color.darkGray() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkGray().red()).toEqual(169);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkGray().green()).toEqual(169);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkGray().blue()).toEqual(169);
    });
  });

  describe("Color.darkGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkGreen().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkGreen().green()).toEqual(100);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkGreen().blue()).toEqual(0);
    });
  });

  describe("Color.darkGrey() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkGrey().red()).toEqual(169);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkGrey().green()).toEqual(169);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkGrey().blue()).toEqual(169);
    });
  });

  describe("Color.darkKhaki() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkKhaki().red()).toEqual(189);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkKhaki().green()).toEqual(183);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkKhaki().blue()).toEqual(107);
    });
  });

  describe("Color.darkMagenta() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkMagenta().red()).toEqual(139);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkMagenta().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkMagenta().blue()).toEqual(139);
    });
  });

  describe("Color.darkOliveGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkOliveGreen().red()).toEqual(85);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkOliveGreen().green()).toEqual(107);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkOliveGreen().blue()).toEqual(47);
    });
  });

  describe("Color.darkOrange() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkOrange().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkOrange().green()).toEqual(140);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkOrange().blue()).toEqual(0);
    });
  });

  describe("Color.darkOrchid() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkOrchid().red()).toEqual(153);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkOrchid().green()).toEqual(50);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkOrchid().blue()).toEqual(204);
    });
  });

  describe("Color.darkRed() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkRed().red()).toEqual(139);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkRed().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkRed().blue()).toEqual(0);
    });
  });

  describe("Color.darkSalmon() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkSalmon().red()).toEqual(233);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkSalmon().green()).toEqual(150);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkSalmon().blue()).toEqual(122);
    });
  });

  describe("Color.darkSeaGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkSeaGreen().red()).toEqual(143);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkSeaGreen().green()).toEqual(188);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkSeaGreen().blue()).toEqual(143);
    });
  });

  describe("Color.darkSlateBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkSlateBlue().red()).toEqual(72);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkSlateBlue().green()).toEqual(61);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkSlateBlue().blue()).toEqual(139);
    });
  });

  describe("Color.darkSlateGray() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkSlateGray().red()).toEqual(47);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkSlateGray().green()).toEqual(79);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkSlateGray().blue()).toEqual(79);
    });
  });

  describe("Color.darkSlateGrey() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkSlateGrey().red()).toEqual(47);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkSlateGrey().green()).toEqual(79);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkSlateGrey().blue()).toEqual(79);
    });
  });

  describe("Color.darkTurquoise() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkTurquoise().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkTurquoise().green()).toEqual(206);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkTurquoise().blue()).toEqual(209);
    });
  });

  describe("Color.darkViolet() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.darkViolet().red()).toEqual(148);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.darkViolet().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.darkViolet().blue()).toEqual(211);
    });
  });

  describe("Color.deepPink() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.deepPink().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.deepPink().green()).toEqual(20);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.deepPink().blue()).toEqual(147);
    });
  });

  describe("Color.deepSkyBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.deepSkyBlue().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.deepSkyBlue().green()).toEqual(191);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.deepSkyBlue().blue()).toEqual(255);
    });
  });

  describe("Color.dimGray() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.dimGray().red()).toEqual(105);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.dimGray().green()).toEqual(105);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.dimGray().blue()).toEqual(105);
    });
  });

  describe("Color.dimGrey() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.dimGrey().red()).toEqual(105);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.dimGrey().green()).toEqual(105);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.dimGrey().blue()).toEqual(105);
    });
  });

  describe("Color.dodgerBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.dodgerBlue().red()).toEqual(30);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.dodgerBlue().green()).toEqual(144);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.dodgerBlue().blue()).toEqual(255);
    });
  });

  describe("Color.firebrick() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.firebrick().red()).toEqual(178);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.firebrick().green()).toEqual(34);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.firebrick().blue()).toEqual(34);
    });
  });

  describe("Color.floralWhite() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.floralWhite().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.floralWhite().green()).toEqual(250);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.floralWhite().blue()).toEqual(240);
    });
  });

  describe("Color.forestGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.forestGreen().red()).toEqual(34);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.forestGreen().green()).toEqual(139);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.forestGreen().blue()).toEqual(34);
    });
  });

  describe("Color.fuchsia() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.fuchsia().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.fuchsia().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.fuchsia().blue()).toEqual(255);
    });
  });

  describe("Color.gainsboro() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.gainsboro().red()).toEqual(220);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.gainsboro().green()).toEqual(220);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.gainsboro().blue()).toEqual(220);
    });
  });

  describe("Color.ghostWhite() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.ghostWhite().red()).toEqual(248);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.ghostWhite().green()).toEqual(248);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.ghostWhite().blue()).toEqual(255);
    });
  });

  describe("Color.gold() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.gold().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.gold().green()).toEqual(215);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.gold().blue()).toEqual(0);
    });
  });

  describe("Color.goldenrod() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.goldenrod().red()).toEqual(218);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.goldenrod().green()).toEqual(165);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.goldenrod().blue()).toEqual(32);
    });
  });

  describe("Color.gray() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.gray().red()).toEqual(128);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.gray().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.gray().blue()).toEqual(128);
    });
  });

  describe("Color.green() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.green().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.green().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.green().blue()).toEqual(0);
    });
  });

  describe("Color.greenYellow() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.greenYellow().red()).toEqual(173);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.greenYellow().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.greenYellow().blue()).toEqual(47);
    });
  });

  describe("Color.grey() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.grey().red()).toEqual(128);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.grey().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.grey().blue()).toEqual(128);
    });
  });

  describe("Color.honeydew() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.honeydew().red()).toEqual(240);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.honeydew().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.honeydew().blue()).toEqual(240);
    });
  });

  describe("Color.hotPink() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.hotPink().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.hotPink().green()).toEqual(105);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.hotPink().blue()).toEqual(180);
    });
  });

  describe("Color.indianRed() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.indianRed().red()).toEqual(205);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.indianRed().green()).toEqual(92);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.indianRed().blue()).toEqual(92);
    });
  });

  describe("Color.indigo() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.indigo().red()).toEqual(75);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.indigo().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.indigo().blue()).toEqual(130);
    });
  });

  describe("Color.ivory() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.ivory().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.ivory().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.ivory().blue()).toEqual(240);
    });
  });

  describe("Color.khaki() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.khaki().red()).toEqual(240);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.khaki().green()).toEqual(230);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.khaki().blue()).toEqual(140);
    });
  });

  describe("Color.lavender() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lavender().red()).toEqual(230);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lavender().green()).toEqual(230);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lavender().blue()).toEqual(250);
    });
  });

  describe("Color.lavenderBlush() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lavenderBlush().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lavenderBlush().green()).toEqual(240);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lavenderBlush().blue()).toEqual(245);
    });
  });

  describe("Color.lawnGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lawnGreen().red()).toEqual(124);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lawnGreen().green()).toEqual(252);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lawnGreen().blue()).toEqual(0);
    });
  });

  describe("Color.lemonChiffon() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lemonChiffon().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lemonChiffon().green()).toEqual(250);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lemonChiffon().blue()).toEqual(205);
    });
  });

  describe("Color.lightBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightBlue().red()).toEqual(173);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightBlue().green()).toEqual(216);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightBlue().blue()).toEqual(230);
    });
  });

  describe("Color.lightCoral() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightCoral().red()).toEqual(240);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightCoral().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightCoral().blue()).toEqual(128);
    });
  });

  describe("Color.lightCyan() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightCyan().red()).toEqual(224);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightCyan().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightCyan().blue()).toEqual(255);
    });
  });

  describe("Color.lightGoldenrodYellow() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightGoldenrodYellow().red()).toEqual(250);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightGoldenrodYellow().green()).toEqual(250);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightGoldenrodYellow().blue()).toEqual(210);
    });
  });

  describe("Color.lightGray() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightGray().red()).toEqual(211);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightGray().green()).toEqual(211);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightGray().blue()).toEqual(211);
    });
  });

  describe("Color.lightGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightGreen().red()).toEqual(144);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightGreen().green()).toEqual(238);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightGreen().blue()).toEqual(144);
    });
  });

  describe("Color.lightGrey() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightGrey().red()).toEqual(211);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightGrey().green()).toEqual(211);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightGrey().blue()).toEqual(211);
    });
  });

  describe("Color.lightPink() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightPink().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightPink().green()).toEqual(182);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightPink().blue()).toEqual(193);
    });
  });

  describe("Color.lightSalmon() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightSalmon().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightSalmon().green()).toEqual(160);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightSalmon().blue()).toEqual(122);
    });
  });

  describe("Color.lightSeaGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightSeaGreen().red()).toEqual(32);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightSeaGreen().green()).toEqual(178);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightSeaGreen().blue()).toEqual(170);
    });
  });

  describe("Color.lightSkyBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightSkyBlue().red()).toEqual(135);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightSkyBlue().green()).toEqual(206);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightSkyBlue().blue()).toEqual(250);
    });
  });

  describe("Color.lightSlateGray() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightSlateGray().red()).toEqual(119);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightSlateGray().green()).toEqual(136);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightSlateGray().blue()).toEqual(153);
    });
  });

  describe("Color.lightSlateGrey() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightSlateGrey().red()).toEqual(119);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightSlateGrey().green()).toEqual(136);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightSlateGrey().blue()).toEqual(153);
    });
  });

  describe("Color.lightSteelBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightSteelBlue().red()).toEqual(176);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightSteelBlue().green()).toEqual(196);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightSteelBlue().blue()).toEqual(222);
    });
  });

  describe("Color.lightYellow() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lightYellow().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lightYellow().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lightYellow().blue()).toEqual(224);
    });
  });

  describe("Color.lime() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.lime().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.lime().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.lime().blue()).toEqual(0);
    });
  });

  describe("Color.limeGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.limeGreen().red()).toEqual(50);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.limeGreen().green()).toEqual(205);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.limeGreen().blue()).toEqual(50);
    });
  });

  describe("Color.linen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.linen().red()).toEqual(250);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.linen().green()).toEqual(240);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.linen().blue()).toEqual(230);
    });
  });

  describe("Color.magenta() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.magenta().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.magenta().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.magenta().blue()).toEqual(255);
    });
  });

  describe("Color.maroon() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.maroon().red()).toEqual(128);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.maroon().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.maroon().blue()).toEqual(0);
    });
  });

  describe("Color.mediumAquamarine() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumAquamarine().red()).toEqual(102);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumAquamarine().green()).toEqual(205);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumAquamarine().blue()).toEqual(170);
    });
  });

  describe("Color.mediumBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumBlue().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumBlue().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumBlue().blue()).toEqual(205);
    });
  });

  describe("Color.mediumOrchid() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumOrchid().red()).toEqual(186);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumOrchid().green()).toEqual(85);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumOrchid().blue()).toEqual(211);
    });
  });

  describe("Color.mediumPurple() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumPurple().red()).toEqual(147);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumPurple().green()).toEqual(112);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumPurple().blue()).toEqual(219);
    });
  });

  describe("Color.mediumSeaGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumSeaGreen().red()).toEqual(60);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumSeaGreen().green()).toEqual(179);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumSeaGreen().blue()).toEqual(113);
    });
  });

  describe("Color.mediumSlateBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumSlateBlue().red()).toEqual(123);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumSlateBlue().green()).toEqual(104);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumSlateBlue().blue()).toEqual(238);
    });
  });

  describe("Color.mediumSpringGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumSpringGreen().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumSpringGreen().green()).toEqual(250);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumSpringGreen().blue()).toEqual(154);
    });
  });

  describe("Color.mediumTurquoise() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumTurquoise().red()).toEqual(72);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumTurquoise().green()).toEqual(209);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumTurquoise().blue()).toEqual(204);
    });
  });

  describe("Color.mediumVioletRed() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mediumVioletRed().red()).toEqual(199);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mediumVioletRed().green()).toEqual(21);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mediumVioletRed().blue()).toEqual(133);
    });
  });

  describe("Color.midnightBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.midnightBlue().red()).toEqual(25);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.midnightBlue().green()).toEqual(25);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.midnightBlue().blue()).toEqual(112);
    });
  });

  describe("Color.mintCream() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mintCream().red()).toEqual(245);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mintCream().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mintCream().blue()).toEqual(250);
    });
  });

  describe("Color.mistyRose() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.mistyRose().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.mistyRose().green()).toEqual(228);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.mistyRose().blue()).toEqual(225);
    });
  });

  describe("Color.moccasin() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.moccasin().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.moccasin().green()).toEqual(228);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.moccasin().blue()).toEqual(181);
    });
  });

  describe("Color.navajoWhite() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.navajoWhite().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.navajoWhite().green()).toEqual(222);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.navajoWhite().blue()).toEqual(173);
    });
  });

  describe("Color.navy() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.navy().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.navy().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.navy().blue()).toEqual(128);
    });
  });

  describe("Color.oldLace() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.oldLace().red()).toEqual(253);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.oldLace().green()).toEqual(245);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.oldLace().blue()).toEqual(230);
    });
  });

  describe("Color.olive() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.olive().red()).toEqual(128);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.olive().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.olive().blue()).toEqual(0);
    });
  });

  describe("Color.oliveDrab() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.oliveDrab().red()).toEqual(107);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.oliveDrab().green()).toEqual(142);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.oliveDrab().blue()).toEqual(35);
    });
  });

  describe("Color.orange() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.orange().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.orange().green()).toEqual(165);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.orange().blue()).toEqual(0);
    });
  });

  describe("Color.orangeRed() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.orangeRed().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.orangeRed().green()).toEqual(69);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.orangeRed().blue()).toEqual(0);
    });
  });

  describe("Color.orchid() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.orchid().red()).toEqual(218);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.orchid().green()).toEqual(112);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.orchid().blue()).toEqual(214);
    });
  });

  describe("Color.paleGoldenrod() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.paleGoldenrod().red()).toEqual(238);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.paleGoldenrod().green()).toEqual(232);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.paleGoldenrod().blue()).toEqual(170);
    });
  });

  describe("Color.paleGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.paleGreen().red()).toEqual(152);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.paleGreen().green()).toEqual(251);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.paleGreen().blue()).toEqual(152);
    });
  });

  describe("Color.paleTurquoise() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.paleTurquoise().red()).toEqual(175);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.paleTurquoise().green()).toEqual(238);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.paleTurquoise().blue()).toEqual(238);
    });
  });

  describe("Color.paleVioletRed() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.paleVioletRed().red()).toEqual(219);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.paleVioletRed().green()).toEqual(112);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.paleVioletRed().blue()).toEqual(147);
    });
  });

  describe("Color.papayaWhip() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.papayaWhip().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.papayaWhip().green()).toEqual(239);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.papayaWhip().blue()).toEqual(213);
    });
  });

  describe("Color.peachPuff() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.peachPuff().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.peachPuff().green()).toEqual(218);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.peachPuff().blue()).toEqual(185);
    });
  });

  describe("Color.peru() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.peru().red()).toEqual(205);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.peru().green()).toEqual(133);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.peru().blue()).toEqual(63);
    });
  });

  describe("Color.pink() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.pink().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.pink().green()).toEqual(192);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.pink().blue()).toEqual(203);
    });
  });

  describe("Color.plum() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.plum().red()).toEqual(221);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.plum().green()).toEqual(160);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.plum().blue()).toEqual(221);
    });
  });

  describe("Color.powderBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.powderBlue().red()).toEqual(176);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.powderBlue().green()).toEqual(224);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.powderBlue().blue()).toEqual(230);
    });
  });

  describe("Color.purple() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.purple().red()).toEqual(128);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.purple().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.purple().blue()).toEqual(128);
    });
  });

  describe("Color.red() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.red().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.red().green()).toEqual(0);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.red().blue()).toEqual(0);
    });
  });

  describe("Color.rosyBrown() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.rosyBrown().red()).toEqual(188);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.rosyBrown().green()).toEqual(143);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.rosyBrown().blue()).toEqual(143);
    });
  });

  describe("Color.royalBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.royalBlue().red()).toEqual(65);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.royalBlue().green()).toEqual(105);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.royalBlue().blue()).toEqual(225);
    });
  });

  describe("Color.saddleBrown() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.saddleBrown().red()).toEqual(139);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.saddleBrown().green()).toEqual(69);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.saddleBrown().blue()).toEqual(19);
    });
  });

  describe("Color.salmon() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.salmon().red()).toEqual(250);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.salmon().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.salmon().blue()).toEqual(114);
    });
  });

  describe("Color.sandyBrown() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.sandyBrown().red()).toEqual(244);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.sandyBrown().green()).toEqual(164);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.sandyBrown().blue()).toEqual(96);
    });
  });

  describe("Color.seaGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.seaGreen().red()).toEqual(46);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.seaGreen().green()).toEqual(139);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.seaGreen().blue()).toEqual(87);
    });
  });

  describe("Color.seashell() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.seashell().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.seashell().green()).toEqual(245);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.seashell().blue()).toEqual(238);
    });
  });

  describe("Color.sienna() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.sienna().red()).toEqual(160);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.sienna().green()).toEqual(82);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.sienna().blue()).toEqual(45);
    });
  });

  describe("Color.silver() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.silver().red()).toEqual(192);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.silver().green()).toEqual(192);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.silver().blue()).toEqual(192);
    });
  });

  describe("Color.skyBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.skyBlue().red()).toEqual(135);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.skyBlue().green()).toEqual(206);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.skyBlue().blue()).toEqual(235);
    });
  });

  describe("Color.slateBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.slateBlue().red()).toEqual(106);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.slateBlue().green()).toEqual(90);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.slateBlue().blue()).toEqual(205);
    });
  });

  describe("Color.slateGray() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.slateGray().red()).toEqual(112);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.slateGray().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.slateGray().blue()).toEqual(144);
    });
  });

  describe("Color.slateGrey() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.slateGrey().red()).toEqual(112);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.slateGrey().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.slateGrey().blue()).toEqual(144);
    });
  });

  describe("Color.snow() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.snow().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.snow().green()).toEqual(250);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.snow().blue()).toEqual(250);
    });
  });

  describe("Color.springGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.springGreen().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.springGreen().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.springGreen().blue()).toEqual(127);
    });
  });

  describe("Color.steelBlue() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.steelBlue().red()).toEqual(70);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.steelBlue().green()).toEqual(130);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.steelBlue().blue()).toEqual(180);
    });
  });

  describe("Color.tan() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.tan().red()).toEqual(210);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.tan().green()).toEqual(180);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.tan().blue()).toEqual(140);
    });
  });

  describe("Color.teal() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.teal().red()).toEqual(0);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.teal().green()).toEqual(128);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.teal().blue()).toEqual(128);
    });
  });

  describe("Color.thistle() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.thistle().red()).toEqual(216);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.thistle().green()).toEqual(191);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.thistle().blue()).toEqual(216);
    });
  });

  describe("Color.tomato() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.tomato().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.tomato().green()).toEqual(99);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.tomato().blue()).toEqual(71);
    });
  });

  describe("Color.turquoise() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.turquoise().red()).toEqual(64);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.turquoise().green()).toEqual(224);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.turquoise().blue()).toEqual(208);
    });
  });

  describe("Color.violet() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.violet().red()).toEqual(238);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.violet().green()).toEqual(130);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.violet().blue()).toEqual(238);
    });
  });

  describe("Color.wheat() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.wheat().red()).toEqual(245);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.wheat().green()).toEqual(222);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.wheat().blue()).toEqual(179);
    });
  });

  describe("Color.white() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.white().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.white().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.white().blue()).toEqual(255);
    });
  });

  describe("Color.whiteSmoke() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.whiteSmoke().red()).toEqual(245);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.whiteSmoke().green()).toEqual(245);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.whiteSmoke().blue()).toEqual(245);
    });
  });

  describe("Color.yellow() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.yellow().red()).toEqual(255);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.yellow().green()).toEqual(255);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.yellow().blue()).toEqual(0);
    });
  });

  describe("Color.yellowGreen() function", function() {
    it("should return a color with the correct red value", function() {
      expect(Color.yellowGreen().red()).toEqual(154);
    });
  
    it("should return a color with the correct green value", function() {
      expect(Color.yellowGreen().green()).toEqual(205);
    });
  
    it("should return a color with the correct blue value", function() {
      expect(Color.yellowGreen().blue()).toEqual(50);
    });
  });
});