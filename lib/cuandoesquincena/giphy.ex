defmodule Cuandoesquincena.Giphy do
  use GenServer
  require Logger
  import HTTPotion

  @api_url "https://api.giphy.com/v1/gifs/random"
  @rate "G"

  def get_random_tag(tag),
      do:
        get(@api_url, query: %{ api_key: System.get_env("GIPHY_API_KEY"), rate: @rate, tag: tag})

  def get_payday_image,
      do:
        (get_random_tag("paydayy").body |> Poison.decode!)["data"]["image_url"]


  def fetch_images() do
    Logger.info "working"

    image_fetched = get_payday_image()

    :ets.insert(:cached_images, {"payday", image_fetched})

    schedule_work()

    Logger.info "Fetched Image #{image_fetched}"
  end

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{})
  end

  @impl true
  def init(state) do
    Logger.info "Starting up fetcher"

    :ets.new(:cached_images, [:named_table])

    fetch_images()
    schedule_work()
    {:ok, state}
  end

  @impl true
  def handle_info(:work, state) do
    fetch_images()
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 15 * 60 * 1000)
  end

end