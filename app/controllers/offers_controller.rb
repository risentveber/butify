class OffersController < ApplicationController
	before_action :find_desire

	def index
    @posts = @desire.posts.order(created_at: :desc).limit(params[:count])
    render json: @posts
  end

  def create
  	@desire.post_ids = @desire.post_ids << params[:post_id]
  	Notification.offer.create(who_id: current_user.id, user_id: @desire.user_id)
  	render nothing: true
  end

  private
    def find_desire
      @desire = Desire.find(params[:desire_id])
    end

end
