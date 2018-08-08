source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end
# for ActionCable in production
gem 'redis', '~> 3.3.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.6'
gem 'rails_select_on_includes', '~> 5.1.5.1'
# Authentication
gem 'devise'
# Required for devise
gem 'rake'
# Administration
gem 'rails_admin', '~> 1.2'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Database
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Sidekiq is required for our job cancelling
gem 'sidekiq'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.1'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development do
  # Annotates Rails/ActiveRecord models, routes, fixtures, and others based on the database schema.
  gem 'annotate', '~> 2.7.2'

  # When mail is sent from your application, Letter Opener will open a preview in the browser instead of sending.
  gem 'letter_opener', '~> 1.6'

  # The Listen gem listens to file modifications and notifies you about the changes. Works everywhere!
  gem 'listen', '>= 3.0.5', '< 3.2'

  # Preloads your application so things like console, rake and tests run faster.
  gem 'spring'

  # Makes spring watch files using the listen gem.
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13.0'
  gem 'capybara-selenium'
  gem 'rspec-rails', '~> 3.7'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'pry'
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
