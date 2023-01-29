import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/AntDesign'

const textType = {
    INCOME : "Thu nhập",
    EXPENSE : "Chi tiêu"
}



const CustomTotal = ({totalMoney,type, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={[{width : 50, height: 50, borderRadius: 25, justifyContent: 'center'}, styles[`circleIcon_${type}`]]}>
            <View style={[{alignSelf: 'center', padding: 3, borderRadius: 5}, styles[`bgIcon_${type}`]]}>
                <Icon name='arrowdown' size={13} color={'white'} />
            </View>
        </View>
        <View style={{marginLeft: 13 }}>
            <Text style={styles.moneyText}>{totalMoney}</Text>
            <Text style={styles.typeText}>{textType[`${type}`]}</Text>
        </View>
    </Pressable>
  );
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
    },
    circleIcon_EXPENSE : {
        backgroundColor: '#fff2f3'
    },
    bgIcon_EXPENSE : {
        backgroundColor: '#fb7077'
    },
    circleIcon_INCOME : {
        backgroundColor: '#eef4ff'
    },
    bgIcon_INCOME : {
        backgroundColor: '#246bfd'
    }
})