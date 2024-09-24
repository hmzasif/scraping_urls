require 'test_helper'

class ScrapingControllerTest < ActionDispatch::IntegrationTest

  test 'should get root' do
    get root_url
    assert_response :success
  end

  test 'should scrape links when URL is provided' do
    valid_url = 'http://example.com'
    post scrape_url, params: { url: valid_url }

    assert_response :success
    response_body = JSON.parse(response.body)

    assert response_body['success']
    assert_equal 1, response_body['list'].count
  end

  test 'should not scrape when URL is missing' do
    post scrape_url, params: { url: '' }

    assert_response :bad_request
    response_body = JSON.parse(response.body)

    assert_not response_body['success']
    assert_equal 'URL is missing', response_body['error']
  end


  test 'should get all visited URLs' do
    SourceUrl.destroy_all

    SourceUrl.create!(url: 'http://example.com')

    get visited_url_url
    assert_response :success

    response_body = JSON.parse(response.body)

    assert response_body['success']
    assert_equal 1, response_body['list'].count
  end


  test 'should return scraped URLs for a valid source URL' do
    source_url = SourceUrl.create!(url: 'http://example.com')
    ScrapedUrl.create!(url: 'http://example.com/page1', source_url: source_url)

    get scraped_urls_url, params: { url: URI.encode_www_form_component(source_url.url) }
    assert_response :success
    response_body = JSON.parse(response.body)

    assert response_body['success']
    assert_equal 1, response_body['list'].count
  end

  test 'should return error for non-existent source URL' do
    get scraped_urls_url, params: { url: URI.encode_www_form_component('http://nonexistent.com') }
    assert_response :success
    response_body = JSON.parse(response.body)

    assert_not response_body['success']
    assert_equal 'URL not found.', response_body['error']
  end

  test 'should confirm URL exists when already scraped' do
    source_url = SourceUrl.create!(url: 'http://example.com')

    get check_url_exists_url, params: { url: source_url.url }
    assert_response :success
    response_body = JSON.parse(response.body)

    assert response_body['exists']
    assert_equal 'This URL has already been scraped. Please check with Visited URLs', response_body['message']
  end

  test 'should confirm URL does not exist when not scraped' do
    get check_url_exists_url, params: { url: 'http://nonexistent.com' }
    assert_response :success
    response_body = JSON.parse(response.body)

    assert_not response_body['exists']
  end
end
