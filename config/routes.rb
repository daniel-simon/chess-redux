Rails.application.routes.draw do
  ###########
  # API CALLS
  ###########

  # Devise / Authentication
  devise_scope :user do
    post '/sessions/sign_up_or_in', to: 'users/sessions#sign_up_or_in'
    post '/sessions/sign_up', to: 'users/sessions#sign_up'
    post '/sessions/sign_in', to: 'users/sessions#sign_in'
    delete '/sessions/destroy', to: 'users/sessions#destroy'
  end

  ##################
  # NON-REACT ROUTES
  ##################

  # Rails admin engine
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  ###################
  # REACT ENTRY POINT
  ###################
  get '/*path', to: 'root#home'
  root :to => "root#home"
end
