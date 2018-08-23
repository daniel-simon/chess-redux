class Game < ApplicationRecord
  has_many :moves, dependent: :destroy

  def url
    "/#{self.uid}"
  end
end
