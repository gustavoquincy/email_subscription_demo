require 'sidekiq/web'

Rails.application.routes.draw do
  resources :projects do
    resources :tasks
  end
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end


  devise_for :users

  devise_scope :user do
    authenticated :user do
      root to: "projects#index"
    end
  end

  unauthenticated do
    root to: "home#index", as: :unauthenticated_root
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
