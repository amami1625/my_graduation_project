class Api::AuthorsController < Api::ApplicationController
  def index
    authors = current_user.authors
    render json: authors
  end

  def create
    author = current_user.authors.build(author_params)
    if author.save
      render json: author, status: :created
    else
      render json: { errors: author.errors }, status: :unprocessable_entity
    end
  end

  private
  
  def author_params
    params.require(:author).permit(:name)
  end
end
