import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DetailSumMoney from '../../Components/DetailSumMoney';
import CustomDonutChart from '../../Components/CustomDonutChart';
import CustomCategoryView from '../../Components/CustomCategoryView';

import * as getData from '../../function/getDataWithTime';
import {FlatList} from 'react-native-gesture-handler';

import {useSelector, useDispatch} from 'react-redux';
import {forEach} from 'lodash';

const Expense = ({navigation, route}) => {
  //redux
  const dispatch = useDispatch();

  const allData = useSelector(State => State.dataAll);
  getData.loadData(allData);
  //const {pickedTime} = route.params;
  //   const pickedTime = '05/01/2023';
  const pickedTime = allData.time;
  const resultList = getData.getExpenseWeekSumCategory(
    getData.convertTimeFormat(pickedTime),
  );
  const sumExpense = getData
    .getWeekData(getData.convertTimeFormat(pickedTime))
    .expense.reduce((partialSum, a) => partialSum + a, 0);
  const dataChart = [];
  //   for (let i = 0; i < resultList.length; i++) {
  //     dataChart.push({
  //       x: getData.getItemWithID(resultList[i].iditem).name,
  //       y: resultList[i].value,
  //     });
  //   }
  allData.arrItem.forEach(item => {
    dataChart.push({
      x: item.name,
      y: item.value,
    });
  });
  const colorScale = [];
  for (let i = 0; i < resultList.length; i++) {
    colorScale.push(resultList[i].color);
  }
  console.log(dataChart);
  console.log(resultList);
  return (
    <View>
      <DetailSumMoney money={sumExpense} />
      <CustomDonutChart data={dataChart} colorScale={colorScale} />
      <FlatList
        data={resultList}
        renderItem={({item}) => (
          <CustomCategoryView
            title={item.name}
            fillColor={item.color}
            progress={(item.value / sumExpense).toFixed(4)}
            money={item.value}
          />
        )}
      />
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({});
