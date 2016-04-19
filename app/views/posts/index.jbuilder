json.array! @posts do |p|
  json.author do
    json.name p.user.name
    json.url user_path(p.user)
    json.avatar p.user.avatar.thumb.to_s
  end
  json.url post_path(p)
  json.edit_url edit_post_path(p)
  json.(p,
    :title, :text, :youtube_id, :city_id, :price, :discount_price, :visible,
    :recommended, :id, :linkdata, :sitelink
  )
  json.city_name p.city.try(:name)

  json.time l(p.created_at)
  json.can_edit policy(p).update?
  json.can_remove policy(p).destroy?
  json.attachment_ids = p.attachment_ids
  json.tags p.tags.map(&:name)
  json.categories do
    json.array! p.categories.map(&:id)
  end
  json.category_names do
    json.array! p.categories.map(&:name)
  end

  json.likes p.cached_votes_total
  json.like_path like_post_path(p)
  json.current_like (current_user ? current_user.voted_for?(p) : false)

  json.baskets_count p.user_add_ids.count
  json.current_basket current_user ? current_user.get_basket.in?(p.id) : false
  json.basket_path basket_post_path(p)

  json.files do
    json.array! p.attachments do |a|
      json.id a.id
      json.name truncate(a.file.file.filename, length: 40)
      json.url a.file.to_s
    end
  end
  json.attachment_ids p.attachments.map(&:id)

  json.text_elements do
    json.array! p.text_elements do |e|
      json.id e.id
      json.type e.text_type
      json.url e.image.to_s
      json.text e.text
    end
  end
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
