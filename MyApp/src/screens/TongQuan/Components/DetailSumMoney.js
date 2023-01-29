import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailSumMoney = ({money, type}) => {
    const typeTitle = {
        income: 'thu',
        expense: 'chi'
      }
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Tổng {typeTitle[type]}</Text>
          <Text style={styles.money}>{money + ' đ'}</Text>
        </View>
      )
}

export default DetailSumMoney

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50,
      paddingHorizontal: 10
    },
    title: {
      fontSize: 16
    },
    money: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold'
    }
  })