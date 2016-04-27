class Photo < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  belongs_to :photable, polymorphic: true

  def url
    link || image.to_s
  end
end
