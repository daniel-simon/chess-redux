class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :uid, null: false
      t.string :white_name, null: false, default: "White"
      t.string :black_name, null: false, default: "Black"
      t.integer :white_score, null: false, default: 0
      t.integer :black_score, null: false, default: 0
      t.string :to_play, null: false, default: "white"
      t.integer :turn_count, null: false, default: 0

      t.datetime :started_at
      t.datetime :ended_at
      t.timestamps
    end
  end
end
