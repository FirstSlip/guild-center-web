export const formatDate = (
  dateString: string,
  needTime: boolean = false
) => {
  const date = new Date(dateString);

  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  if (!needTime) {
    return `${day}.${month}.${year}`;
  }
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${day}.${month}.${year} в ${hours}:${minutes}`;
};
