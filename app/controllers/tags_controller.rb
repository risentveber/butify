class TagsController < ApplicationController
  skip_before_action :require_login
  before_action :find_city_if_need

  def index
    data = Tag.where('name ILIKE ?', "#{params[:term]}%").limit(10)
      .select(:id, :name).map(&:attributes)
    render json: data
  end

  def show
    @tag = Tag.find(params[:id])
    @posts = Post.tag_grid(@tag, current_user, @city).limit(params[:count])
    render json(@posts)
  end
end
