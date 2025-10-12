class Author < ApplicationRecord
  belongs_to :user
  has_many :book_authors, dependent: :destroy
  has_many :books, through: :book_authors

  validates :name, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 100 }
end
