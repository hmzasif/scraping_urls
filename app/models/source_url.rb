class SourceUrl < ApplicationRecord
  has_many :scraped_urls
  validates_presence_of :url, format: { with: URI::DEFAULT_PARSER.make_regexp }
end
