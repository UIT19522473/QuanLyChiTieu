import { useEffect, useState } from 'react'
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { createContext } from 'react'
import { useNavigation } from '@react-navigation/native'


const MoneyHeader = ({ onMoneyChange, base, value, symbol }) => {

    const navigation = useNavigation();
    const [money, setMoney] = useState(1);

    const onChange = (money) => {
        setMoney(parseFloat(money))
        onMoneyChange(money);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text_bold}>Số tiền</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                height: '70%',
                justifyContent: 'space-between',
            }}>
                <Pressable onPress={() => navigation.navigate('PickCurrency')}>
                    <Text style={[styles.text_bold, styles.currencyHeader]}>{base}</Text>
                </Pressable>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: "70%"
                }}>
                    <TextInput style={styles.moneyInput} keyboardType={'numeric'} onChangeText={e => onChange(e)} defaultValue={0} value={money} clearButtonMode='always' />
                    <Text style={styles.text_bold}>{symbol.toString()}</Text>
                </View>

            </View>
        </View>

    )
}

export default MoneyHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: "20%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "column",
    },
    text_bold: {
        color: "black",
        fontWeight: "bold",
        fontSize: 17,
    },
    currencyHeader: {
        backgroundColor: "#e0e0e0",
        borderRadius: 7,
        width: 50,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    moneyInput: {
        height: '70%',
        fontSize: 30,
        // justifyContent: 'center',
        width: "100%",
        marginRight: 5,
        textAlign: 'right',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        color: 'black',
        fontWeight: 'bold'
    }
});