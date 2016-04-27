class CreateDesires < ActiveRecord::Migration
  def change
    create_table :desires do |t|
      t.string :title, null: false
      t.text :text
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
