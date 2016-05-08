class DesiresController < ApplicationController
	before_action :find_desire,
    except: [:new, :create, :index, :iwant]
	def new
    @desire = Desire.new
  end

  def create
    @desire = current_user.desires.create desire_params
    render nothing: true
  end

  def index
    @desires = Desire.all.order(created_at: :desc)
  end

  def show
  end

  def offer
  end

  def destroy
    @desire.destroy
    redirect_to desires_path
  end

  def edit
  end

  def iwant
    @desires = current_user.desires.order(created_at: :desc)
  end

  def update
    @desire.update_attributes desire_params
    render nothing: true
  end

  def complete
    @desire.update_attributes(completed: true)
    redirect_to @desire
  end

  def uncomplete
    @desire.update_attributes(completed: false)
    redirect_to @desire
  end

  private
    def desire_params
      params.require(:desire).permit(
        :title, :text, photo_ids: []
      )
    end

    def find_desire
      @desire = Desire.find(params[:id])
    end
end
