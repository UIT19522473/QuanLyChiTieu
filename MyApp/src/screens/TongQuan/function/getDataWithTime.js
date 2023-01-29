import { transfers } from "../data/transfers"
import { items } from "../data/items";

export const convertTimeFormat = (time) => {
    timeArr = time.split('/');
    return new Date(timeArr[2] + "-" + timeArr[1] + "-" + timeArr[0]);
}

export const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay();
    var diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getWeekData = (timePicked) => {

    let incomeTransfer = [];
    let expenseTransfer = [];
    let currMonday = getMonday(timePicked);
    let countTransfer = 0;
    for (let i = 0; i < 7; i++) {
        let sumIncome = 0;
        let sumExpense = 0;
        let currDay = new Date();
        currDay.setDate(currMonday.getDate() + i);
        transfers.forEach(element => {
            if (convertTimeFormat(element.time).getDate() === currDay.getDate() && convertTimeFormat(element.time).getMonth() === currDay.getMonth()
                && convertTimeFormat(element.time).getFullYear() === currDay.getFullYear()) {

                if (element.type == "thu") {
                    sumIncome += element.value;
                    countTransfer++;
                }
                else if (element.type == "chi") {
                    sumExpense += element.value;
                    countTransfer++;
                }
            }


        });
        incomeTransfer.push(sumIncome);
        expenseTransfer.push(sumExpense);
        
    }

    return {income : incomeTransfer, expense : expenseTransfer, count : countTransfer};

}

export const getCompareTime = (income, expense) => {

    let best = income[0] - expense[0];
    let worst = income[0] - expense[0];
    let sum = income[0] - expense[0];
    let bestElement = 0;
    let worstElement = 0;
    for(let i = 1;i < income.length;i++)
    {
        if(best < (income[i] - expense[i])) { best = income[i] - expense[i]; bestElement = i;}
        if(worst > (income[i] - expense[i])) {worst = income[i] - expense[i]; worstElement = i;}
        sum += (income[i] - expense[i]);
    }
    return {bestMoney : best, worstMoney : worst, averageMoney : (sum / income.length).toFixed(2), bestElement : bestElement, worstElement: worstElement };
}

export const getExpenseWeekSumCategory = (pickedTime) => {

    let currMonday = getMonday(pickedTime);
    let currSunday = new Date();
    currSunday.setDate(currMonday.getDate() + 6);
    let transferList = [];
    for(let i = 0;i < transfers.length;i++)
    {
        let tempDay = convertTimeFormat(transfers[i].time);
        
        if(tempDay.getTime() >= currMonday.getTime() && tempDay.getTime() <= currSunday.getTime() && transfers[i].type == "chi" )
        {
            transferList.push(transfers[i]);
        }
    }
    let result = [];
    transferList.reduce(function(res, value) {
        if (!res[value.iditem]) {
          res[value.iditem] = { iditem: value.iditem, value: 0 };
          result.push(res[value.iditem])
        }
        res[value.iditem].value += value.value;
        return res;
      }, {});
    result.forEach(el => {el.name = getItemWithID(el.iditem).name, el.color = getItemWithID(el.iditem).color, el.icon = getItemWithID(el.iditem).icon } );
    return result;

}

export const getIncomeWeekSumCategory = (pickedTime) => {

    let currMonday = getMonday(pickedTime);
    let currSunday = new Date();
    currSunday.setDate(currMonday.getDate() + 6);
    let transferList = [];
    for(let i = 0;i < transfers.length;i++)
    {
        let tempDay = convertTimeFormat(transfers[i].time);
        
        if(tempDay.getTime() >= currMonday.getTime() && tempDay.getTime() <= currSunday.getTime() && transfers[i].type == "thu" )
        {
            transferList.push(transfers[i]);
        }
    }
    let result = [];
    transferList.reduce(function(res, value) {
        if (!res[value.iditem]) {
          res[value.iditem] = { iditem: value.iditem, value: 0 };
          result.push(res[value.iditem])
        }
        res[value.iditem].value += value.value;
        return res;
      }, {});
    result.forEach(el => {el.name = getItemWithID(el.iditem).name, el.color = getItemWithID(el.iditem).color, el.icon = getItemWithID(el.iditem).icon } );
    return result;

}
export const getItemWithID = (i) =>
{
    return items[i];
}
