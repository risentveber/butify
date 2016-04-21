module ApplicationHelper
  def button_name(record)
    record.new_record? ? 'Создать' : 'Сохранить'
  end

  def times_tag(n)
    n = n.to_i
    raw "<span class='badge pull-right'>#{n}</span>" if n > 0
  end

  def category_name_path(name)
    "/explore?category_name=#{name}"
  end

  def tag_name_path(name)
    "/explore?tag_name=#{name}"
  end

  def city_params(city_id)
    if city_id
      "?city_id=#{city_id}"
    else
      ""
    end
  end

  def insert_class_name(class_name)
    base_class = ""
    if class_name.empty?
      base_class
    else
      class_name
    end
  end

  def halffull_contacts?(user)
    phone_contact = 0, vk_contact = 0, facebook_contact = 0, insta_contact = 0

    phone_contact = 1 if user.phone.present?
    vk_contact = 1 if user.vk_id.present?
    facebook_contact = 1 if user.facebook_id.present?
    insta_contact = 1 if user.instagram_id.present?

    sum = phone_contact + vk_contact + facebook_contact + insta_contact
    sum > 1
  end
  
end
