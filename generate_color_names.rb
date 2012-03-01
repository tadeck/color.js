#!/usr/bin/env ruby

# A simple script used to generate the code for the color names.

colors = 
[
	["aliceBlue", [240, 248, 255]],
	["antiqueWhite", [250, 235, 215]],
	["aqua", [0, 255, 255]],
	["aquamarine", [127, 255, 212]],
	["azure", [240, 255, 255]],
	["beige", [245, 245, 220]],
	["bisque", [255, 228, 196]],
	["black", [0, 0, 0]],
	["blanchedAlmond", [255, 235, 205]],
	["blue", [0, 0, 255]],
	["blueViolet", [138, 43, 226]],
	["brown", [165, 42, 42]],
	["burlywood", [222, 184, 135]],
	["cadetBlue", [95, 158, 160]],
	["chartreuse", [127, 255, 0]],
	["chocolate", [210, 105, 30]],
	["coral", [255, 127, 80]],
	["cornflowerBlue", [100, 149, 237]],
	["cornsilk", [255, 248, 220]],
	["crimson", [220, 20, 60]],
	["cyan", [0, 255, 255]],
	["darkBlue", [0, 0, 139]],
	["darkCyan", [0, 139, 139]],
	["darkGoldenrod", [184, 134, 11]],
	["darkGray", [169, 169, 169]],
	["darkGreen", [0, 100, 0]],
	["darkGrey", [169, 169, 169]],
	["darkKhaki", [189, 183, 107]],
	["darkMagenta", [139, 0, 139]],
	["darkOliveGreen", [85, 107, 47]],
	["darkOrange", [255, 140, 0]],
	["darkOrchid", [153, 50, 204]],
	["darkRed", [139, 0, 0]],
	["darkSalmon", [233, 150, 122]],
	["darkSeaGreen", [143, 188, 143]],
	["darkSlateBlue", [72, 61, 139]],
	["darkSlateGray", [47, 79, 79]],
	["darkSlateGrey", [47, 79, 79]],
	["darkTurquoise", [0, 206, 209]],
	["darkViolet", [148, 0, 211]],
	["deepPink", [255, 20, 147]],
	["deepSkyBlue", [0, 191, 255]],
	["dimGray", [105, 105, 105]],
	["dimGrey", [105, 105, 105]],
	["dodgerBlue", [30, 144, 255]],
	["firebrick", [178, 34, 34]],
	["floralWhite", [255, 250, 240]],
	["forestGreen", [34, 139, 34]],
	["fuchsia", [255, 0, 255]],
	["gainsboro", [220, 220, 220]],
	["ghostWhite", [248, 248, 255]],
	["gold", [255, 215, 0]],
	["goldenrod", [218, 165, 32]],
	["gray", [128, 128, 128]],
	["green", [0, 128, 0]],
	["greenYellow", [173, 255, 47]],
	["grey", [128, 128, 128]],
	["honeydew", [240, 255, 240]],
	["hotpink", [255, 105, 180]],
	["indianRed", [205, 92, 92]],
	["indigo", [75, 0, 130]],
	["ivory", [255, 255, 240]],
	["khaki", [240, 230, 140]],
	["lavender", [230, 230, 250]],
	["lavenderBlush", [255, 240, 245]],
	["lawnGreen", [124, 252, 0]],
	["lemonChiffon", [255, 250, 205]],
	["lightBlue", [173, 216, 230]],
	["lightCoral", [240, 128, 128]],
	["lightCyan", [224, 255, 255]],
	["lightGoldenrodYellow", [250, 250, 210]],
	["lightGray", [211, 211, 211]],
	["lightGreen", [144, 238, 144]],
	["lightGrey", [211, 211, 211]],
	["lightPink", [255, 182, 193]],
	["lightSalmon", [255, 160, 122]],
	["lightSeaGreen", [32, 178, 170]],
	["lightSkyBlue", [135, 206, 250]],
	["lightSlateGray", [119, 136, 153]],
	["lightSlateGrey", [119, 136, 153]],
	["lightSteelBlue", [176, 196, 222]],
	["lightYellow", [255, 255, 224]],
	["lime", [0, 255, 0]],
	["limeGreen", [50, 205, 50]],
	["linen", [250, 240, 230]],
	["magenta", [255, 0, 255]],
	["maroon", [128, 0, 0]],
	["mediumAquamarine", [102, 205, 170]],
	["mediumBlue", [0, 0, 205]],
	["mediumOrchid", [186, 85, 211]],
	["mediumPurple", [147, 112, 219]],
	["mediumSeaGreen", [60, 179, 113]],
	["mediumSlateBlue", [123, 104, 238]],
	["mediumSpringGreen", [0, 250, 154]],
	["mediumTurquoise", [72, 209, 204]],
	["mediumVioletRed", [199, 21, 133]],
	["midnightBlue", [25, 25, 112]],
	["mintCream", [245, 255, 250]],
	["mistyRose", [255, 228, 225]],
	["moccasin", [255, 228, 181]],
	["navajoWhite", [255, 222, 173]],
	["navy", [0, 0, 128]],
	["oldLace", [253, 245, 230]],
	["olive", [128, 128, 0]],
	["oliveDrab", [107, 142, 35]],
	["orange", [255, 165, 0]],
	["orangeRed", [255, 69, 0]],
	["orchid", [218, 112, 214]],
	["paleGoldenrod", [238, 232, 170]],
	["paleGreen", [152, 251, 152]],
	["paleTurquoise", [175, 238, 238]],
	["paleVioletRed", [219, 112, 147]],
	["papayaWhip", [255, 239, 213]],
	["peachPuff", [255, 218, 185]],
	["peru", [205, 133, 63]],
	["pink", [255, 192, 203]],
	["plum", [221, 160, 221]],
	["powderBlue", [176, 224, 230]],
	["purple", [128, 0, 128]],
	["red", [255, 0, 0]],
	["rosyBrown", [188, 143, 143]],
	["royalBlue", [65, 105, 225]],
	["saddleBrown", [139, 69, 19]],
	["salmon", [250, 128, 114]],
	["sandyBrown", [244, 164, 96]],
	["seaGreen", [46, 139, 87]],
	["seashell", [255, 245, 238]],
	["sienna", [160, 82, 45]],
	["silver", [192, 192, 192]],
	["skyblue", [135, 206, 235]],
	["slateBlue", [106, 90, 205]],
	["slateGray", [112, 128, 144]],
	["slateGrey", [112, 128, 144]],
	["snow", [255, 250, 250]],
	["springGreen", [0, 255, 127]],
	["steelBlue", [70, 130, 180]],
	["tan", [210, 180, 140]],
	["teal", [0, 128, 128]],
	["thistle", [216, 191, 216]],
	["tomato", [255, 99, 71]],
	["turquoise", [64, 224, 208]],
	["violet", [238, 130, 238]],
	["wheat", [245, 222, 179]],
	["white", [255, 255, 255]],
	["whiteSmoke", [245, 245, 245]],
	["yellow", [255, 255, 0]],
	["yellowGreen", [154, 205, 50]]
]

