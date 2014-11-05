class WinesController < ApplicationController

  def index

  end

  def wines
    render json: Wine.all.to_json
  end

end
