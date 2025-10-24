class Api::CardsController < Api::ApplicationController
  def create
    book = current_user.books.find(params[:book_id])
    card = book.cards.build(card_params)
    if card.save
      render json: card, status: :created
    else
      render json: { errors: card.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    book = current_user.books.find(params[:book_id])
    card = book.cards.find(params[:id])
    if card.destroy
      head :no_content
    else
      render json: { errors: card.errors }, status: :unprocessable_entity
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :content)
  end
end
