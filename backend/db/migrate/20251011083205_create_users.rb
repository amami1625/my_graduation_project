class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :supabase_uid, null: false
      t.string :name, null: false
      t.string :avatar_url

      t.timestamps
    end
    add_index :users, :supabase_uid, unique: true
  end
end
