class CreateSourceUrls < ActiveRecord::Migration[7.1]
  def change
    create_table :source_urls do |t|
      t.string :url

      t.timestamps
    end
  end
end
