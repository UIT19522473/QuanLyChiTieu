export const getStartWeek = timeVal => {
  const month = timeVal.split('/');

  // get number week in year
  const date = new Date(
    parseInt(month[2]),
    parseInt(month[1]) - 1,
    parseInt(month[0]) + 1,
  );

  let timeReturn = 0;
  const day = 60 * 60 * 24 * 1000;

  switch (date.getDay()) {
    //th8
    case 1:
      timeReturn = new Date(date.getTime() - 6 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    case 2:
      timeReturn = new Date(date.getTime());
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th3
    case 3:
      timeReturn = new Date(date.getTime() - day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th4
    case 4:
      timeReturn = new Date(date.getTime() - 2 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th5
    case 5:
      timeReturn = new Date(date.getTime() - 3 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th6
    case 6:
      timeReturn = new Date(date.getTime() - 4 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th7
    case 0:
      timeReturn = new Date(date.getTime() - 5 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    default:
      return date;
  }
};
export const getMonth = time => {
  const timeSplit = time.split('/');
  return timeSplit[1] + '/' + timeSplit[2];
};
export const getYear = time => {
  const timeSplit = time.split('/');
  return timeSplit[2];
};

export const dayOfWeek = time => {
  const timeVal = time.split('/');
  const weekday = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];
  const dayNow = new Date();

  const d = new Date(
    parseInt(timeVal[2]),
    parseInt(timeVal[1]) - 1,
    parseInt(timeVal[0]),
  );

  if (
    dayNow.getMonth() === d.getMonth() &&
    dayNow.getDate() === d.getDate() &&
    dayNow.getFullYear() === d.getFullYear()
  ) {
    return 'Hôm nay';
  } else {
    let day = weekday[d.getDay()];
    return day;
  }
};
