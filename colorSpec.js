require('./color.js');

describe("color", function() {

  console.log(Color);

  // a large array of pre-calculated test color properties
  var colors

  // an array of colors to be created by the spec for testing
  var newColors;

  beforeEach(function() {

    // the margin of error for tests
    var epsilon = 0.000001

    // add custom matchers
    this.addMatchers({
      toBeAlmostEqual: function(expected) {
        return Math.abs(this.actual - expected) <= epsilon;
      }
    });

    // set the test colors
    colors = [

      // full saturation, full brightness
      { r:255, g:  0, b:  0, h:  0, s:1.000000, v:1.000000, hex: "#FF0000" },
      { r:255, g:127, b:  0, h: 30, s:1.000000, v:1.000000, hex: "#FF7F00" },
      { r:255, g:255, b:  0, h: 60, s:1.000000, v:1.000000, hex: "#FFFF00" },
      { r:127, g:255, b:  0, h: 90, s:1.000000, v:1.000000, hex: "#7FFF00" },
      { r:  0, g:255, b:  0, h:120, s:1.000000, v:1.000000, hex: "#00FF00" },
      { r:  0, g:255, b:127, h:150, s:1.000000, v:1.000000, hex: "#00FF7F" },
      { r:  0, g:255, b:255, h:180, s:1.000000, v:1.000000, hex: "#00FFFF" },
      { r:  0, g:127, b:255, h:210, s:1.000000, v:1.000000, hex: "#007FFF" },
      { r:  0, g:  0, b:255, h:240, s:1.000000, v:1.000000, hex: "#0000FF" },
      { r:127, g:  0, b:255, h:270, s:1.000000, v:1.000000, hex: "#7F00FF" },
      { r:255, g:  0, b:255, h:300, s:1.000000, v:1.000000, hex: "#FF00FF" },
      { r:255, g:  0, b:127, h:330, s:1.000000, v:1.000000, hex: "#FF007F" },

      // full saturation, half brightness
      { r:127, g:  0, b:  0, h:  0, s:1.000000, v:0.498039, hex: "#7F0000" },
      { r:127, g: 63, b:  0, h: 30, s:1.000000, v:0.498039, hex: "#7F3F00" },
      { r:127, g:127, b:  0, h: 60, s:1.000000, v:0.498039, hex: "#7F7F00" },
      { r: 63, g:127, b:  0, h: 90, s:1.000000, v:0.498039, hex: "#3F7F00" },
      { r:  0, g:127, b:  0, h:120, s:1.000000, v:0.498039, hex: "#007F00" },
      { r:  0, g:127, b: 63, h:150, s:1.000000, v:0.498039, hex: "#007F3F" },
      { r:  0, g:127, b:127, h:180, s:1.000000, v:0.498039, hex: "#007F7F" },
      { r:  0, g: 63, b:127, h:210, s:1.000000, v:0.498039, hex: "#003F7F" },
      { r:  0, g:  0, b:127, h:240, s:1.000000, v:0.498039, hex: "#00007F" },
      { r: 63, g:  0, b:127, h:270, s:1.000000, v:0.498039, hex: "#3F007F" },
      { r:127, g:  0, b:127, h:300, s:1.000000, v:0.498039, hex: "#7F007F" },
      { r:127, g:  0, b: 63, h:330, s:1.000000, v:0.498039, hex: "#7F003F" },

      // full saturation, zero brightness
      { r:  0, g:  0, b:  0, h:  0, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 30, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 60, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 90, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:120, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:150, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:180, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:210, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:240, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:270, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:300, s:1.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:330, s:1.000000, v:0.000000, hex: "#000000" },

      // half saturation, full brightness
      { r:255, g:127, b:127, h:  0, s:0.498039, v:1.000000, hex: "#FF7F7F" },
      { r:255, g:191, b:127, h: 30, s:0.498039, v:1.000000, hex: "#FFBF7F" },
      { r:255, g:255, b:127, h: 60, s:0.498039, v:1.000000, hex: "#FFFF7F" },
      { r:191, g:255, b:127, h: 90, s:0.498039, v:1.000000, hex: "#BFFF7F" },
      { r:127, g:255, b:127, h:120, s:0.498039, v:1.000000, hex: "#7FFF7F" },
      { r:127, g:255, b:191, h:150, s:0.498039, v:1.000000, hex: "#7FFFBF" },
      { r:127, g:255, b:255, h:180, s:0.498039, v:1.000000, hex: "#7FFFFF" },
      { r:127, g:191, b:255, h:210, s:0.498039, v:1.000000, hex: "#7FBFFF" },
      { r:127, g:127, b:255, h:240, s:0.498039, v:1.000000, hex: "#7F7FFF" },
      { r:191, g:127, b:255, h:270, s:0.498039, v:1.000000, hex: "#BF7FFF" },
      { r:255, g:127, b:255, h:300, s:0.498039, v:1.000000, hex: "#FF7FFF" },
      { r:255, g:127, b:191, h:330, s:0.498039, v:1.000000, hex: "#FF7FBF" },

      // half saturation, half brightness
      { r:127, g: 63, b: 63, h:  0, s:0.498039, v:0.498039, hex: "#7F3F3F" },
      { r:127, g: 95, b: 63, h: 30, s:0.498039, v:0.498039, hex: "#7F5F3F" },
      { r:127, g:127, b: 63, h: 60, s:0.498039, v:0.498039, hex: "#7F7F3F" },
      { r: 95, g:127, b: 63, h: 90, s:0.498039, v:0.498039, hex: "#5F7F3F" },
      { r: 63, g:127, b: 63, h:120, s:0.498039, v:0.498039, hex: "#3F7F3F" },
      { r: 63, g:127, b: 95, h:150, s:0.498039, v:0.498039, hex: "#3F7F5F" },
      { r: 63, g:127, b:127, h:180, s:0.498039, v:0.498039, hex: "#3F7F7F" },
      { r: 63, g: 95, b:127, h:210, s:0.498039, v:0.498039, hex: "#3F5F7F" },
      { r: 63, g: 63, b:127, h:240, s:0.498039, v:0.498039, hex: "#3F3F7F" },
      { r: 95, g: 63, b:127, h:270, s:0.498039, v:0.498039, hex: "#5F3F7F" },
      { r:127, g: 63, b:127, h:300, s:0.498039, v:0.498039, hex: "#7F3F7F" },
      { r:127, g: 63, b: 95, h:330, s:0.498039, v:0.498039, hex: "#7F3F5F" },

      // half saturation, zero brightness
      { r:  0, g:  0, b:  0, h:  0, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 30, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 60, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 90, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:120, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:150, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:180, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:210, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:240, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:270, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:300, s:0.498039, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:330, s:0.498039, v:0.000000, hex: "#000000" },

      // zero saturation, full brightness
      { r:255, g:255, b:255, h:  0, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h: 30, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h: 60, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h: 90, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:120, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:150, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:180, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:210, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:240, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:270, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:300, s:1.000000, v:0.000000, hex: "#FFFFFF" },
      { r:255, g:255, b:255, h:330, s:1.000000, v:0.000000, hex: "#FFFFFF" },

      // zero saturation, half brightness
      { r:127, g:127, b:127, h:  0, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h: 30, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h: 60, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h: 90, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:120, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:150, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:180, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:210, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:240, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:270, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:300, s:0.000000, v:0.498039, hex: "#7F7F7F" },
      { r:127, g:127, b:127, h:330, s:0.000000, v:0.498039, hex: "#7F7F7F" },

      // zero saturation, zero brightness
      { r:  0, g:  0, b:  0, h:  0, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 30, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 60, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h: 90, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:120, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:150, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:180, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:210, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:240, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:270, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:300, s:0.000000, v:0.000000, hex: "#000000" },
      { r:  0, g:  0, b:  0, h:330, s:0.000000, v:0.000000, hex: "#000000" }
    ];
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
          expect(newColors[i].red()).toBeEqual(colors[i].r);
        }
      });

      it("should set the green component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].green()).toBeEqual(colors[i].g);
        }
      });

      it("should set the blue component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].blue()).toBeEqual(colors[i].b);
        }
      });

      it("should set the hue component", function() {
        for(var i = 0; i < colors.length; i++) {
          expect(newColors[i].hue()).toBeAlmostEqual(colors[i].h);
        }
      });

      it("should set the saturation component", function() {
          expect(newColors[i].saturation()).toBeAlmostEqual(colors[i].s);
      });

      it("should set the value component", function() {
          expect(newColors[i].value()).toBeAlmostEqual(colors[i].v);
      });

      it("should set the string component", function() {
          expect(newColors[i].toString()).toBeEqual(colors[i].hex);
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

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
             expect('pending').toEqual('completed'); 
        });
      });

      describe("and the red contains a decimal", function() {

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
             expect('pending').toEqual('completed'); 
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

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
             expect('pending').toEqual('completed'); 
        });
      });

      describe("and the green contains a decimal", function() {

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
             expect('pending').toEqual('completed'); 
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

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
             expect('pending').toEqual('completed'); 
        });
      });

      describe("and the blue contains a decimal", function() {

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
             expect('pending').toEqual('completed'); 
        });
      });

      describe("and the second argument is not a number", function() {
        it("should throw an exception", function() {
             expect('pending').toEqual('completed'); 
        });
      });

      describe("and the third argument is not a number", function() {
        it("should throw an exception", function() {
             expect('pending').toEqual('completed'); 
        });
      });
    });

    describe("when a Color is provided for the first argument", function() {

      it("should set the red component", function() {
           expect('pending').toEqual('completed');
      });
  
      it("should set the green component", function() {
           expect('pending').toEqual('completed');
      });
  
      it("should set the blue component", function() {
           expect('pending').toEqual('completed');
      });
  
      it("should set the hue component", function() {
           expect('pending').toEqual('completed');
      });
  
      it("should set the saturation component", function() {
           expect('pending').toEqual('completed');
      });
  
      it("should set the value component", function() {
           expect('pending').toEqual('completed'); 
      });

      it("should set the string component", function() {
           expect('pending').toEqual('completed'); 
      });
    });

    describe("when a string is provided for the first argument", function() {
      describe("with a hash and six hexidecimal digits", function() {

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
           expect('pending').toEqual('completed'); 
        });
      });

      describe("with six hexidecimal digits", function() {

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
           expect('pending').toEqual('completed'); 
        });
      });

      describe("with a hash and three hexidecimal digits", function() {

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
           expect('pending').toEqual('completed'); 
        });
      });

      describe("with three hexidecimal digits", function() {

        it("should set the red component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the green component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the blue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the hue component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the saturation component", function() {
             expect('pending').toEqual('completed');
        });
  
        it("should set the value component", function() {
             expect('pending').toEqual('completed'); 
        });

        it("should set the string component", function() {
             expect('pending').toEqual('completed'); 
        });
      });

      describe("and the string is in some other format", function() {

        var strings;

        beforeEach(function() {
          strings = ["0", "00", "0000", "00000", "0000000", "00000000", "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "rgba(0, 0, 0, 0)", "#G0FFFF", "#FFG0FF", "#FFFFG0", "G0FFFF", "FFG0FF", "FFFFG0", "#GFF", "#FGF", "#FFG", "GFF", "FGF", "FFG", "black", "white"];
        });

        it ("should throw an exception", function() {
          expect('pending').toEqual('completed');
        });
      });
    });

    describe("when some other kind of object is provided for the first argument", function()
    {
      var objects;

      beforeEach(function() {
        objects = [null, undefined, true, false, function() {}, [], [0, 0, 0], {}];
      });

      it("should throw an exception", function() {
             expect('pending').toEqual('completed'); 
      });
    });
  });
});