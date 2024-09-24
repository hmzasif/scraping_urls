require 'test_helper'

class SourceUrlTest < ActiveSupport::TestCase
  def setup
    @source_url = SourceUrl.create!(url: 'http://example.com')
    @scraped_url1 = @source_url.scraped_urls.create!(url: 'http://example.com/link1')
    @scraped_url2 = @source_url.scraped_urls.create!(url: 'http://example.com/link2')
  end

  test 'should have many scraped_urls' do
    assert_equal 2, @source_url.scraped_urls.count
    assert_includes @source_url.scraped_urls, @scraped_url1
    assert_includes @source_url.scraped_urls, @scraped_url2
  end

  test 'should not be valid without a url' do
    source_url_without_url = SourceUrl.new(url: nil)
    assert_not source_url_without_url.valid?
    assert_includes source_url_without_url.errors[:url], "can't be blank"
  end

  test 'should validate uniqueness of url' do
    duplicate_source_url = SourceUrl.new(url: @source_url.url)
    assert_not duplicate_source_url.valid?
    assert_includes duplicate_source_url.errors[:url], 'has already been taken'
  end

  test 'should return correct scraped_urls' do
    scraped_urls = @source_url.scraped_urls
    assert_equal [@scraped_url1, @scraped_url2], scraped_urls.to_a
  end
end
