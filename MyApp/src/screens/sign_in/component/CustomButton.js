import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import { COLOR } from './Color';


const CustomButton = () => {

  return (
    <Pressable style={styles.container}>
        <Text style={styles.text}>Đăng nhập</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({

  container : {
      paddingHorizontal : 20,
      backgroundColor: COLOR.appColor,
      height : 50,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginVertical : 10
  },

  text : {
      color : 'white',
      fontSize: 20,
      fontWeight: 'bold'
  }



});

export default CustomButton