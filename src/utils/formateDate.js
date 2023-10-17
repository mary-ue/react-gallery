function formatDate(createdAt) {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };
  const formattedDate = new Date(createdAt).toLocaleString('ru-RU', options);

  return formattedDate.replace(/,/g, '');
}

export default formatDate;
