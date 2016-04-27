class Post < ActiveRecord::Base
  attr_accessor :published_time, :published_date

  after_update :recommended_notification
  before_update :set_published_at

  acts_as_votable
  belongs_to :user
  belongs_to :category
  belongs_to :city

  has_many :photos, dependent: :destroy, as: :photable
  has_many :comments, as: :commentable, inverse_of: :commentable, dependent: :destroy
  has_many :attachments, as: :attachable, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :text_elements, -> { order(:position) }, dependent: :destroy
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :categories

  scope :recommended, -> { where(recommended: true) }
  scope :moderated, -> { where(moderated: true) }
  scope :visible, -> { where(visible: true) }
  scope :time_order, -> { order(created_at: :desc) }
  scope :published, -> {where('posts.published_at IS NULL OR post.published_at > (?)', Time.now)}
  scope :default, -> {time_order.moderated.published}

  delegate :name, to: :city, allow_nil: true, prefix: true

  serialize :linkdata

  def self.listed(group, user=nil)
    if group
      group.posts.order(created_at: :desc)
    else
      user.posts.order(created_at: :desc)
    end
  end

  def user
    User.unscoped { super }
  end


  def recommended_notification
    notifications.post_recommendation.create(user_id: user_id) if self.recommended_changed? && self.recommended
  end

  def set_published_at
    if published_time && published_date
      self.published_at = DateTime.strptime("#{published_date} #{published_time} +03", '%d.%m.%Y %H:%M %z')
    end
  end

  def city_id= (id)
    self[:city_id] = id.present? ? City.load_external_data(id).id : nil
  end

  def bind_tags(tag_names)
    tag_names ||= []
    tags_found = Tag.where(name: tag_names)
    tags_not_found = tag_names - tags_found.map(&:name)
    ids = tags_found.map(&:id)

    tags_not_found.each do |t_name|
      ids << Tag.find_or_create_by(name: t_name).id
    end

    self.tag_ids = ids
  end

  def self.for_user(user)
    if user
      where(user_id: [user.id] + user.all_follows.map(&:followable_id)).order(created_at: :desc)
    else
      all.order(created_at: :desc)
    end
  end

  #for admin edit
  def link_description
    linkdata[:description]
  end
  def link_description=(v)
    linkdata[:description] = v
  end
  def link_title
    linkdata[:title]
  end
  def link_title=(v)
    linkdata[:title] = v
  end
end
