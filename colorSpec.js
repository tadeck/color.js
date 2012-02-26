eval(require('fs').readFileSync('./color.js','utf-8'));

describe("Color", function() {

  // a large array of pre-calculated test color properties
  var colors;

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

    // set up the test colors
    colors = JSON.parse(require('fs').readFileSync('./colorSpecColors.json','utf-8')).colors;
  });

  describe("constructor", function() {

    describe("when three numbers are provided for the arguments", function() {

      beforeEach(function() {
        newColors = [];

        for(var i = 0; i < colors.length; i++) {
          newColors[i] = new Color(colors[i].r, colors[i].g, colors[i].b);
        }
      });

      it("should set the red component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].red()).toEqual(colors[i].r);
        }
      });

      it("should set the green component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].green()).toEqual(colors[i].g);
        }
      });

      it("should set the blue component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].blue()).toEqual(colors[i].b);
        }
      });

      it("should set the hue component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
        }
      });

      it("should set the saturation component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
        }
      });

      it("should set the value component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].value()).toAlmostEqual(colors[i].v);
        }
      });

      it("should set the string component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].toString()).toEqual(colors[i].hex);
        }
      });

      describe("and the red is below 0", function() {

        var color;

        beforeEach(function() {
          color = new Color(-127, 255, 255);
        });

        it("should set the red component", function() {
             expect(color.red()).toEqual(0);
        });
  
        it("should set the green component", function() {
             expect(color.green()).toEqual(255);
        });
  
        it("should set the blue component", function() {
             expect(color.blue()).toEqual(255);
        });
  
        it("should set the hue component", function() {
             expect(color.hue()).toEqual(180);
        });
  
        it("should set the saturation component", function() {
             expect(color.saturation()).toEqual(100);
        });
  
        it("should set the value component", function() {
             expect(color.value()).toEqual(100); 
        });

        it("should set the string component", function() {
             expect(color.hex()).toEqual("#00FFFF"); 
        });
      });

      describe("and the red is above 255", function() {

        var color;

        beforeEach(function() {
          color = new Color(383, 255, 255);
        });

        it("should set the red component", function() {
             expect(color.red()).toEqual(255);
        });
  
        it("should set the green component", function() {
             expect(color.green()).toEqual(255);
        });
  
        it("should set the blue component", function() {
             expect(color.blue()).toEqual(255);
        });
  
        it("should set the hue component", function() {
             expect(color.hue()).toEqual(0);
        });
  
        it("should set the saturation component", function() {
             expect(color.saturation()).toEqual(0);
        });
  
        it("should set the value component", function() {
             expect(color.value()).toEqual(100); 
        });

        it("should set the string component", function() {
             expect(color.hex()).toEqual("#FFFFFF"); 
        });
      });

      describe("and the red contains a decimal", function() {

        beforeEach(function() {
          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].r + 0.75, colors[i].g, colors[i].b);
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("and the green is below 0", function() {

        var color;

        beforeEach(function() {
          color = new Color(255, -127, 255);
        });

        it("should set the red component", function() {
             expect(color.red()).toEqual(255);
        });
  
        it("should set the green component", function() {
             expect(color.green()).toEqual(0);
        });
  
        it("should set the blue component", function() {
             expect(color.blue()).toEqual(255);
        });
  
        it("should set the hue component", function() {
             expect(color.hue()).toEqual(300);
        });
  
        it("should set the saturation component", function() {
             expect(color.saturation()).toEqual(100);
        });
  
        it("should set the value component", function() {
             expect(color.value()).toEqual(100); 
        });

        it("should set the string component", function() {
             expect(color.hex()).toEqual("#FF00FF"); 
        });
      });

      describe("and the green is above 255", function() {

        var color;

        beforeEach(function() {
          color = new Color(255, 383, 255);
        });

        it("should set the red component", function() {
             expect(color.red()).toEqual(255);
        });
  
        it("should set the green component", function() {
             expect(color.green()).toEqual(255);
        });
  
        it("should set the blue component", function() {
             expect(color.blue()).toEqual(255);
        });
  
        it("should set the hue component", function() {
             expect(color.hue()).toEqual(0);
        });
  
        it("should set the saturation component", function() {
             expect(color.saturation()).toEqual(0);
        });
  
        it("should set the value component", function() {
             expect(color.value()).toEqual(100); 
        });

        it("should set the string component", function() {
             expect(color.hex()).toEqual("#FFFFFF"); 
        });
      });

      describe("and the green contains a decimal", function() {

        beforeEach(function() {
          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].r, colors[i].g + 0.75, colors[i].b);
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("and the blue is below 0", function() {

        var color;

        beforeEach(function() {
          color = new Color(255, 255, -127);
        });

        it("should set the red component", function() {
             expect(color.red()).toEqual(255);
        });
  
        it("should set the green component", function() {
             expect(color.green()).toEqual(255);
        });
  
        it("should set the blue component", function() {
             expect(color.blue()).toEqual(0);
        });
  
        it("should set the hue component", function() {
             expect(color.hue()).toEqual(60);
        });
  
        it("should set the saturation component", function() {
             expect(color.saturation()).toEqual(100);
        });
  
        it("should set the value component", function() {
             expect(color.value()).toEqual(100); 
        });

        it("should set the string component", function() {
             expect(color.hex()).toEqual("#FFFF00"); 
        });
      });

      describe("and the blue is above 255", function() {

        var color;

        beforeEach(function() {
          color = new Color(255, 255, 383);
        });

        it("should set the red component", function() {
             expect(color.red()).toEqual(255);
        });
  
        it("should set the green component", function() {
             expect(color.green()).toEqual(255);
        });
  
        it("should set the blue component", function() {
             expect(color.blue()).toEqual(255);
        });
  
        it("should set the hue component", function() {
             expect(color.hue()).toEqual(0);
        });
  
        it("should set the saturation component", function() {
             expect(color.saturation()).toEqual(0);
        });
  
        it("should set the value component", function() {
             expect(color.value()).toEqual(100); 
        });

        it("should set the string component", function() {
             expect(color.hex()).toEqual("#FFFFFF"); 
        });
      });

      describe("and the blue contains a decimal", function() {

        beforeEach(function() {
          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].r, colors[i].g, colors[i].b + 0.75);
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("and the second argument is not a number", function() {
        it("should throw an exception", function() {
          expect(function() { new Color(0, "testing", 0); }).toThrow("illegal_argument_exception");
        });
      });

      describe("and the third argument is not a number", function() {
        it("should throw an exception", function() {
          expect(function() { new Color(0, 0, "testing"); }).toThrow("illegal_argument_exception");
        });
      });
    });

    describe("when a Color is provided for the first argument", function() {

      beforeEach(function() {
        newColors = [];

        for(var i = 0; i < colors.length; i++) {
          var color = new Color(colors[i].r, colors[i].g, colors[i].b);
          newColors[i] = new Color(color);
        }
      });

      it("should set the red component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].red()).toEqual(colors[i].r);
        }
      });

      it("should set the green component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].green()).toEqual(colors[i].g);
        }
      });

      it("should set the blue component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].blue()).toEqual(colors[i].b);
        }
      });

      it("should set the hue component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
        }
      });

      it("should set the saturation component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
        }
      });

      it("should set the value component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].value()).toAlmostEqual(colors[i].v);
        }
      });

      it("should set the string component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].toString()).toEqual(colors[i].hex);
        }
      });
    });

    describe("when a string is provided for the first argument", function() {
      describe("with a hash and capitalized six hexidecimal digits", function() {

        beforeEach(function() {
          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].hex);
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("with a hash and lowercased six hexidecimal digits", function() {

        beforeEach(function() {
          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].hex.toLowerCase());
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("with six capitalized hexidecimal digits", function() {

        beforeEach(function() {
          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].hex.slice(1, 8));
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("with six lowercased hexidecimal digits", function() {

        beforeEach(function() {
          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].hex.slice(1, 8).toLowerCase());
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("with a hash and three capitalized hexidecimal digits", function() {

        beforeEach(function() {
          // set up the test colors
          colors = JSON.parse(require('fs').readFileSync('./colorSpecColors.json','utf-8')).threeDigitHexColors;

          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].threeDigitHex);
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("with a hash and three lowercased hexidecimal digits", function() {

        beforeEach(function() {
          // set up the test colors
          colors = JSON.parse(require('fs').readFileSync('./colorSpecColors.json','utf-8')).threeDigitHexColors;

          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].threeDigitHex.toLowerCase());
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("with three lowercased hexidecimal digits", function() {

        beforeEach(function() {
          // set up the test colors
          colors = JSON.parse(require('fs').readFileSync('./colorSpecColors.json','utf-8')).threeDigitHexColors;

          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].threeDigitHex.slice(1, 5).toLowerCase());
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
        });
      });

      describe("with three capitalized hexidecimal digits", function() {

        beforeEach(function() {
          // set up the test colors
          colors = JSON.parse(require('fs').readFileSync('./colorSpecColors.json','utf-8')).threeDigitHexColors;

          newColors = [];

          for(var i = 0; i < colors.length; i++) {
            newColors[i] = new Color(colors[i].threeDigitHex.slice(1, 5));
          }
        });

        it("should set the red component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].red()).toEqual(colors[i].r);
          }
        });

        it("should set the green component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].green()).toEqual(colors[i].g);
          }
        });

        it("should set the blue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].blue()).toEqual(colors[i].b);
          }
        });

        it("should set the hue component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].hue()).toAlmostEqual(colors[i].h);
          }
        });

        it("should set the saturation component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].saturation()).toAlmostEqual(colors[i].s);
          }
        });

        it("should set the value component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].value()).toAlmostEqual(colors[i].v);
          }
        });

        it("should set the string component", function() {
          for(var i = 0; i < colors.length; i++) {
            expect(newColors[i].toString()).toEqual(colors[i].hex);
          }
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
});