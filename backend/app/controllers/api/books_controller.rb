class Api::BooksController < Api::ApplicationController
  def create
    book = current_user.books.build(book_params)
    if book.save
      render json: book, include: :category, status: :created
    else
      render json: { errors: book.errors }, status: :unprocessable_entity
    end
  end

  def show
    book = current_user.books.includes(:category).find(params[:id])
    render json: book, include: :category
  end

  private

  # TODO: Tag機能を実装したらtagsも追加する
  def book_params
    params.require(:book).permit(:title, :description, :rating, :reading_status, :category_id, :public, author_ids: [])
  end
end
