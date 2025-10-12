class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.references :category, foreign_key: true
      t.integer :rating
      t.integer :reading_status, default: 0, null: false
      t.boolean :public, default: false, null: false

      t.timestamps
    end
  end
end
