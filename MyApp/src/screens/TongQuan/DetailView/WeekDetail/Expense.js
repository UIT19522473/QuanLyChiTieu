import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DetailSumMoney from '../../Components/DetailSumMoney'
import CustomDonutChart from '../../Components/CustomDonutChart'
import CustomCategoryView from '../../Components/CustomCategoryView';

import * as getData from '../../function/getDataWithTime';
import { FlatList } from 'react-native-gesture-handler';


const Expense = ({ navigation, route }) => {

    //const {pickedTime} = route.params;
    const pickedTime = "05/01/2023"
    const resultList = getData.getExpenseWeekSumCategory(getData.convertTimeFormat(pickedTime));
    const sumExpense = getData.getWeekData(getData.convertTimeFormat(pickedTime)).expense.reduce((partialSum, a) => partialSum + a, 0);
    const dataChart = [];
    for(let i = 0; i < resultList.length;i++)
    {
        dataChart.push({x : getData.getItemWithID(resultList[i].iditem).name, y: resultList[i].value});
    }
    const colorScale = [];
    for(let i = 0;i < resultList.length;i++)
    {
        colorScale.push(resultList[i].color);
    }
    console.log(dataChart);
    console.log(resultList);
    return (
        <View>
            <DetailSumMoney money={sumExpense} />
            <CustomDonutChart data={dataChart} colorScale={colorScale}  />
            <FlatList
            data={resultList}
            renderItem={({item}) => 
            <CustomCategoryView title={item.name} fillColor={item.color} progress={(item.value/sumExpense).toFixed(4)} money={item.value}/>
        }
            />
        </View>
    )
}

export default Expense

const styles = StyleSheet.create({})