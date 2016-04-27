class Desire < ActiveRecord::Base
  belongs_to :user
  has_many :photos, dependent: :destroy, as: :photable
end
