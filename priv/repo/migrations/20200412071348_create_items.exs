defmodule TodoList.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :content, :string, null: false
      add :completed_at, :utc_datetime

      timestamps()
    end
  end
end
