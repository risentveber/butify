class User < ActiveRecord::Base
  self.inheritance_column = false

  include DestroyedAt
  authenticates_with_sorcery!
  acts_as_voter
  acts_as_followable
  acts_as_follower

  before_validation :remove_whitespaces
  before_validation :parse_social

  has_many :notifications
  has_many :posts
  has_many :comments
  has_many :feedbacks
  has_many :desires, dependent: :destroy
  has_one  :basket
  has_many :statistics, dependent: :destroy
  belongs_to :city

  scope :recommended, -> { where(recommended: true) }
  scope :random_order, -> { order('RANDOM()') }
  scope :having_posts, -> {
    where('users.id IN (SELECT DISTINCT posts.user_id FROM posts)')
  }

  delegate :name, to: :city, allow_nil: true, prefix: true

  validates :password,
    length:       {message: 'Не менее 5 символов', minimum: 5},
    presence:     {message: 'Не может быть пустым'},
    confirmation: {message: 'Пароли не совпадают'},
    on:           :create
  validates :email, uniqueness: {message: 'Такой email уже занят'}, presence: true
  validates :name, presence: true
  validates :terms_of_service, acceptance: true, on: :create

  mount_uploader :avatar, AvatarUploader

  def get_basket
    if basket
      basket
    else
      create_basket!
    end
  end

  after_update :recommended_notification

  def recommended_notification
    notifications.recommendation.create if self.recommended_changed? && self.recommended
  end

  def recommended_users
    User.none
  end

  def self.recommended_for(user)
    if user
      where.not(id: [user.id] + user.all_follows.map(&:followable_id))
        .recommended.random_order.limit(3)
    else
      recommended.limit(3)
    end
  end

  def site_url
    if self.school.to_s.starts_with? 'http'
      self.school
    else
      "//" + self.school.to_s
    end
  end

  def city_id= (id)
    self[:city_id] = id.present? ? City.load_external_data(id).id : nil
  end

  private
    def parse_social
      if vk_id
        vk_id.gsub!('https://www.vk.com/', '')
        vk_id.gsub!('http://www.vk.com/', '')
        vk_id.gsub!('www.vk.com/', '')
        vk_id.gsub!('https://vk.com/', '')
        vk_id.gsub!('http://vk.com/', '')
        vk_id.gsub!('vk.com/', '')
        vk_id.gsub!('@', '')
      end
      if facebook_id
        facebook_id.gsub!('https://www.facebook.com/', '')
        facebook_id.gsub!('www.facebook.com/', '')
        facebook_id.gsub!('https://facebook.com/', '')
        facebook_id.gsub!('facebook.com/', '')
        facebook_id.gsub!('@', '')
      end
      if instagram_id
        instagram_id.gsub!('https://www.instagram.com/', '')
        instagram_id.gsub!('www.instagram.com/', '')
        instagram_id.gsub!('https://instagram.com/', '')
        instagram_id.gsub!('instagram.com/', '')
        instagram_id.gsub!('@', '')
      end
    end

    def remove_whitespaces
      self.email = email.to_s.squish
      self.type = 'teacher'
    end

end
