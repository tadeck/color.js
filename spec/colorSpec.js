describe("color", function() {

  // a large array of pre-calculated test color properties
	var colors;

	beforeEach(function() {

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
      { r:127, g: 63, b: 95, h:330, s:0.498039, v:0.498039, hex: "#7F3F5F" },/

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
      { r:  0, g:  0, b:  0, h:330, s:0.000000, v:0.000000, hex: "#000000" },
    ];
	});

	describe("constructor", function() {

		var huelessColor0, huelessColor1, huelessColor2, huelessColor3, huelessColor4;

		describe("when three integers are provided", function() {

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
		});

		describe("when a Color is provided", function() {

		});

		describe("when a hex value is provided", function() {
			describe("with six digits and a hash", function() {

			});

			describe("with six digits", function() {

			});

			describe("with three digits and a hash", function() {

			});

			describe("with three digits", function() {

			});
		});
	});
});