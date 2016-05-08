class CommentSerializer < ActiveModel::Serializer
  delegate :l, :policy, to: :scope #view context
  attributes :id, :text, :can_remove, :can_edit, :url, :time

  has_one :author

  def author
    object.user
  end

  def can_edit
    #byebug
    policy(object).update?
  end

  def url
    comment_path(object)
  end

  def can_remove
    policy(object).destroy?
  end

  def time
    l(object.created_at)
  end
end
