#!/usr/bin/env ruby

require 'faraday'
require 'nokogiri'
require 'uri'
require 'fileutils'

url = URI(ARGV[0])
path = url.path
url.path = ""

conn = Faraday.new(
  url: url.to_s,
  headers: {'User-Agent': 'Mozilla/5.0 (compatible;  MSIE 7.01; Windows NT 5.0)'},
)

resp = conn.get(path)
parsed_data = Nokogiri::HTML.parse(resp.body)

images = []
tags = parsed_data.css('.embed-responsive-item')
tags.each do |t|
  images << t.children[1].attributes["data-src"].value
end

dir = path.split("/")[-1]
FileUtils.mkdir_p dir

images.each do |image|
  # The site rejects faraday for image download for some reason.
  # Whatever, just going to hack it.
  name = image.split('/')[-1]
  full_path = File.join(dir, name)
  `curl -o #{full_path} #{image}`
end
