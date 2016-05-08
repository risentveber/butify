require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Studpad
  class Application < Rails::Application

  config.generators do |g|
    g.test_framework  nil
    g.assets false
    g.helper false
  end
  #config.browserify_rails.commandline_options = "-t reactify --extension=\".js.jsx\""
  #LOCALIZATION
  config.i18n.default_locale = :ru
  config.time_zone = 'Europe/Moscow'
  config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.yml')]
  #EMAILING

  config.action_mailer.delivery_method = :mailgun
  config.action_mailer.mailgun_settings = {
          api_key: Rails.application.secrets.api_key,
          domain: Rails.application.secrets.domain
  }

  config.active_record.raise_in_transactional_callbacks = true
  end
end
