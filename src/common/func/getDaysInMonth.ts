export const getDaysInMonth = (): number => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  return new Date(year, month + 1, 0).getDate();
};
