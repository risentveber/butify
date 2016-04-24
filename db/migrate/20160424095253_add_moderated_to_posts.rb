class AddModeratedToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :moderated, :boolean
  end
end
