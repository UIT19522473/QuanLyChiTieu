import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MoneyHeader = () => {
    return (
        <View style={styles.container}>
            <View style={{ height: "50%" }}>
                <Text style={styles.text_bold}>Số tiền</Text>
            </View >
            <View style={{ height: "50%" }}>
                <View style={styles.currencyHeader}>
                    <Text style={styles.text_bold}>VNĐ</Text>
                </View>
            </View >
        </View>
    )
}

export default MoneyHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: "40%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "column",
    },
    text_bold: {
        color: "black",
        fontWeight: "bold",
        fontSize: 17
    },
    currencyHeader: {
        backgroundColor: "gray",
    }
})