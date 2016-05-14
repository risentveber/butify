class AddViewCounterToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :view_counter, :integer, default: 0
  end
end
