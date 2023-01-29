import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { COLOR } from '../sign_in/component/Color';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import InfoOfAnalyze from './Components/InfoOfAnalyze';
import CustomTotal from './Components/CustomTotal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DetailWeekNavigator from './Navigator/DetailWeekNavigator';

import { transfers } from './data/transfers';
import * as getData from './function/getDataWithTime';

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: "#fff",

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: true,
  decimalPlaces: 0,

  propsForLabels: {
    fontSize: 12
  }


}
const ChartView = ({pickedTime }) => {

  const navigation = useNavigation();
  const valuesDataChart = getData.getWeekData(getData.convertTimeFormat(pickedTime));
  const dataChart = {
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    datasets: [
      {
        data: valuesDataChart.income,
        color: (opacity = 1) => `rgba(36, 107, 253,1)`, // optional
        strokeWidth: 5, // optional
      },
      {
        data: valuesDataChart.expense,
        color: (opacity = 1) => `rgba(247, 85, 85,1)`, // optional
        strokeWidth: 5 // optional
      }
    ]
  };
  const sumIncome = valuesDataChart.income.reduce((partialSum, a) => partialSum + a, 0);
  const sumExpense = valuesDataChart.expense.reduce((partialSum, a) => partialSum + a, 0);
  const valueDataView = getData.getCompareTime(valuesDataChart.income, valuesDataChart.expense);

  const dayInWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
  return (
    <View style={styles.container}>
      <LineChart data={dataChart}
        chartConfig={chartConfig}
        width={Dimensions.get("window").width}
        height={220}
        withDots={false}
        // withVerticalLines={false}
        // withHorizontalLines={false}
        fromZero={true}
        bezier
      />
      <View style={styles.areaTotal}>
        <CustomTotal
          totalMoney={sumIncome}
          type="INCOME"
          onPress={() => navigation.navigate("DetailWeekNavigator",
            {
              screen: "Income",
              params: { pickedTime: pickedTime }
            })}
        />
        <CustomTotal totalMoney={sumExpense}
          type="EXPENSE"
          onPress={() => navigation.navigate("DetailWeekNavigator",
            {
              screen: "Expense",
              params: { pickedTime: pickedTime }
            })}
        />
      </View>
      <View style={styles.areaInfo}>
        <InfoOfAnalyze
          title={'Ngày tốt nhất'}
          money={valueDataView.bestMoney + " vnđ"}
          date={dayInWeek[valueDataView.bestElement]}
        />
        <InfoOfAnalyze
          title={'Trung bình'}
          money={valueDataView.averageMoney + "vnđ"}
          date={'2022'}
        />
      </View>
      <View style={styles.areaInfo}>
        <InfoOfAnalyze
          title={'Ngày tệ nhất'}
          money={valueDataView.worstMoney + " vnđ"}
          date={dayInWeek[valueDataView.worstElement]}
        />
        <InfoOfAnalyze title={'Số giao dịch'} money={valuesDataChart.count} date={'2022'} />
      </View>
    </View>
  );
}

const YearStack = createNativeStackNavigator();
const Year = ({ pickedTime }) => {
    return (
      <NavigationContainer independent={true} >
        <YearStack.Navigator>
          <YearStack.Screen name="ChartView" options={{ headerShown: false }}>
            {(props) => <ChartView pickedTime={pickedTime} />}
          </YearStack.Screen>
          <WeekStack.Screen name="DetailWeekNavigator" component={DetailWeekNavigator} />
        </YearStack.Navigator>
      </NavigationContainer>
    );
};

export default Year;
