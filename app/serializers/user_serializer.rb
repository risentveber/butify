class UserSerializer < ActiveModel::Serializer
  attributes :name, :id,
    :phone, :facebook_id,
    :vk_id, :instagram_id,
    :url, :avatar

  def url
    user_path(object)
  end

  def avatar
    object.avatar.thumb.to_s
  end
end
