class CreateScrapedUrls < ActiveRecord::Migration[7.1]
  def change
    create_table :scraped_urls do |t|
      t.references :source_url, null: false, foreign_key: true
      t.string :url
      t.string :anchor_text

      t.timestamps
    end
  end
end
