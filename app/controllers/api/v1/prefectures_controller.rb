# frozen_string_literal: true

class Api::V1::PrefecturesController < ApplicationController
  def index
    render json: request_resas('prefectures')
  end
end
