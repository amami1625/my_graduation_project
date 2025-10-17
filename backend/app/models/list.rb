class List < ApplicationRecord
  belongs_to :user
  has_many :list_books, dependent: :destroy
  has_many :books, through: :list_books

  validates :name, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 255 }
  validates :public, inclusion: { in: [true, false] }
end
