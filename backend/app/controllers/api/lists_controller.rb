class Api::ListsController < Api::ApplicationController
  def index
    lists = current_user.lists.order(created_at: :desc)
    render json: lists
  end

  def create
    list = current_user.lists.build(list_params)
    if list.save
      render json: list, status: :created
    else
      render json: { errors: list.errors }, status: :unprocessable_entity
    end
  end

  def show
    list = current_user.lists.find(params[:id])
    render json: list
  end

  private

  def list_params
    params.require(:list).permit(:name, :description, :user_id, :public)
  end
end
