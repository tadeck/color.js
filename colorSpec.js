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

    describe("when three numbers are provided for the arguments", function() {

      /*
      WARNING: This spec caters to the implementation.  However, it significantly reduces code duplication.
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

      describe("with a hash and capitalized six hexidecimal digits", function() {

        colorSharedSpecs(colors, colors, function(data) { 
          return new Color(data.hex); 
        });
      });

      describe("with a hash and lowercased six hexidecimal digits", function() {

        colorSharedSpecs(colors, colors, function(data) { 
          return new Color(data.hex.toLowerCase()); 
        });
      });

      describe("with six capitalized hexidecimal digits", function() {

        colorSharedSpecs(colors, colors, function(data) { 
          return new Color(data.hex.slice(1, 8)); 
        });
      });

      describe("with six lowercased hexidecimal digits", function() {

        colorSharedSpecs(colors, colors, function(data) { 
          return new Color(data.hex.slice(1, 8).toLowerCase()); 
        });
      });

      describe("with a hash and three capitalized hexidecimal digits", function() {

        colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
          return new Color(data.threeDigitHex); 
        });
      });

      describe("with a hash and three lowercased hexidecimal digits", function() {

        colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
          return new Color(data.threeDigitHex.toLowerCase()); 
        });
      });

      describe("with three capitalized hexidecimal digits", function() {

        colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
          return new Color(data.threeDigitHex.slice(1, 5)); 
        });
      });

      describe("with three lowercased hexidecimal digits", function() {

        colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
          return new Color(data.threeDigitHex.slice(1, 5).toLowerCase()); 
        });
      });

      describe("and the string is in some other format", function() {

        it("should throw an exception", function() {
          var invalidStrings = [ "","0", "00", "0000", "00000", "0000000", "00000000", "#0", 
            "#00", "#0000", "#00000", "#0000000", "#00000000", "rgba(0, 0, 0, 0)", "#G0FFFF", 
            "#FFG0FF", "#FFFFG0", "G0FFFF", "FFG0FF", "FFFFG0", "#GFF", "#FGF", "#FFG", "GFF", 
            "FGF", "FFG", "#g0ffff", "#ffg0ff", "#ffffg0", "g0ffff", "ffg0ff", "ffffg0", "#gff", 
            "#fgf", "#ffg", "gff", "fgf", "ffg", "invalid", "black", "white", "FFFFFF\nFFFFFF" ];

          for (var i = 0; i < invalidStrings.length; i++)
            expect(function() { new Color(invalidStrings[i]); }).toThrow("illegal_argument_exception");
        });
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

    describe("with a hash and capitalized six hexidecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex);
        return color;
      });
    });

    describe("with a hash and lowercased six hexidecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex.toLowerCase());
        return color;
      });
    });

    describe("with six capitalized hexidecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex.slice(1, 8));
        return color;
      });
    });

    describe("with six lowercased hexidecimal digits", function() {

      colorSharedSpecs(colors, colors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.hex.slice(1, 8).toLowerCase());
        return color;
      });
    });

    describe("with a hash and three capitalized hexidecimal digits", function() {

      colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) {
        var color = new Color(0, 0, 0);
        color.setHex(data.threeDigitHex);
        return color; 
      });
    });

    describe("with a hash and three lowercased hexidecimal digits", function() {

      colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.threeDigitHex.toLowerCase());
        return color;
      });
    });

    describe("with three capitalized hexidecimal digits", function() {

      colorSharedSpecs(threeDigitHexColors, threeDigitHexColors, function(data) { 
        var color = new Color(0, 0, 0);
        color.setHex(data.threeDigitHex.slice(1, 5));
        return color;
      });
    });

    describe("with three lowercased hexidecimal digits", function() {

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
      it("", function() {
        var objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];

        for (var i = 0; i < objects.length; i++) {
          var color = new Color(0, 0, 0);
          expect(function() { color.setHex(objects[i]); }).toThrow("illegal_argument_exception");
        }
      });
    });
  });



  describe("setRed() method", function() {

    /*
    WARNING: This spec caters to the implementation.  However, it significantly reduces code duplication.
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
    WARNING: This spec caters to the implementation.  However, it significantly reduces code duplication.
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
    WARNING: This spec caters to the implementation.  However, it significantly reduces code duplication.
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
});