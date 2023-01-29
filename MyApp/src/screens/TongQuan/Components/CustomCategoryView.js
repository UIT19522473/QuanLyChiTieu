import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CustomProgressBar from './CustomProgressBar'

const defaultIconUri = 'https://cdn-icons-png.flaticon.com/512/3106/3106703.png'
const CustomCategoryView = ({title = 'undefined', iconUri = defaultIconUri , fillColor, progress, money}) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstLine}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image source={{ uri: iconUri }}
                        style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black'}}>{money + " đ"}</Text>
                    <Text style={{color: 'c8c8c8'}}> ( {progress * 100} % )</Text>
                </View>

            </View>
            <CustomProgressBar color={fillColor} progress={progress} />
        </View>
    )
}

export default CustomCategoryView

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 1,
        height: 65,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 3
    },
    title: {
        paddingLeft: 5,
        color: 'black',
        fontWeight: '500',
        fontSize: 18
    },
    firstLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})