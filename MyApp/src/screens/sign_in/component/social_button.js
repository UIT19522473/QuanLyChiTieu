import { Button, View, Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome";

const SocialButton = ({iconName, backgroundColor, textColor, text = "undefine", onPress}) => {

    // var sourceIcon = active ? require('../../../assets/google.png') : require('');

    return (
            <Pressable onPress={onPress}>

                <View style = {[styles.buttonContainer, {backgroundColor: backgroundColor}]} >

                    <Icon name={iconName} size={25} color={textColor}  />
                    <Text style = {[styles.text, {color : textColor}]}>{text}</Text>
                    
                </View>

            </Pressable>

    );
}

const styles = StyleSheet.create({
    
    container : {
        
        

    },

    buttonContainer : {

        paddingHorizontal: 10,   
        flexDirection : 'row',
        height : 40,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical : 5,
        // borderColor: '#afb1b6',
        borderWidth: 1
    },

    text : {

        color: 'white',
        fontWeight: "bold",
        fontSize: 18,
        marginHorizontal: 20,
        flex : 1

    },

    buttonstyle: {
    
        

    },
    imageIcon: {
        width : 25,
        height: 25
    }
  });

export default SocialButton;