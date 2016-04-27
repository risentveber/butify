class DesiresController < ApplicationController
	before_action :find_desire,
    except: [:new, :create, :index]
	def new
    @desire = Desire.new
  end

  def create
    @desire = current_user.desires.create desire_params
    render nothing: true
  end

  def index
    @desires = Desire.all
  end

  def show

  end

  private
    def desire_params
      params.require(:desire).permit(
        :title, :text, 
      )
    end

    def find_desire
      @desire = Desire.find(params[:id])
    end

end
