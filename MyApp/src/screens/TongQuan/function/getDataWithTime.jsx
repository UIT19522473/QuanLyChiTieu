import { transfers } from '../data/transfers';
import { items } from '../data/items';

let allData = [];

export const loadData = data => {
  allData = data;
};

export const convertTimeFormat = time => {
  // const timeArr = time.split('/');
  // return new Date(timeArr[2] + '-' + timeArr[1] + '-' + timeArr[0]);
  const timeArr = time.split('/');
  let monthString = (timeArr[1] < 10) ? ("0" + timeArr[1]) : (timeArr[1]);
  let dayString = (timeArr[0] < 10) ? ("0" + timeArr[0]) : (timeArr[0]);
  let dateString = timeArr[2] + "-" + monthString + "-" + dayString + "T07:00:00";
  return new Date(dateString);
};

export const getMonday = d => {
  var myMonday;
  d = new Date(d);
  var day = d.getDay();
  var diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const getFirstDayOfMonth = time => {
  let d = new Date(time.getFullYear(), time.getMonth(), 1, 7, 0, 0, 0);
  return d;
}

export const getLastDayOfMonth = time => {
  let d = new Date(time.getFullYear(), time.getMonth() + 1, 0, 7, 0, 0, 0, 0);
  return d;
}

export const getMinDayAll = () => {
  let minday = allData.arrTrans[0].time;
  allData.arrTrans.forEach(element => {
    let currTimeElement = convertTimeFormat(element.time);
    if (currTimeElement.getTime() < convertTimeFormat(minday).getTime()) { minday = element.time; }
  });
  return convertTimeFormat(minday);
}

export const getMaxDayAll = () => {
  let maxday = allData.arrTrans[0].time;
  allData.arrTrans.forEach(element => {
    let currTimeElement = convertTimeFormat(element.time);
    if (currTimeElement.getTime() > convertTimeFormat(maxday).getTime()) { maxday = element.time; }
  });
  return convertTimeFormat(maxday);
}

export const getYearListAllTime = () => {

  let yearList = [];
  allData.arrTrans.forEach(el => {
    //var appearFlag = 1;
    yearList.push(el.year);
  })
  var uniqYears = [...new Set(yearList)];
  uniqYears.sort();
  return uniqYears;
}

export const getWeekData = (timePicked) => {
  let incomeTransfer = [];
  let expenseTransfer = [];
  let currMonday = getMonday(timePicked);
  let countTransfer = 0;
  for (let i = 0; i < 7; i++) {
    let sumIncome = 0;
    let sumExpense = 0;
    let currDay = new Date(currMonday.getTime() + 86400000 * i);
    // transfers.forEach(element => {
    //   if (
    //     convertTimeFormat(element.time).getDate() === currDay.getDate() &&
    //     convertTimeFormat(element.time).getMonth() === currDay.getMonth() &&
    //     convertTimeFormat(element.time).getFullYear() === currDay.getFullYear()
    //   ) {
    //     if (element.type == 'thu') {
    //       sumIncome += element.value;
    //       countTransfer++;
    //     } else if (element.type == 'chi') {
    //       sumExpense += element.value;
    //       countTransfer++;
    //     }
    //   }
    // });

    allData.arrTrans.forEach(element => {

      if (
        convertTimeFormat(element.time).getDate() === currDay.getDate() &&
        convertTimeFormat(element.time).getMonth() === currDay.getMonth() &&
        convertTimeFormat(element.time).getFullYear() === currDay.getFullYear()
      ) {
        if (element.type == 'thu') {
          sumIncome += element.value;
          countTransfer++;
        } else if (element.type == 'chi') {
          sumExpense += element.value;
          countTransfer++;
        }
      }
    });
    incomeTransfer.push(sumIncome);
    expenseTransfer.push(sumExpense);
  }

  return {
    income: incomeTransfer,
    expense: expenseTransfer,
    count: countTransfer,
  };
};

export const getMonthData = (timePicked) => {
  let incomeTransfer = [];
  let expenseTransfer = [];
  let countTransfer = 0;
  let firstDay = getFirstDayOfMonth(timePicked);
  let lastDay = getLastDayOfMonth(timePicked);
  for (let i = 0; i < lastDay.getDate(); i++) {
    let sumIncome = 0;
    let sumExpense = 0;
    let currDay = new Date(firstDay.getTime() + 86400000 * i);
    allData.arrTrans.forEach(element => {

      if (
        convertTimeFormat(element.time).getDate() === currDay.getDate() &&
        convertTimeFormat(element.time).getMonth() === currDay.getMonth() &&
        convertTimeFormat(element.time).getFullYear() === currDay.getFullYear()
      ) {
        if (element.type == 'thu') {
          sumIncome += element.value;
          countTransfer++;
        } else if (element.type == 'chi') {
          sumExpense += element.value;
          countTransfer++;
        }
      }
    });
    incomeTransfer.push(sumIncome);
    expenseTransfer.push(sumExpense);
  }
  return {
    income: incomeTransfer,
    expense: expenseTransfer,
    count: countTransfer,
  };

};

export const getYearData = (timePicked) => {
  let incomeTransfer = [];
  let expenseTransfer = [];
  let countTransfer = 0;
  let currYear = timePicked.getFullYear();
  for (let i = 0; i < 12; i++) {
    let sumIncome = 0;
    let sumExpense = 0;
    allData.arrTrans.forEach(element => {

      if (
        convertTimeFormat(element.time).getMonth() === i &&
        convertTimeFormat(element.time).getFullYear() === currYear
      ) {
        if (element.type == 'thu') {
          sumIncome += element.value;
          countTransfer++;
        } else if (element.type == 'chi') {
          sumExpense += element.value;
          countTransfer++;
        }
      }
    });
    incomeTransfer.push(sumIncome);
    expenseTransfer.push(sumExpense);
  }
  return {
    income: incomeTransfer,
    expense: expenseTransfer,
    count: countTransfer,
  };
}

export const getAllTimeData = () => {

  let incomeTransfer = [];
  let expenseTransfer = [];
  let countTransfer = 0;

  const yearList = getYearListAllTime();
  yearList.forEach(element => {
    let currYear = new Date(element + "-12-17");
    let dataYearOfElement = getYearData(currYear);
    console.log(dataYearOfElement.income);
    console.log(dataYearOfElement.expense);
    let tempIncome = incomeTransfer;
    let tempExpense = expenseTransfer;
    incomeTransfer = [...tempIncome, ...dataYearOfElement.income];
    expenseTransfer = [...tempExpense, ...dataYearOfElement.expense];
    countTransfer += dataYearOfElement.count;
  });
  console.log(incomeTransfer);
  console.log()
  return {
    income: incomeTransfer,
    expense: expenseTransfer,
    count: countTransfer,
  };  
}

export const getCompareTime = (income, expense) => {
  let best = income[0] - expense[0];
  let worst = income[0] - expense[0];
  let sum = income[0] - expense[0];
  let bestElement = 0;
  let worstElement = 0;
  for (let i = 1; i < income.length; i++) {
    if (best < income[i] - expense[i]) {
      best = income[i] - expense[i];
      bestElement = i;
    }
    if (worst > income[i] - expense[i]) {
      worst = income[i] - expense[i];
      worstElement = i;
    }
    sum += income[i] - expense[i];
  }
  return {
    bestMoney: best,
    worstMoney: worst,
    averageMoney: (sum / income.length).toFixed(2),
    bestElement: bestElement,
    worstElement: worstElement,
  };
};

export const getExpenseWeekSumCategory = () => {
  let result = [];
  allData.arrItem.forEach(element => {
    if (element.value != 0 && element.type == "chi") { result.push(element); }
  });
  return result;
};

export const getIncomeSumCategory = () => {
  let result = [];
  allData.arrItem.forEach(element => {
    if (element.value != 0 && element.type == "thu") { result.push(element); }
  });
  return result;
}

export const getIncomeWeekSumCategory = (pickedTime, data) => {
  let currMonday = getMonday(pickedTime);
  let currSunday = new Date();
  currSunday.setDate(currMonday.getDate() + 6);
  let transferList = [];
  for (let i = 0; i < transfers.length; i++) {
    let tempDay = convertTimeFormat(transfers[i].time);

    if (
      tempDay.getTime() >= currMonday.getTime() &&
      tempDay.getTime() <= currSunday.getTime() &&
      transfers[i].type == 'thu'
    ) {
      transferList.push(transfers[i]);
    }
  }
  let result = [];
  transferList.reduce(function (res, value) {
    if (!res[value.iditem]) {
      res[value.iditem] = { iditem: value.iditem, value: 0 };
      result.push(res[value.iditem]);
    }
    res[value.iditem].value += value.value;
    return res;
  }, {});
  result.forEach(el => {
    ((el.name = getItemWithID(el.iditem).name), data),
      ((el.color = getItemWithID(el.iditem).color), data),
      ((el.icon = getItemWithID(el.iditem).icon), data);
  });
  return result;
};
export const getItemWithID = (i, data) => {
  //item=>data.arrItem
  return items[i];
};
