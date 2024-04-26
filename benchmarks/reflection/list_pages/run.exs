alias Hologram.Commons.Reflection

Benchee.run(
  %{
    "list_pages/0" => fn ->
      Reflection.list_pages()
    end
  },
  formatters: [
    Benchee.Formatters.Console,
    {Benchee.Formatters.Markdown,
     description: "Reflection.list_pages/0", file: Path.join(__DIR__, "README.md")}
  ],
  time: 60
)
