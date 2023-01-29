import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import SocialButton from './component/social_button';
import {TouchableHighlight} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import AppLogo from '../../assets/wallet.png';
import CustomInput from './component/CustomInput';
import CustomButton from './component/CustomButton';
import {COLOR} from './component/Color';
import {AuthContext} from '../../components/context';
import {useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logAuth} from '../../redux/slice/authSlice/authSlice';
import firestore from '@react-native-firebase/firestore';
import {
  addAllDataItem,
  addAllDataTransfer,
  addDataItem,
  addDataTransfer,
  addTimeInfo,
  addModeTimeData,
  clearDataItem,
  clearDataTransfer,
} from '../../redux/slice/dataAllSlice/dataAllSlice';

import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';

onFacebookSignIn = () => {
  console.warn('Facebook');
};

onGoogleSignIn = () => {
  console.warn('Google');
};

onAppleSignIn = () => {
  console.warn('Apple');
};

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const {signInMain} = useContext(AuthContext);

  //sleep

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const slepp = async () => {
    for (let i = 0; i < 3; i++) {
      console.log(`Waiting ${i} seconds...`);
      await sleep(i * 1000);
    }
    signInMain();
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const loadAllDataByUser = userName => {
    // createChannels();
    //get AllItems
    dispatch(clearDataItem());
    firestore()
      .collection('Items')
      .where('user', '==', userName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          dispatch(
            addDataItem({
              id: documentSnapshot.data().id,
              color: documentSnapshot.data().color,
              name: documentSnapshot.data().name,
              icon: documentSnapshot.data().icon,
              user: documentSnapshot.data().user,
              value: documentSnapshot.data().value,
              type: documentSnapshot.data().type,
            }),
          );
        });
      });

    //get All Transfer
    dispatch(clearDataTransfer());
    firestore()
      .collection('Transfer')
      .where('user', '==', userName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          dispatch(
            addDataTransfer({
              id: documentSnapshot.data().id,
              idItem: documentSnapshot.data().idItem,
              month: documentSnapshot.data().month,
              note: documentSnapshot.data().note,
              time: documentSnapshot.data().time,
              type: documentSnapshot.data().type,
              user: documentSnapshot.data().user,
              value: documentSnapshot.data().value,
              week: documentSnapshot.data().week,
              year: documentSnapshot.data().year,
            }),
          );
        });
      });
  };

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(userName, pass)
      .then(() => {
        console.log('User account created & signed in!');
        dispatch(logAuth(userName.split('@')[0]));
        loadAllDataByUser(userName.split('@')[0]);
        // signInMain();
        slepp();
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
        Đăng nhập
      </Text>

      {/* <SocialButton
        backgroundColor={'#1877f2'}
        iconName="facebook-square"
        textColor={'white'}
        text={'Kết nối với Facebook'}
        onPress={onFacebookSignIn}
      />
      <SocialButton
        backgroundColor={'#000'}
        iconName="apple"
        textColor={'white'}
        text={'Kết nối với Apple'}
        onPress={onAppleSignIn}
      />
      <SocialButton
        backgroundColor={'#fff'}
        textColor={'red'}
        text={'Kết nối với Google'}
        iconName="google"
        onPress={onGoogleSignIn}
      /> */}

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

      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: COLOR.appColor}}>Quên mật khẩu</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{color: COLOR.appColor}}>
          <Text>Dang Ky</Text>
        </TouchableOpacity>
      </View>
      {/* <CustomButton /> */}
      <TouchableOpacity
        onPress={handleSignIn}
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

export default SignIn;
