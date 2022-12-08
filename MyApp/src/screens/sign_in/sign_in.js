import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

import SocialButton from './component/social_button';
import { TouchableHighlight } from 'react-native-gesture-handler';

import Icon from "react-native-vector-icons/FontAwesome";
import AppLogo from "../../assets/wallet.png"
import CustomInput from './component/CustomInput';
import CustomButton from './component/CustomButton';
import { COLOR } from './component/Color';

onFacebookSignIn = () => {
  console.warn("Facebook");
}

onGoogleSignIn = () => {
  console.warn("Google");
}

onAppleSignIn = () => {
  console.warn("Apple");
}



const SignIn = () => {
  return (
        
        <View style = {styles.container} >

            <Image style={styles.logo} source={AppLogo}/>
            <Text style={{fontSize: 30, color:'#000', fontWeight: 'bold', marginVertical: 20}}>Đăng nhập</Text>

            <SocialButton backgroundColor = {'#1877f2'} iconName = "facebook-square" textColor={'white'} text={"Kết nối với Facebook"} onPress={onFacebookSignIn}/>
            <SocialButton backgroundColor = {'#000'} iconName = "apple" textColor={'white'} text={"Kết nối với Apple"} onPress={onAppleSignIn}/>
            <SocialButton backgroundColor = {'#fff'}  textColor={'red'} text={"Kết nối với Google"} iconName="google" onPress={onGoogleSignIn}/>

            <Text style={{textAlign: 'center', width: 300, color : COLOR.appColor, marginTop: 2, marginBottom: 15}}>Chúng tôi sẽ không đăng thông tin mà không có sự cho phép của bạn</Text>

            <CustomInput placeholder={'Tài khoản'} iconName={'user'} />
            <CustomInput placeholder={'Mật khẩu'} iconName={'lock'} secureTextEntry={true}/>

            <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: COLOR.appColor}}>Quên mật khẩu</Text>
              <Text style={{color: COLOR.appColor}}>Đăng ký</Text>
            </View>
            <CustomButton/>

        </View>

 

  );
};

const styles = StyleSheet.create({

    container : {
        alignItems: 'center',
        padding : 20,
        backgroundColor: '#fafafa',
        height : "100%"
    },

    logo : {
      width : 200,
      height: 200
    }



  });

export default SignIn;
