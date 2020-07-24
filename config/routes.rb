Rails.application.routes.draw do
  root to: 'home#index'

  namespace 'api' do
    namespace 'v1' do
      resources :prefectures, only: %i[index] do
        resources :population, only: %i[index]
      end
    end
  end
end
