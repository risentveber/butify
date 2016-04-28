class Desire < ActiveRecord::Base
  belongs_to :user
  has_many :photos, dependent: :destroy, as: :photable
  has_and_belongs_to_many :posts   #генерирует post_ids, posts
end
