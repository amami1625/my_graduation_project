class Book < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true
  has_many :book_authors, dependent: :destroy
  has_many :authors, through: :book_authors

  validates :title, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 255 }
  validates :rating, inclusion: { in: 1..5 }, allow_nil: true
  validates :reading_status, presence: true
  validates :public, inclusion: { in: [true, false] }
end
