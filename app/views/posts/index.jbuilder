json.array! @posts do |p|
  json.author do
    json.url user_path(p.user)
    json.avatar p.user.avatar.thumb.to_s
    json.(p.user, :name, :phone, :facebook_id, :vk_id, :instagram_id)
  end
  json.url post_path(p)
  json.edit_url edit_post_path(p)
  json.(p, :title, :text, :youtube_id, :city_id, :price, :discount_price,
    :visible, :recommended, :id, :linkdata, :sitelink, :city_name, :moderated
  )
  json.time l(p.created_at)
  if p.published_at && p.published_at > Time.now
    json.published_at l(p.published_at, format: :full_time)
  end
  json.can_edit policy(p).update?
  json.can_remove policy(p).destroy?

  json.tags p.tags.map(&:name)
  json.categories p.categories.map(&:id)
  json.category_names p.categories.map(&:name)

  json.likes p.cached_votes_total
  json.like_path like_post_path(p)
  json.current_like (current_user ? current_user.voted_for?(p) : false)

  json.photos do
    json.array! p.photos do |p|
      json.id p.id
      json.url p.url
    end
  end

  json.comments do
    json.array! p.comments do |c|
      json.url comment_path(c)
      json.id c.id
      json.text c.text
      json.can_edit policy(c).update?
      json.can_remove policy(c).destroy?
      json.author do
        json.name c.user.name
        json.url user_path(c.user)
        json.avatar c.user.avatar.thumb.to_s
      end
      json.time l(c.created_at)
    end
  end
end
