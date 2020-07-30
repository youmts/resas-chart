class Api::V1::PopulationsController < ApplicationController
  def index
    result = request_resas('population/composition/perYear', params: { prefCode: params[:prefecture_id], cityCode: '-' })
    total_population = result['data'][0]

    raise "invalid data label(#{total_population['label']})" if total_population['label'] != '総人口'

    render json: total_population['data']
  end
end
