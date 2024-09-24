require 'test_helper'

class ScrapedUrlTest < ActiveSupport::TestCase
  def setup
    @source_url = SourceUrl.create!(url: 'http://example.com')
    @scraped_url = @source_url.scraped_urls.create!(url: 'http://example.com/link1')
  end

  test 'should belong to source_url' do
    assert_equal @source_url, @scraped_url.source_url
  end

  test 'should have url and anchor_text attributes' do
    assert_equal 'http://example.com/link1', @scraped_url.url
    assert_nil @scraped_url.anchor_text
  end

  test 'should save with valid attributes' do
    assert @scraped_url.valid?
    assert_difference('ScrapedUrl.count', 1) do
      @source_url.scraped_urls.create!(url: 'http://example.com/link2')
    end
  end
end
