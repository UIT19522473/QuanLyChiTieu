import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import AppLogo from '../../assets/wallet.png';

import CustomInput from './CustomInput';

import {COLOR} from './Color';
import {AuthContext} from '../../components/context';
import {useContext} from 'react';
import {useState} from 'react';

import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');

  const handleSigUp = () => {
    auth()
      .createUserWithEmailAndPassword(userName, pass)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const {signInMain} = useContext(AuthContext);
  const handleSignIn = () => {
    signInMain();
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={AppLogo} />
      <Text
        style={{
          fontSize: 30,
          color: '#000',
          fontWeight: 'bold',
          marginVertical: 20,
        }}>
        Đăng ky
      </Text>

      <Text
        style={{
          textAlign: 'center',
          width: 300,
          color: COLOR.appColor,
          marginTop: 2,
          marginBottom: 15,
        }}>
        Chúng tôi sẽ không đăng thông tin mà không có sự cho phép của bạn
      </Text>

      {/* <CustomInput placeholder={'Tài khoản'} iconName={'user'} />
      <CustomInput
        placeholder={'Mật khẩu'}
        iconName={'lock'}
        secureTextEntry={true}
      />

      <CustomInput
        placeholder={'Mật khẩu'}
        iconName={'lock'}
        secureTextEntry={true}
      /> */}
      <TextInput
        className="w-[300px] h-[50px] border-[1px] rounded-xl p-4 mb-3"
        placeholder="Tài khoản"
        onChangeText={setUserName}
        value={userName}
      />

      <TextInput
        className="w-[300px] h-[50px] border-[1px] rounded-xl p-4 mb-3"
        placeholder="Mật khẩu"
        onChangeText={setPass}
        value={pass}
      />

      <TextInput
        className="w-[300px] h-[50px] border-[1px] rounded-xl p-4 mb-3"
        placeholder="Nhập lại mật khẩu"
        onChangeText={setRePass}
        value={rePass}
      />

      <TouchableOpacity
        onPress={handleSigUp}
        className="mt-4 w-72 h-16 items-center justify-center rounded-3xl bg-green-600">
        <Text className="text-lg font-bold text-slate-100">Dang Ky</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        className="mt-4 w-72 h-16 items-center justify-center rounded-3xl bg-green-600">
        <Text className="text-lg font-bold text-slate-100">Dang Nhap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fafafa',
    height: '100%',
  },

  logo: {
    width: 200,
    height: 200,
  },
});

export default SignUp;
