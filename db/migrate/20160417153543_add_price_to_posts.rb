class AddPriceToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :price, :integer
    add_column :posts, :discount_price, :integer
  end
end
