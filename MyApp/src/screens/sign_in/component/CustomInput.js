import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";

const CustomInput = ({placeholder, iconName, secureTextEntry = false}) => {

    const [input, setInput] = useState("");
    const [isChosing, setIsChosing] = useState('#afb1b6');

    return (

        <View style={styles.container}>

            <Icon name={iconName} size={25} color={isChosing} />
            <TextInput style={styles.inputText} placeholder={placeholder} secureTextEntry={secureTextEntry} onFocus={()  => {setIsChosing('#01ba76')}} onEndEditing={()  => {setIsChosing('#AFB1B6')}}></TextInput>
            
        </View>

    )
}

export default CustomInput

const styles = StyleSheet.create({

    container : {

        marginVertical : 5,
        borderColor: '#afb1b6',
        borderWidth : 1,
        width : '80%',
        backgroundColor : '#fff',
        borderRadius: 10,
        paddingHorizontal : 10,
        flexDirection : 'row',
        alignItems: 'center'

    },

    inputText: {

        marginLeft: 10,
        color: '#000'


    }
})