import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const InternationalView = ({ unit, unitLogo, pickedUnit, uriFlag, currentRate, amount }) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstCol}>
                <Text style={[styles.commonText, styles.boldText]}>{unitLogo}</Text>
                <Text style={styles.commonText}>{unit}</Text>
            </View>
            <View style={styles.secondCol}>
                <View>
                    <Text style={[styles.commonText, styles.boldText]}>{amount}</Text>
                    <Text style={styles.commonText}>1 {pickedUnit} = {currentRate} {unit}</Text>
                </View>

                <Image style={styles.flagImg} source={{ uri: uriFlag }} />
            </View>
        </View>
    )
}

export default InternationalView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        marginBottom: 2
    },
    firstCol: {
        backgroundColor: '#ffffff',
        width: '18%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondCol: {
        backgroundColor: '#ffffff',
        width: '82%',
        marginLeft: 1.5,
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flagImg: {
        width: 50,
        height: 50
    },
    commonText : {
        fontSize: 16,
        fontFamily: 'RobotoMono-Regular'
    },
    boldText: {
        fontWeight: 'bold',
        color: 'black'
    }
})