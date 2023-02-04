import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
  const pickedTime = allData.time;

  getData.loadData(allData);
  const resultList = getData.getExpenseWeekSumCategory();
  var sumExpense = 0;
  const dataChart = [];
  const colorScale = [];
  resultList.forEach(item => {
    dataChart.push({
      x: item.name,
      y: item.value,
    });
    colorScale.push(item.color);
    sumExpense += item.value;
  });
  const getHeader = () => {
    return (
      <View>
        <DetailSumMoney money={sumExpense} type="chi" />
        <CustomDonutChart data={dataChart} colorScale={colorScale} />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={getHeader}
        data={resultList}
        renderItem={({item}) => (
          <CustomCategoryView
            item={item}
            title={item.name}
            fillColor={item.color}
            progress={(item.value / sumExpense).toFixed(4)}
            money={item.value}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Expense;

const styles = StyleSheet.create({});
