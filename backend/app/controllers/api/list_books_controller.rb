class Api::ListBooksController < Api::ApplicationController
  def create
    list = current_user.lists.find(list_book_params[:list_id])
    book = current_user.books.find(list_book_params[:book_id])

    list_book = list.list_books.build(book: book)

    if list_book.save
      render json: list_book, status: :created
    else
      render json: { errors: list_book.errors }, status: :unprocessable_entity
    end
  end

  private

  def list_book_params
    params.require(:list_book).permit(:list_id, :book_id)
  end
end
