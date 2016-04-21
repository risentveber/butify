module UsersHelper
	
	def halffull_contacts?(user)
		phone_contact = 0
		vk_contact = 0
		facebook_contact = 0
		insta_contact = 0

		phone_contact = 1 if user.phone.present?
		vk_contact = 1 if user.vk_id.present?
		facebook_contact = 1 if user.facebook_id.present?
		insta_contact = 1 if user.instagram_id.present?

		number_of_contact = phone_contact + vk_contact + facebook_contact + insta_contact
		number_of_contact > 1
	end

end
