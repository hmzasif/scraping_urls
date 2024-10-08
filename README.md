# Link Scraper Web Application

To scrape URLs from web pages using a Rails backend, paired with a Vue.js single-page application.

---

## Overview

- This application allows users to input a URL and scrape all the URLs from the page. The scraped URLs are displayed in a table format, showing both the URL and its associated anchor text.
- Additionally, users can view previously scraped URLs from visited pages as shown in the screenshot below.


![Home Page Screenshot](public/home_page.png)

---

## System Dependencies
- **Ruby**: `3.1.4`
- **Rails**: `7.1.4`
- **Vue.js**: `3.3.13`
---

## Tech Stack
- **Backend**: Ruby on Rails
- **Frontend**: Vue.js
- **CSS Framework**: Tailwind CSS

---

## Setup with Docker

1. Inside the `scraping_urls` directory, run the following command in a terminal.

```bash
docker compose up --build
```

2. Open a browser and view the application at [localhost](http://localhost:3000). You should see a running application. In the terminal, press ctrl+c to stop the application.

---

## Manual Setup

1. Clone the project from GitHub:
```bash
git clone https://github.com/hmzasif/scraping_urls.git
```

2. Install dependencies using:
```bash
bundle
```

3. If you face further error, please run this command too:
```bash
yarn install
```

4. To setup the database, please run:
```bash
rails db:create db:migrate
```
5. To seed the development database, run:
```bash
rails db:seed
```

6. Copy .env.example to your .env file to set up the environment variables:
```bash
cp .env.example .env
```

7. Run the local server:
```bash
bin/dev
```

##  Models Relationships

> `SourceURL` can have many `ScrapedURLs`, forming a one-to-many relationship.
>
> `SourceUrl` store the URL of the page to be scraped with `url` field and `ScrapedUrl` store the URLs scraped from the page with `url` and `anchor_text` fields.


## Managing Secrets in Rails 7

In Rails 7, secrets are securely managed using the credentials file. Follow these steps to handle your application secrets:

1. **Generate a Secret Key:**
   Run the following command to create a new secret key:
```bash
rails secret
```
2. **Update credentials:** You can use any text editor of your choice to update the credentials file, such as `nano`, `vim`, or `code`. For example, with code, run the following command:
```bash
EDITOR=code rails credentials:edit --environment development
```

Inside the credentials file, add your secrets. Additionally, If you use password and username for pg, you can add them in the credentials file as shown below
```yaml
db:
   username: your_database_username
   password: your_database_password

```
## Testing Overview

This application includes MiniTest for unit testing models and functional testing for controllers, ensuring robust validation and expected behavior of the application's features.
## Deployment

The application is deployed on Heroku. You can access the live version [here](https://scraping-url-a54df9b3906f.herokuapp.com/).
