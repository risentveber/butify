class AddPhoneAndFacebookToUser < ActiveRecord::Migration
  def change
    add_column :users, :phone, :string
    add_column :users, :facebook_id, :string
  end
end
