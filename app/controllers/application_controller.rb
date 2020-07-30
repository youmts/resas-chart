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
    json_body = JSON.parse(response.body)

    # NOTE: エラーの場合も200になるが、statucCodeが定義されている
    # TODO: 429(Too Many Requests)の場合にリトライ
    # SEE: https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
    if json_body['statusCode']
      raise StandardError.new, json_body
    end

    return json_body['result']
  end
end
