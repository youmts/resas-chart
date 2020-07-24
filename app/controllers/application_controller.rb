class ApplicationController < ActionController::Base
  def request_resas(path, params: nil)
    conn = Faraday.new(
      url: 'https://opendata.resas-portal.go.jp/api/v1',
      headers: { 'X-API-KEY': ENV['RESAS_API_KEY'] }
    ) do |builder|
      # TODO: キャッシュ使う
      # builder.use Faraday::HttpCache, store: Rails.cache, logger: Rails.logger 
      # builder.adapter Faraday.default_adapter
      builder.response :logger, nil, { headers: false }
    end

    response = conn.get(path, params)

    return JSON.parse(response.body)['result']
  end
end
