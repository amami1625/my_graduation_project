class Api::ProfilesController < Api::ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def show
    user = current_user

    render json: user
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :image)
  end

  def record_not_found
    render json: { error: 'Not found' }, status: :not_found
  end
end