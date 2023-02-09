import { Button, Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import PickCard from './CurrencyComponent/PickCard'
import { currencyList } from './CurrencyComponent/currencyData'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from 'react-native-element-textinput'

const PickCurrency = ({ navigation, route }) => {
    const [searchKey, setSearchKey] = useState('');

    const filterCurrencyList = currencyList.filter(item => {
        return item.fullName.toLowerCase().includes(searchKey.toLowerCase()) ||
            item.name.toLowerCase().includes(searchKey.toLowerCase());
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Icon name='search' size={24} />
                <TextInput style={styles.searchInput} placeholder={"Tìm theo mã, tên hoặc ký hiệu"}
                    onChangeText={setSearchKey}
                    value={searchKey}
                />
            </View>

            <ScrollView>
                {filterCurrencyList.map(item => (
                    <Pressable onPress={() => { navigation.navigate('Currency', { base: item.name, symbol: item.symbol }) }}>
                        <PickCard unit={item.name} unitLogo={item.symbol} uriFlag={item.uriFlag} fullName={item.fullName} />
                    </Pressable>
                ))}
            </ScrollView>


        </SafeAreaView>
    )
}

export default PickCurrency

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    searchBarContainer: {
        height: '8%',
        backgroundColor: '#dddddd',
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10

    },
    searchInput: {
        width: '90%',
        marginLeft: 5,
        height: '100%',
    },
})