class CreateListBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :list_books do |t|
      t.references :list, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true

      t.timestamps
    end

    add_index :list_books, [:list_id, :book_id], unique: true
  end
end
