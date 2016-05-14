class PostsController < ApplicationController
  before_action :find_post, except: [:new, :create, :index]
  skip_before_filter :require_login, only: :index

  def new
    @post = Post.new
  end

  def create
    @post = current_user.posts.create post_params
    @post.bind_tags(params[:post][:tags])

    render nothing: true
  end

  def change_categories
    @post.update_attributes admin_post_params

    render nothing: true
  end

  def show
    respond_to do |format|
      format.json { render json: @post }
      format.html {Post.update_view_counter @post}
    end
  end

  def destroy
    @post.destroy
    render nothing: true
  end

  def update_view_counter
    unless current_user.try(:admin?)
      Post.update_view_counter(@post)
    end
  end

  def like
    voted = current_user.voted_for? @post
    if voted
      @post.unliked_by current_user
      Notification.like.where(
        who: current_user,
        user: @post.user,
        post: @post).destroy_all
    else
      @post.liked_by current_user
      Notification.like.create!(
        who: current_user,
        user: @post.user,
        post: @post)
    end
    render nothing: true
  end

  def basket
    current_user.get_basket.toggle_add(@post)
    render nothing: true
  end

  def update
    # byebug
    @post.update_attributes post_params
    @post.bind_tags(params[:post][:tags])

    render nothing: true
  end

  def index
    @posts = Post.for_user(current_user).limit(params[:count])
    render :index, formats: :json
  end

  private
    def post_params
      params.require(:post).permit(
        :post_type, :text, :city_id, :title,
        :sitelink, :price, :discount_price, :published_at,
        :category_ids, :recommended, :moderated, :visible,
        :published_time, :published_date, category_ids: [],
        photo_ids: []
      )
    end

    def admin_post_params
      params.require(:post).permit(
        :recommended, :moderated, :visible,
        category_ids: []
      )
    end

    def find_post
      authorize @post = Post.find(params[:id])
    end
end
