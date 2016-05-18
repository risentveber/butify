class Post < ActiveRecord::Base
  after_update :recommended_notification

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
  has_and_belongs_to_many :desires

  scope :recommended, -> { where(recommended: true) }
  scope :moderated, -> (user_id) { where('posts.moderated = true OR posts.user_id = (?)', user_id) }
  scope :visible, -> { where(visible: true) }
  scope :time_order, -> { order( 'CASE WHEN posts.published_at IS NULL THEN posts.created_at else published_at END DESC') }
  scope :published, -> {where('posts.published_at IS NULL OR posts.published_at < (?)', Time.now)}
  scope :default, -> (user_id) {time_order.moderated(user_id).published}


  scope :profile_grid, -> (user) { user.posts.order(created_at: :desc).published}
  scope :moderate_grid, -> { time_order.where("moderated IS NULL OR moderated = false") }
  scope :unobtrusive_сity, -> (city) do
    if city
      where(city: city)
    else
      all
    end
  end

  scope :fresh_grid, -> (user, city) do
    unobtrusive_сity(city).default(user.try(:id)).visible
  end

  scope :hits_grid, -> (user, city) do
    unobtrusive_сity(city).default(user.try(:id)).where('updated_at >= ?', 2.days.ago)
    .where('discount_price != 0 AND discount_price < price AND (100 - (100*discount_price/price)) > 10')
  end

  scope :category_grid, -> (category, user, city) do
    category.posts.default(user.try(:id)).unobtrusive_сity(city)
  end

  scope :tag_grid, -> (tag, user, city) do
    joins(:tags).where(posts_tags:{tag: tag}).default(user.try(:id)).unobtrusive_сity(city)
  end

  scope :recommended_grid, -> (user, city) do
    unobtrusive_сity(city).default(user.try(:id)).recommended
  end

  scope :popular_grid, -> (user, city) do
    order(cached_votes_total: :desc).moderated(user.try(:id)).published
      .where('created_at >= ?', 2.weeks.ago).unobtrusive_сity(city)
  end

  scope :standart_limit, -> { limit(40) }

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

  # def set_published_at
  #   if published_time && published_date
  #     self.published_at = DateTime.strptime("#{published_date} #{published_time} +03", '%d.%m.%Y %H:%M %z')
  #   end
  # end

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
      where(user_id: [user.id] + user.all_follows.map(&:followable_id)).order(created_at: :desc).published
    else
      all.order(created_at: :desc)
    end
  end

  def self.update_view_counter(post)
    post_id = post.try(:id) || post
    where(id: post_id).update_all('view_counter = view_counter + 1')
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
