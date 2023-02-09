export const getSubTrans = (allData, timeCurrent, id) => {
  let arr = [];

  if (timeCurrent.modeTime === 0) {
    // dispatch(clearSubTransfer());
    arr = [];
    allData.arrTrans.map(item => {
      if (timeCurrent.time === item.time && item.idItem === id) {
        // dispatch(addSubTransfer(item));
        arr.push(item);
      }
    });
    return arr;
  }

  //sub transfer theo tuần
  else if (timeCurrent.modeTime === 1) {
    // dispatch(clearSubTransfer());
    arr = [];
    allData.arrTrans.map(item => {
      if (timeCurrent.week === item.week && item.idItem === id) {
        // dispatch(addSubTransfer(item));
        arr.push(item);
      }
    });
    return arr;
  }

  //sub transfer theo tháng
  else if (timeCurrent.modeTime === 2) {
    // dispatch(clearSubTransfer());
    arr = [];
    allData.arrTrans.map(item => {
      if (timeCurrent.month === item.month && item.idItem === id) {
        // dispatch(addSubTransfer(item));
        arr.push(item);
      }
    });
    return arr;
  } else if (timeCurrent.modeTime === 3) {
    // dispatch(clearSubTransfer());
    arr = [];
    allData.arrTrans.map(item => {
      if (timeCurrent.year === item.year && item.idItem === id) {
        // dispatch(addSubTransfer(item));
        arr.push(item);
      }
    });
    return arr;
  } else if (timeCurrent.modeTime === 4) {
    // dispatch(clearSubTransfer());
    arr = [];
    allData.arrTrans.map(item => {
      if (item.idItem === id) {
        // dispatch(addSubTransfer(item));
        arr.push(item);
      }
    });
    return arr;
  }
  // arr.push(timeCurrent.timeMode);
  //   console.log(timeCurrent.modeTime);
  //   console.log('Trán...', allData.arrTrans);
  return arr;
};
