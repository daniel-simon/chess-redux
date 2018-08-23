class CreateMoves < ActiveRecord::Migration[5.1]
  def change
    create_table :moves do |t|
      t.belongs_to :game
      t.integer :turn_number, null: false

      t.string :piece_type, null: false
      t.string :piece_color, null: false

      t.integer :from_col, null: false
      t.integer :from_row, null: false
      t.integer :to_col, null: false
      t.integer :to_row, null: false

      t.string :captured_piece_type
      t.boolean :is_castle, default: false
      t.boolean :is_en_passant, default: false

      t.timestamps
    end
  end
end
