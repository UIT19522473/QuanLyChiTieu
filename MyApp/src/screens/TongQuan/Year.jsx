import {ScrollView, View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {COLOR} from '../sign_in/component/Color';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

import InfoOfAnalyze from './Components/InfoOfAnalyze';
import CustomTotal from './Components/CustomTotal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import DetailWeekNavigator from './Navigator/DetailWeekNavigator';

import {transfers} from './data/transfers';
import * as getData from './function/getDataWithTime';

import {useSelector, useDispatch} from 'react-redux';

var detailTitle = '';
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: true,
  decimalPlaces: 0,

  propsForLabels: {
    fontSize: 12,
  },
};

const ChartView = ({pickedTime, data}) => {
  const navigation = useNavigation();
  getData.loadData(data);

  const valuesDataChart = getData.getYearData(
    getData.convertTimeFormat(pickedTime),
  );

  const pickedDate = getData.convertTimeFormat(pickedTime);
  const MonthInYear = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const dataChart = {
    labels: MonthInYear,
    datasets: [
      {
        data: valuesDataChart.income,
        color: (opacity = 1) => `rgba(36, 107, 253,1)`, // optional
        strokeWidth: 5, // optional
      },
      {
        data: valuesDataChart.expense,
        color: (opacity = 1) => `rgba(247, 85, 85,1)`, // optional
        strokeWidth: 5, // optional
      },
    ],
  };

  //Thong so view
  const sumIncome = valuesDataChart.income.reduce(
    (partialSum, a) => partialSum + a,
    0,
  );
  const sumExpense = valuesDataChart.expense.reduce(
    (partialSum, a) => partialSum + a,
    0,
  );

  const valueDataView = getData.getCompareTime(
    valuesDataChart.income,
    valuesDataChart.expense,
  );

  const bestText =
    MonthInYear[valueDataView.bestElement] + '/' + pickedDate.getFullYear();
  const worstText =
    MonthInYear[valueDataView.worstElement] + '/' + pickedDate.getFullYear();
  const averageText = pickedDate.getFullYear();
  const countTransferText = pickedDate.getFullYear();
  detailTitle = averageText.toString();
  return (
    <ScrollView style={styles.container}>
      {/* <ScrollView horizontal={true}>
        <LineChart
          xLabelsOffset={10}
          data={dataChart}
          chartConfig={chartConfig}
          width={Dimensions.get('window').width * 3}
          height={220}
          withDots={false}
          fromZero={true}
          bezier
        />
      </ScrollView> */}
      <View className="flex-row mt-4">
        <LineChart
          xLabelsOffset={10}
          data={dataChart}
          chartConfig={chartConfig}
          width={58}
          height={220}
          withDots={false}
          fromZero={true}
          bezier
          withVerticalLabels={false}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          horizontal={true}
          // className="absolute"
        >
          {/* <View className="abottom-0 bg-black w-[200px] h-[200px]"> */}

          {/* </View> */}

          <LineChart
            xLabelsOffset={10}
            data={dataChart}
            chartConfig={chartConfig}
            width={Dimensions.get('window').width * 3}
            height={220}
            withDots={false}
            fromZero={true}
            bezier
            // withVerticalLabels={false}
            withHorizontalLabels={false}
            style={{marginLeft: -40}}
          />
        </ScrollView>
      </View>
      <View style={styles.areaTotal}>
        <CustomTotal
          totalMoney={sumIncome}
          type="INCOME"
          onPress={() =>
            navigation.navigate('DetailWeekNavigator', {
              screen: 'Income',
            })
          }
        />
        <CustomTotal
          totalMoney={sumExpense}
          type="EXPENSE"
          onPress={() =>
            navigation.navigate('DetailWeekNavigator', {
              screen: 'Expense',
            })
          }
        />
      </View>
      <View style={styles.areaInfo}>
        <InfoOfAnalyze
          title={'Tháng tốt nhất'}
          money={valueDataView.bestMoney + ' vnđ'}
          date={bestText}
        />
        <InfoOfAnalyze
          title={'Trung bình mỗi tháng'}
          money={valueDataView.averageMoney + 'vnđ'}
          date={averageText}
        />
      </View>
      <View style={styles.areaInfo}>
        <InfoOfAnalyze
          title={'Tháng tệ nhất'}
          money={valueDataView.worstMoney + ' vnđ'}
          date={worstText}
        />
        <InfoOfAnalyze
          title={'Số giao dịch trong năm'}
          money={valuesDataChart.count}
          date={countTransferText}
        />
      </View>
    </ScrollView>
  );
};

const YearStack = createNativeStackNavigator();
const Year = () => {
  const dispatch = useDispatch();
  const allData = useSelector(State => State.dataAll);

  return (
    <NavigationContainer independent={true}>
      <YearStack.Navigator
        screenOptions={({route}) => ({
          headerShown: true,
          title: detailTitle,
          headerStyle: {
            backgroundColor: '#6c7ee1',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          statusBarColor: '#6c7ee1',
        })}>
        <YearStack.Screen name="ChartView" options={{headerShown: false}}>
          {props => <ChartView pickedTime={allData.time} data={allData} />}
        </YearStack.Screen>
        <YearStack.Screen
          name="DetailWeekNavigator"
          component={DetailWeekNavigator}
        />
      </YearStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    height: '100%',
  },
  areaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Year;
