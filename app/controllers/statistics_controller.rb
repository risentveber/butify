class StatisticsController < ApplicationController
  #skip_before_action :require_login

  def create
    @statistic = Statistic.new(statistic_params)
    if current_user != @statistic.user && !current_user.admin?
      @statistic.save
    end
    render nothing: true
  end

  private
    def statistic_params
      params.require(:statistic).permit(:type, :user_id)
    end
end
