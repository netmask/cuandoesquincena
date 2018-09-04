defmodule Cuandoesquincena.Giphy do
  import HTTPotion

  @api_url "https://api.giphy.com/v1/gifs/random"
  @rate "G"

  def get_random_tag(tag),
      do:
        get(@api_url, query: %{ api_key: System.get_env("GIPHY_API_KEY"), rate: @rate})


end