class FeedController < ApplicationController
  skip_before_filter :require_login, except: :show
  before_action :find_city_if_need
  before_action :require_admin, only: :moderate

  def show
  end

  def explore
    if params[:category_name]
      @category = Category.find_by_name(params[:category_name])
      @tag_name = params[:category_name]
      @posts = @category ? Post.category_grid(@category, current_user, @city) : Post.for_user(current_user)
      @posts_path = @category ? category_path(@category) : posts_path
    else
      @tag = Tag.find_by_name(params[:tag_name])
      @tag_name = params[:tag_name] ? ('#' + params[:tag_name]) : 'Популярное'
      @posts_path = @tag ? tag_path(@tag) : posts_path
      @posts = @tag ? Post.tag_grid(@tag, current_user, @city) : Post.for_user(current_user)
    end
    @posts = @posts.standart_limit
  end

  def fresh
    @posts = Post.fresh_grid(current_user, @city)
    respond_to do |f|
      f.json { render json: @posts.limit(params[:count]) }
      f.html { @posts = @posts.standart_limit }
    end
  end

  def moderate
    @posts = Post.moderate_grid
    respond_to do |f|
      f.json { render json: @posts.limit(params[:count]) }
      f.html { @posts = @posts.standart_limit }
    end
  end

  def recommend
    @posts = Post.recommended_grid(current_user, @city)
    respond_to do |f|
      f.json { render json: @posts.limit(params[:count]) }
      f.html { @posts.standart_limit }
    end
  end

  def popular
    @posts = Post.popular_grid(current_user, @city)
    respond_to do |f|
      f.json { render json: @posts.limit(params[:count]) }
      f.html { @posts = @posts.standart_limit }
    end
  end

  def hits
    @posts = Post.hits_grid(current_user, @city)
    respond_to do |f|
      f.json { render json: @posts.limit(params[:count]) }
      f.html { @posts = @posts.standart_limit }
    end
  end
end
