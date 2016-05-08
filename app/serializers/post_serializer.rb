class PostSerializer < ActiveModel::Serializer
  delegate :l, :policy, :current_user, to: :scope #view context
  attributes :id,
    :title, :edit_url,
    :text, :published_at, :tags, :categories, :category_names,
    :url, :time, :can_edit, :can_remove, :like_path, :current_like,
    :youtube_id, :city_id, :price, :discount_price,
    :visible, :recommended, :id, :linkdata, :sitelink, :city_name, :moderated

  has_one :author
  has_many :photos
  has_many :comments

  def url
    post_path(object)
  end

  def tags
    object.tags.map(&:name)
  end

  def categories
    object.categories.map(&:id)
  end

  def category_names
    object.categories.map(&:name)
  end

  def likes
    object.cached_votes_total
  end

  def like_path
    like_post_path(object)
  end

  def current_like
    current_user ? current_user.voted_for?(object) : false
  end

  def author
    object.user
  end

  def edit_url
    edit_post_path(object)
  end

  def time
    l(object.created_at)
  end

  def can_edit
    #byebug
    policy(object).update?
  end

  def can_remove
    policy(object).destroy?
  end

  def published_at
    if object.published_at && object.published_at > Time.now
      l(object.published_at, format: :full_time)
    end
  end
end
