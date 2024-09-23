class ScrapingController < ApplicationController
  def index
  end

  def scrape
    if params[:url].present?
      scraper = ::LinkExtractorService.new(params[:url]).scrape_links
      if scraper.present?
        render json: { success: true, list: scraper }
      else
        render json: { success: false, message: "Error occurred while scraping the URL." }
      end
    else
      render json: { success: false, message: "URL not provided." }
    end
  end
end
