import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Icon from "react-native-vector-icons/Feather";

const CustomTotal = ({totalMoney}) => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor : '#eef4ff', width : 50, height: 50, borderRadius: 25, justifyContent: 'center'}}>
            <View style={{alignSelf: 'center', backgroundColor: '#246bfd', padding: 3, borderRadius: 5}}>
                <Icon name='arrow-down' size={13} color={'white'} />
            </View>
        </View>
        <View style={{marginLeft: 13 }}>
            <Text style={styles.moneyText}>{totalMoney}</Text>
            <Text style={styles.typeText}>Income</Text>
        </View>
    </View>
  )
}

export default CustomTotal

const styles = StyleSheet.create({
    container : {
        width : '48%',
        height : 70,
        borderColor : '#eeeeee',
        borderWidth : 1,
        borderRadius : 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moneyText : {
        color: 'black',
        fontWeight: 'bold'
    },
    typeText : {
        color: 'black',
        fontSize: 12

    }
})