# generate the color functions
colors.each do |color_data|
	name  = color_data[0]
	red   = color_data[1][0]
	green = color_data[1][1]
	blue  = color_data[1][2]

	# Convert the color name into a human-readable format for the comment.
	puts "/*"
	puts "Returns an instance of the color #{name.gsub(/(.)([A-Z])/,'\1 \2').downcase}."
	puts "*/"

	# Build the color function
	puts "Color.#{name} = function()"
	puts "{"
	puts "  return Color.rgb(#{red}, #{green}, #{blue});"
	puts "};"
	puts
end

# a prefix for every generated line, used to insert space before the generated code
prefix = "  "

# generate the test code
colors.each do |color_data|
	name  = color_data[0]
	red   = color_data[1][0]
	green = color_data[1][1]
	blue  = color_data[1][2]

	puts "#{prefix}describe(\"Color.#{name}() function\", function() {"
	puts "#{prefix}  it(\"should return a color with the correct red value\", function() {"
	puts "#{prefix}    expect(Color.#{name}().red()).toEqual(#{red});"
	puts "#{prefix}  });"
	puts "#{prefix}"
	puts "#{prefix}  it(\"should return a color with the correct green value\", function() {"
	puts "#{prefix}    expect(Color.#{name}().green()).toEqual(#{green});"
	puts "#{prefix}  });"
	puts "#{prefix}"
	puts "#{prefix}  it(\"should return a color with the correct blue value\", function() {"
	puts "#{prefix}    expect(Color.#{name}().blue()).toEqual(#{blue});"
	puts "#{prefix}  });"
	puts "#{prefix}});"
	puts
end