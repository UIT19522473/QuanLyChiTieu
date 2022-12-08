import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import {COLOR} from '../sign_in/component/Color'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

import InfoOfAnalyze from './Components/InfoOfAnalyze'
import CustomTotal from './Components/CustomTotal'

const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
  datasets: [
    {
      data : [1000,900,1400,400,1100,632,980],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ]
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
}

const Week = () => {
  return (
    <View style={styles.container}>
      <LineChart data={data}
      chartConfig={chartConfig}
      width={Dimensions.get("window").width - 40}
      height={200}
      />
      <View style={styles.areaTotal}>
        <CustomTotal totalMoney={'$3759.45'} iconColor='#246bfd' backColor={'#eef4ff'}/>
        <CustomTotal totalMoney={'$26426'}/>
      </View>
      <View style={styles.areaInfo}>
        <InfoOfAnalyze title={'Best Week'} money={'$1,948.58'} date={'Dec 03-09'}/>
        <InfoOfAnalyze title={'Average Value'} money={'$2,475.52'} date={'2022'}/>
      </View>
      <View style={styles.areaInfo}>
        <InfoOfAnalyze title={'Worst Week'} money={'$564.83'} date={'Dec 25-31'}/>
        <InfoOfAnalyze title={'Transactions'} money={'75'} date={'2022'}/>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container : {
      paddingHorizontal: 20,
      paddingVertical : 10,
      backgroundColor : 'white',
      height : '100%',

    },
    areaTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    areaInfo : {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }
);

export default Week