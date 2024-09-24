class SourceUrl < ApplicationRecord
  has_many :scraped_urls, dependent: :destroy
  validates_presence_of :url, format: { with: URI::DEFAULT_PARSER.make_regexp }
  validates_uniqueness_of :url
end
