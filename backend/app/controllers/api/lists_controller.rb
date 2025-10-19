class Api::ListsController < Api::ApplicationController
  def index
    lists = current_user.lists.order(created_at: :desc)
    render json: lists, methods: :book_ids
  end

  def create
    list = current_user.lists.build(list_params)
    if list.save
      render json: list, status: :created
    else
      render json: { errors: list.errors }, status: :unprocessable_entity
    end
  end

  def update
    list = current_user.lists.find(params[:id])
    if list.update(list_params)
      render json: list
    else
      render json: { error: list.error }, status: :unprocessable_entity
    end
  end

  def show
    list = current_user.lists.includes({ books: [:category, :authors] }, :list_books).find(params[:id])
    render json: list,
           include: {
             books: { include: [:category, :authors] },
             list_books: { only: [:id, :book_id, :list_id] }
           },
           methods: :book_ids
  end

  def destroy
    list = current_user.lists.find(params[:id])
    if list.destroy
      head :no_content
    else
      render json: { errors: list.errors }, status: :unprocessable_entity
    end
  end

  private

  def list_params
    params.require(:list).permit(:name, :description, :user_id, :public)
  end
end
