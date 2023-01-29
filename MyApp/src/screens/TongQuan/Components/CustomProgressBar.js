import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'

const CustomProgressBar = ({color, progress}) => {
  return (
    <View style={styles.container}>
      <Progress.Bar height={8} width={375} borderRadius={8} progress={progress}
       unfilledColor={'#eaeaea'} borderColor={'#eaeaea'} color={color}/>
    </View>
  )
}

export default CustomProgressBar

const styles = StyleSheet.create({
    container : {
        // backgroundColor: 'blue',
        height: 30,
        justifyContent: 'center',
    }

})