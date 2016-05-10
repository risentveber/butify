class Statistic < ActiveRecord::Base
  self.inheritance_column = false
  enum type: {profile_show: 0, vk_click: 1, instagram_click: 2, facebook_click: 3}

  scope :day, -> { where('statistics.created_at >= ?', 1.days.ago)}
  scope :week, -> { where('statistics.created_at >= ?', 7.days.ago)}
  scope :month, -> { where('statistics.created_at >= ?', 30.days.ago)}
end
