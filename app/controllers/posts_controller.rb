class PostsController < ApplicationController
  before_action :find_post, except: [:new, :create, :index]
  skip_before_filter :require_login, :index

  def new
    @post = Post.new
  end

  def create
    #byebug
    @post = current_user.posts.create post_params
    @post.bind_tags(params[:post][:tags])

    render nothing: true
  end

  def change_categories
    @post.category_ids = params[:category_ids]
    puts @post.update_attributes recommended: params[:recommended],
      visible: params[:visible]
    render nothing: true
  end

  def show
    respond_to do |format|
      format.html { }
      format.json {
        @posts = [@post]
        render 'posts/index'
      }
    end
  end

  def destroy
    @post.destroy
    render nothing: true
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
        :sitelink, :price, :discount_price,
        category_ids: [],
        photo_ids: [],
      )
    end

    def find_post
      authorize @post = Post.find(params[:id])
    end
end
