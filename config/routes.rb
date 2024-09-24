Rails.application.routes.draw do
  root 'scraping#index'

  post 'scrape' => 'scraping#scrape'
  get 'visited_url' => 'scraping#visited_url'
  get "scraped_urls" => "scraping#scraped_urls"
  get 'check_url_exists', to: 'scraping#check_url_exists'
end
