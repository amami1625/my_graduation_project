class Api::ListBooksController < Api::ApplicationController
  before_action :find_list_and_book, only: [:create]

  def create
    list_book = @list.list_books.build(book: @book)

    if list_book.save
      render json: list_book, status: :created
    else
      render json: { errors: list_book.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    list_book = ListBook.find(params[:id])

    # 現在のユーザーのリストに紐づいているか確認
    if current_user.lists.exists?(id: list_book.list_id)
      list_book.destroy
      head :no_content
    else
      render json: { error: "Unauthorized" }, status: :forbidden
    end
  end

  private

  def list_book_params
    params.require(:list_book).permit(:list_id, :book_id)
  end

  def find_list_and_book
    @list = current_user.lists.find(list_book_params[:list_id])
    @book = current_user.books.find(list_book_params[:book_id])
  end
end
