class List < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 255 }
  validates :public, inclusion: { in: [true, false] }
end
