class ScrapingController < ApplicationController
  def index; end

  def scrape
    if params[:url].present?
      scraper = ::LinkExtractorService.new(params[:url]).scrape_links
      if scraper.present?
        render json: { success: true, list: scraper }
      end
    else
      render json: { success: false, error: "URL is missing" }, status: :bad_request
    end
  end

  def visited_url
    source_url = SourceUrl.all

    render json: { success: true, list: source_url }
  end

  def scraped_urls
    decoded_url = URI.decode_www_form_component(params[:url])
    source_url = SourceUrl.find_by(url: decoded_url)

    if source_url.present?
      render json: { success: true, list: source_url.scraped_urls }
    else
      render json: { success: false, error: "URL not found." }
    end
  end

  def check_url_exists
    source_url = SourceUrl.find_by(url: params[:url])

    if source_url
      render json: { exists: true, message: "This URL has already been scraped. Please check with Visited URLs" }
    else
      render json: { exists: false }
    end
  end

end
