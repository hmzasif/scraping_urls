class ScrapingController < ApplicationController
  def index
  end

  def scrape
    if params[:url].present?
      scraper = ::LinkExtractorService.new(params[:url]).scrape_links
      if scraper.present?
        render json: { success: true, list: scraper }
      end
    end
  end
end
