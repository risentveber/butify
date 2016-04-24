class FeedController < ApplicationController
  skip_before_filter :require_login
  before_action :find_city_if_need
  before_action :require_admin, only: :moderate

  def show
  end

  def explore
    if params[:category_name]
      @category = Category.find_by_name(params[:category_name])
      @tag_name = params[:category_name]
      @posts_path = @category ? category_path(@category) : posts_path
    else
      @tag = Tag.find_by_name(params[:tag_name])
      @tag_name = params[:tag_name] ? ('#' + params[:tag_name]) : 'Популярное'
      @posts_path = @tag ? tag_path(@tag) : posts_path
    end
  end

  def fresh
    respond_to do |f|
      f.json do
        @posts = Post.time_order.moderated.visible.limit(params[:count])
        @posts = @posts.where(city_id: params[:city_id]) if params[:city_id]
        render 'posts/index'
      end
      f.html {}
    end
  end

  def moderate
    respond_to do |f|
      f.json do
        @posts = Post.time_order.limit(params[:count])
        render 'posts/index'
      end
      f.html {}
    end
  end

  def recommend
    respond_to do |f|
      f.json do
        @posts = Post.time_order.moderated.recommended.limit(params[:count])
        @posts = @posts.where(city_id: params[:city_id]) if params[:city_id]
        render 'posts/index'
      end
      f.html {}
    end
  end

  def popular
    respond_to do |f|
      f.json do
        @posts = Post.order(cached_votes_total: :desc).moderated
          .where('created_at >= ?', 2.weeks.ago)
          .limit(params[:count])
        @posts = @posts.where(city_id: params[:city_id]) if params[:city_id]
        render 'posts/index'
      end
      f.html {}
    end
  end

  def hits
    respond_to do |f|
      f.json do
        @posts = Post.moderated
          .where('updated_at >= ?', 2.days.ago)
          .limit(params[:count])
        @posts = @posts.where('discount_price != 0 AND discount_price < price AND (100 - (100*discount_price/price)) > 10')
        @posts = @posts.where(city_id: params[:city_id]) if params[:city_id]
        render 'posts/index'
      end
      f.html {}
    end
  end
end
