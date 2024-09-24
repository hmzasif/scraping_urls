class LinkExtractorService
  def initialize(url)
    @url = url
  end

  def scrape_links
    html = URI.open(@url)
    doc = Nokogiri::HTML(html)
    extract_links = []

    base_uri = URI.parse(@url)
    source_url = SourceUrl.find_or_create_by(url: @url)

    doc.css('a').each do |link_tag| link = link_tag['href']
    next if link.nil? || link.start_with?('#', 'mailto:')

    full_url = URI.join(base_uri, link).to_s
    anchor_text = link_tag.text.strip
    extract_links << { url: full_url, anchor_text: anchor_text }
    end

    source_url.scraped_urls.create(extract_links)

    extract_links
  end
end
