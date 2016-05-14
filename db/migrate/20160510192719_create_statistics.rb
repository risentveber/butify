class CreateStatistics < ActiveRecord::Migration
  def change
    create_table :statistics do |t|
      t.belongs_to :user, index: true
      t.integer :type

      t.timestamps null: false
    end
  end
end
