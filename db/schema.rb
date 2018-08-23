# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180822021726) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.string "uid", null: false
    t.string "white_name", default: "White", null: false
    t.string "black_name", default: "Black", null: false
    t.integer "white_score", default: 0, null: false
    t.integer "black_score", default: 0, null: false
    t.string "to_play", default: "white", null: false
    t.integer "turn_count", default: 0, null: false
    t.datetime "started_at"
    t.datetime "ended_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "moves", force: :cascade do |t|
    t.bigint "game_id"
    t.integer "turn_number", null: false
    t.string "piece_type", null: false
    t.string "piece_color", null: false
    t.integer "from_col", null: false
    t.integer "from_row", null: false
    t.integer "to_col", null: false
    t.integer "to_row", null: false
    t.string "captured_piece_type"
    t.boolean "is_castle", default: false
    t.boolean "is_en_passant", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_moves_on_game_id"
  end

end
