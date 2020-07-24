# frozen_string_literal: true

module Api
  module V1
    class PrefecturesController < ApplicationController
      def index
        render json: request_resas('prefectures')
      end
    end
  end
end
