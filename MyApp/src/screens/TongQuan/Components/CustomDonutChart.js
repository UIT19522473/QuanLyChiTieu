import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { VictoryPie } from 'victory-native'
import { Dimensions } from 'react-native'
import { COLOR } from '../../sign_in/component/Color'


const CustomDonutChart = ({ data, colorScale }) => {
  return (
    <View style={styles.container} >
      <VictoryPie data={data}
        innerRadius={75}
        labelRadius={90}
        padAngle={1}
        height={175}
        labels={[]}
        colorScale={colorScale}
      />
    </View>
  )
}

export default CustomDonutChart

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center'
  }
})