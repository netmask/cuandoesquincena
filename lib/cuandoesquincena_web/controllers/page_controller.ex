defmodule CuandoesquincenaWeb.PageController do
  use CuandoesquincenaWeb, :controller
  use Timex

  def index(conn, _params) do
    render(conn, "index.html", calculator: calculator_data, request_path: conn.request_path)
  end

  def api(conn, _params) do
    json(conn, calculator_data)
  end

  def calculator_data do
    cal = Cuandoesquincena.Quincena

    %{
      dates_until: cal.dates_until,
      days_until: cal.interval_until(:days),
      seconds_until: cal.interval_until(:seconds),
      next: cal.next_quincena,
      prev: cal.prev_quincena,
      month_dates: cal.month_dates,
      next_day: cal.next_quincena.day,
      today_day: Timex.local.day, # :D
      is_today: cal.is_today,
      payday_image: silly_image()
    }
  end


  def silly_image,
      do:
        :ets.lookup(:cached_images, "payday")
          |> List.first
          |> elem(1)
        
end
