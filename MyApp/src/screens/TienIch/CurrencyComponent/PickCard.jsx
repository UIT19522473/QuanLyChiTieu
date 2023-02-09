import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PickCard = ({fullName, unit, unitLogo, uriFlag}) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstCol}>
                <Image style={styles.flagImg} source={{ uri: uriFlag }} />
                <View style={{
                    marginLeft: 10,
                    justifyContent: 'center'
                }}>
                    <Text style={[styles.boldText, styles.commonText]}>{fullName}</Text>
                    <Text style={styles.commonText}>{unit}</Text>
                </View>
            </View>
            <Text style={[styles.boldText, styles.commonText]}>{unitLogo}</Text>
        </View>
    )
}

export default PickCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 40,
        marginVertical: 2
    },
    flagImg: {
        width: 50,
        height: 50
    },
    firstCol: {
        flexDirection: 'row'
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