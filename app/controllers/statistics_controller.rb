class StatisticsController < ApplicationController
  #skip_before_action :require_login

  def create
    Statistic.create(statistic_params)
    render nothing: true
  end

  private
    def statistic_params
      params.require(:statistic).permit(:type, :user_id)
    end
end
