class CreateDesiresPostsTable < ActiveRecord::Migration
  def change
    create_table :desires_posts do |t|
    	t.timestamps
    	t.belongs_to :post, index: true
    	t.belongs_to :desire, index: true
    end
  end
end
