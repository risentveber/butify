class AddLinkToPost < ActiveRecord::Migration
  def change
    add_column :posts, :sitelink, :string
  end
end
