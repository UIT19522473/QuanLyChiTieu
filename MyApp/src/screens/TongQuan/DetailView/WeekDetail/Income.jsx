import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DetailSumMoney from '../../Components/DetailSumMoney';
import CustomDonutChart from '../../Components/CustomDonutChart';
import CustomCategoryView from '../../Components/CustomCategoryView';

import * as getData from '../../function/getDataWithTime';
import {FlatList} from 'react-native-gesture-handler';

import {useSelector, useDispatch} from 'react-redux';
import {forEach} from 'lodash';

const Income = () => {
  const dispatch = useDispatch();
  const allData = useSelector(State => State.dataAll);
  const pickedTime = allData.time;

  getData.loadData(allData);
  const resultList = getData.getIncomeSumCategory();
  var sumIncome = 0;
  const dataChart = [];
  const colorScale = [];
  resultList.forEach(item => {
    dataChart.push({
      x: item.name,
      y: item.value,
    });
    colorScale.push(item.color);
    sumIncome += item.value;
  });
  const getHeader = () => {
    return (
      <View>
        <DetailSumMoney money={sumIncome} type="thu" />
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
            progress={(item.value / sumIncome).toFixed(4)}
            money={item.value}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Income;

const styles = StyleSheet.create({});
