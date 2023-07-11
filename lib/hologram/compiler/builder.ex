defmodule Hologram.Compiler.Builder do
  alias Hologram.Commons.PersistentLookupTable
  alias Hologram.Compiler.Reflection

  def build_module_beam_defs_digest_plt(name) do
    plt = PersistentLookupTable.start(name: name)

    Reflection.list_loaded_otp_apps()
    |> Kernel.--([:hex])
    |> Reflection.list_elixir_modules()
    # TODO: remove this line once https://github.com/hrzndhrn/beam_file/issues/13 is fixed
    |> Kernel.--([Mix.Compilers.Test, Mix.Release, Protocol])
    |> Enum.map(&put_module_beam_defs_digest_to_plt(plt, &1))

    plt
  end

  defp put_module_beam_defs_digest_to_plt(plt, module) do
    data =
      Reflection.module_beam_defs(module)
      |> :erlang.term_to_binary(compressed: 0)

    digest = :crypto.hash(:sha256, data)

    PersistentLookupTable.put(plt.name, module, digest)
  end
end
