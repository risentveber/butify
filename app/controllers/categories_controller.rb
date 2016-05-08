class CategoriesController < ApplicationController
  skip_before_filter :require_login
  before_action :find_city_if_need

  def show
    @posts = Post.category_grid(Category.find(params[:id]), current_user, @city).limit(params[:count])
    render json: @posts
  end
end
