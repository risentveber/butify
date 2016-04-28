class CreateDesires < ActiveRecord::Migration
  def change
    create_table :desires do |t|
      t.string :title, null: false
      t.text :text
      t.boolean :completed, default: false
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_column :photos, :photable_id, :integer
    add_column :photos, :photable_type, :string
  end

  def data
  	Photo.find_each do |p|
  		p.update_attributes(photable_id: p.post_id, photable_type: "Post")
  	end
  end
end
