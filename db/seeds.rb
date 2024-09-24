source_url = SourceUrl.find_or_create_by(url: 'http://example.com')

if source_url.persisted?
  puts "SourceUrl found or created: #{source_url.url}"

  scraped_url = source_url.scraped_urls.create(
    url: 'https://www.iana.org/domains/example',
    anchor_text: 'More information...'
  )

  if scraped_url.persisted?
    puts "ScrapedUrl created: #{scraped_url.url} with anchor text: '#{scraped_url.anchor_text}'"
  else
    puts "Error creating ScrapedUrl: #{scraped_url.errors.full_messages.join(', ')}"
  end
else
  puts "Error creating SourceUrl: #{source_url.errors.full_messages.join(', ')}"
end
