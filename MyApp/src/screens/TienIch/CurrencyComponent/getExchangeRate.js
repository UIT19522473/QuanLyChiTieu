import { currencyList } from "./currencyData";

// export const getAPIKeyRate = () => {
//     var symbolList = "";
//     currencyList.forEach((element) => {
//         symbolList += element.name + ",";
//     })
//     var copiedCurrencyList = currencyList.map(function(element) {
//         return Object.assign({}, element);
//       });
//     var requestURL = 'https://api.exchangerate.host/latest?symbols=' + symbolList + '&base=VND';
//     var request = new XMLHttpRequest();
//     request.open('GET', requestURL);
//     request.responseType = 'json';
//     request.send();

//     request.onload = function () {
//         var response = request.response;
//         for (var key in response.rates)
//         {
//             var pickingCurrency = copiedCurrencyList.find(function(object) {
//                 return object.name === key
//             })
//             pickingCurrency.rate = response.rates[key];
//         }
//         return copiedCurrencyList;
//     }
// }

export const getAPIKeyRate = async (base) => {
    var symbolList = "";
    currencyList.forEach((element) => {
        symbolList += element.name + ",";
    })
    var copiedCurrencyList = currencyList.map(function(element) {
        return Object.assign({}, element);
      });
    var requestURL = 'https://api.exchangerate.host/latest?symbols=' + symbolList + '&base=' + base;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    return new Promise((resolve, reject) => {
        request.onload = function () {
            var response = request.response;
            for (var key in response.rates)
            {
                var pickingCurrency = copiedCurrencyList.find(function(object) {
                    return object.name === key
                })
                pickingCurrency.rate = response.rates[key];
            }
            resolve(copiedCurrencyList);
        }
    });
}