class Api::CategoriesController < Api::ApplicationController
  def index
    categories = current_user.categories
    render json: categories
  end

  def create
    category = current_user.categories.build(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors }, status: :unprocessable_entity
    end
  end

  private
  
  def category_params
    params.require(:category).permit(:name)
  end
end
