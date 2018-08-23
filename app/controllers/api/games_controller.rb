class Api::GamesController < ApplicationController

  def create
    @new_game = Game.create!(uid: SecureRandom.uuid)
  end

  def show
    @game = Game.find_by(uid: params[:uid])
  end

end
