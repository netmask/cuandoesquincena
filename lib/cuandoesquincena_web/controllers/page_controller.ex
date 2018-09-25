defmodule CuandoesquincenaWeb.PageController do
  use CuandoesquincenaWeb, :controller
  use Timex

  import Cuandoesquincena.Quincena
  import Cuandoesquincena.Silly

  def index(conn, _params) do
    render(conn, "index.html", calculator: calculator_data, request_path: conn.request_path)
  end

  def api(conn, _params) do
    json(conn, calculator_data)
  end

  def calculator_data do
    %{
      dates_until: dates_until,
      dates_between: dates_between,
      days_until: interval_until(:days),
      seconds_until: interval_until(:seconds),
      next: next_quincena,
      prev: prev_quincena,
      month_dates: month_dates,
      next_day: next_quincena.day,
      today_day: Timex.local.day, # :D
      is_today: is_today,
      payday_image: silly_image(),
      joke: random_joke()
    }
  end


  def silly_image,
      do:
        :ets.lookup(:cached_images, "payday")
          |> List.first
          |> elem(1)
        
end
