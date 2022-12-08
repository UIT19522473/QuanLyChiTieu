import { ScrollView, Text, TextInput, StyleSheet, View, Image, Button } from 'react-native';
import React from 'react';


class ThemHanMuc extends React.Component {
    render() {
        return (
            <ScrollView alignItems='center'>
                <View style={styles.expenseAmountBox}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>So tien</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
                        <TextInput placeholder='0' style={styles.inputText} keyboardType='numeric' />
                        <Text style={{ paddingBottom: 22, fontSize: 18, fontWeight: 'bold', width: '15%' }}>VND</Text>
                    </View>
                </View>
                <View style={{ height: 150, width: '100%', backgroundColor: 'white', margin: 10 }}>
                    <View flexDirection='row' >
                        <Image source={require('../../asset/restaurant.png')} style={styles.icon} />
                        <TextInput placeholder='Ten han Muc' style={styles.inputText2} />
                    </View>
                    <View flexDirection='row' >
                        <Image source={require('../../asset/restaurant.png')} style={styles.icon} />
                        <Text style={styles.inputText2} >
                            Tat ca han muc chi
                        </Text>
                    </View>
                </View>
                
                <View style={{ height: 250, width: '100%', backgroundColor: 'white', margin: 10 }}>
                    <View flexDirection='row' >
                        <Image source={require('../../asset/restaurant.png')} style={styles.icon} />
                        <Text style={styles.inputText2} >
                            Tat ca han muc chi
                        </Text>
                    </View>
                </View>

                <Button style={{
                    height: 75,
                    fontSize: 22,
                    padding :22,
                    margin: 22,
                    width:'90%'
                }}
                    title="SAVE"
                />           
                 </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    expenseAmountBox: {
        backgroundColor: 'white',
        height: 110,
        width: '100%',
        margin: 10
    },

    inputText: {
        width: "70%",
        height: 70,
        fontWeight: 'bold',
        textAlign: 'right',
        placeholder: '0 VND',
        fontSize: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginLeft: 35,
        color: 'dark-grey',
        alignItems: 'flex-end'
    },
    inputText2: {
        fontSize: 20,
        padding: 4,
        color: 'black',
        width: '80%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        margin: 5
    },
    icon: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        resizeMode: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        padding: 10,
        margin: 10
    },

});

export default ThemHanMuc