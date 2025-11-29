export const todayDates = (date: string) => {
  const d: Date = new Date();

  if (date === "year") {
    return d.getFullYear();
  } else if (date === "monthNum") {
    return d.getMonth();
  } else if (date === "month") {
    const Months: string[] = [
      "Janeiro",
      "Feveiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return Months[d.getMonth()];
  } else if (date === 'weekDay') {
    return d.getDay();
  } else if (date === 'day') {
    return d.getDate();
  } else if (!date) {
    console.error('Error to have a param \'date: string\'');
    return null;
  }
};
