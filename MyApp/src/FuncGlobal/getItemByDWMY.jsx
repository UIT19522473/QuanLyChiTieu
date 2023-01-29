export const getItemByDate = (
  arrItem,
  arrTransfer,
  time,
  modeTime,
  arrResult,
) => {
  //   console.log('funcTime', time);
  arrResult = [];
  arrResult = arrItem.slice();
  arrTransfer.map(element => {
    arrResult.map(item => {
      if (element.idItem === item.id && element.time === time) {
        item.value += element.value;
      }
    });
  });
  return arrResult;
};

export const getItemByWeek = () => {
  return 1;
};

export const getItemByMonth = () => {
  return 1;
};

export const getItemByYear = () => {
  return 1;
};
