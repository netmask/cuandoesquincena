defmodule Cuandoesquincena.Silly do

  def random_joke, do: valid_jokes() |> Enum.random
  

  def valid_jokes, do: read_jokes_file() |> Enum.reject(fn(s) -> String.length(s) == 0 end)

  def read_jokes_file do
    File.stream!('shit_to_say.txt', [:read]) |> Stream.map(&String.strip/1)
  end
end