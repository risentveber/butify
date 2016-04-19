class RemovePostTypeFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :post_type
  end
end
