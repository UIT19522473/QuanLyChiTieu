import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InfoOfAnalyze = ({title, money, date}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>{money}</Text>
      <Text style={{fontSize : 16}}>{date}</Text>
    </View>
  )
}

export default InfoOfAnalyze

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '48%',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    title: {
        fontWeight: '600',
        fontSize: 16
    }
})