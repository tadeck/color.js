#!/usr/bin/env ruby

# This is script which exports the color.js library to its various formats.  It adds a version 
# number to the generate files, which must be specified in the arguments.  It removes any 
# previously generated files.  It creates a normal version of the library and a minified and 
# gzipped version of the library.
# 
# This script may optionally be called with the --remove flag, which only removes the already 
# generated files.
#
# This scripts dependencies are:
# * uglify-js

require 'fileutils'

# get all of the files in the current directory
file_paths = Dir.glob(File.join(File.dirname(__FILE__), "*"))

# compute the used file paths
version_path = File.join(File.dirname(__FILE__), "version.txt")
color_path = File.join(File.dirname(__FILE__), "color.js")

# make sure the version.txt file exists
unless File.exist?(version_path)
	puts "A version.txt file must exist."
	exit(false)
end

# make sure the color.js file exists
unless File.exist?(color_path)
	puts "A color.js file must exist."
	exit(false)
end

# load the version number
version = nil
File.open(version_path) do |file|
	version = file.read.strip
end

# make sure the version has some contents
if (version.empty?)
	puts "A version number must be provided in version.txt."
	exit(false)
end

# check all of the files and delete them if they match the generated patterns	
file_paths.each do |file_path|
	if file_path =~ /color-.+\.js\z/ or file_path =~ /color-.+\.min\.js(?:\.gz)?\z/
		File.delete(file_path)
	end
end

# don't do anything else if the "--remove" flag was passed in
if ARGV.length == 1 and ARGV[0] == "--remove"
	exit(true)
end

# copy the color.js file
new_color_path = File.join(File.dirname(__FILE__), "color-#{version}.js")
new_color_compressed_path = File.join(File.dirname(__FILE__), "color-#{version}.min.js")

FileUtils.cp(color_path, new_color_path)
FileUtils.cp(color_path, new_color_compressed_path)

# uglify the compressed file
system("uglifyjs --overwrite #{new_color_compressed_path}")

# gzip the compressed file
system("gzip -c #{new_color_compressed_path} > #{new_color_compressed_path}.gz")