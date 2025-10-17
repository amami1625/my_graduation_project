class Book < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true
  has_many :book_authors, dependent: :destroy
  has_many :authors, through: :book_authors
  has_many :list_books, dependent: :destroy
  has_many :lists, through: :list_books

  validates :title, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 255 }
  validates :rating, inclusion: { in: 1..5 }, allow_nil: true
  validates :reading_status, presence: true
  validates :public, inclusion: { in: [true, false] }

  enum reading_status: { unread: 0, reading: 1, completed: 2 }
end
