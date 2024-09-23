Rails.application.routes.draw do
  root 'scraping#index'

  post 'scrape' => 'scraping#scrape'
end
