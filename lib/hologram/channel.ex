defmodule Hologram.Channel do
  use Phoenix.Channel

  @impl Phoenix.Channel
  def join("hologram", _payload, socket) do
    {:ok, socket}
  end

  # TODO: implement
  @impl Phoenix.Channel
  def handle_in("command", payload, socket) do
    IO.inspect(payload)
    {:reply, :ok, socket}
  end
end
