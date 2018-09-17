defmodule Cuandoesquincena.Quincena do
  import Timex
  use Timex

  def next_quincena(),
    do: local() |> next_canonical_date |> calculate_quincena

  def prev_quincena,
    do: local() |> prev_canonical_date |> calculate_quincena

  def calculate_quincena(canonical_date),
    do: canonical_date |> to_date |> fix_weekend

  def is_today,
      do: next_quincena.day == local.day

  def prev_canonical_date(%{day: day} = current) when day > 15,
    do: %{current | day: 15}

  def prev_canonical_date(%{day: day}),
    do: local() |> subtract(Duration.from_days(day))


  def month_dates(),
    do:
      Interval.new(from: beginning_of_month(local()), until: end_of_month(local()))
        |> interval_to_date_array


  def dates_until,
    do:
      dates_between_interval
      |> interval_to_date_array

  def dates_between_interval, do: Interval.new(from: local(), until: next_quincena())

  def interval_until(interval),
    do: next_quincena() |> diff(local(), interval)

  def next_canonical_date(%DateTime{year: year, month: month, day: day} = payday) when day > 15,
    do: %{payday | day: :calendar.last_day_of_the_month(year, month)}

  def next_canonical_date(payday), do: %{payday | day: 15}

  def fix_weekend(%Date{day: day} = current),
    do: %{current | day: day - (current |> weekday |> business_day)}

  def business_day(week_day) when week_day > 5, do: week_day - 5
  def business_day(week_day), do: 0

  def interval_to_date_array(interval),
    do:
      interval
      |> Enum.map(fn date ->
        %{
          date: date ,
          weekday: date |> weekday,
          day: date.day
        }
      end)
end
