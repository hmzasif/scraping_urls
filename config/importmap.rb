# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
vue_js_src =
  if Rails.env.production?
    'https://ga.jspm.io/npm:vue@3.3.13/dist/vue.esm-browser.prod.js'
  else
    'https://ga.jspm.io/npm:vue@3.3.13/dist/vue.esm-browser.js'
  end

pin 'vue', to: vue_js_src
pin "redaxios", to: "https://ga.jspm.io/npm:redaxios@0.5.1/dist/redaxios.module.js"
