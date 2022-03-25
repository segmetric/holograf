# TODO: create Hologram.Commons.Store behaviour and use it in ModuleDefStore, PageDigestStore, StaticDigestStore, TemplateStore
# TODO: refactor & test

defmodule Hologram.Runtime.PageDigestStore do
  use GenServer

  alias Hologram.Compiler.Reflection
  alias Hologram.Utils

  @table_name :hologram_page_digest_store

  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_) do
    create_table()
    maybe_populate_table()

    {:ok, nil}
  end

  def clean_table do
    :ets.delete_all_objects(@table_name)
  end

  defp create_table do
    :ets.new(@table_name, [:public, :named_table])
  end

  def get(module) do
    [{^module, digest}] = :ets.lookup(@table_name, module)
    digest
  end

  defp maybe_populate_table do
    file_exists? =
      Reflection.release_page_digest_store_path()
      |> File.exists?()

    if file_exists?, do: populate_table()
  end

  def populate_table do
    Reflection.release_page_digest_store_path()
    |> File.read!()
    |> Utils.deserialize()
    |> Enum.each(fn {module, digest} ->
      :ets.insert(@table_name, {module, digest})
    end)
  end
end
