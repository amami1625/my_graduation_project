class Category < ApplicationRecord
  belongs_to :user
  has_many :books, dependent: :nullify

  validates :name, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 100 }
end
