import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MoneyHeader from './CurrencyComponent/MoneyHeader';
import {TextInput} from 'react-native-element-textinput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InternationalView from './CurrencyComponent/InternationalView';
import {getAPIKeyRate} from './CurrencyComponent/getExchangeRate';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useState, useEffect} from 'react';

const Currency = ({route, navigation}) => {
  const [currencyList, setCurrencyList] = useState([]);
  const [money, setMoney] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleMoneyChange = updatedMoney => {
    setMoney(updatedMoney);
  };
  const base = route.params?.base || 'USD';
  const baseSymbol = route.params?.symbol || '$';

  useEffect(() => {
    setIsLoading(true);
    getAPIKeyRate(base).then(result => {
      setCurrencyList(result);
      setIsLoading(false);
    });
  }, [base]);

  currencyList.forEach(el => {
    el.amount = (money * el.rate).toLocaleString('fr-FR');
  });
  console.log(money.toLocaleString());

  const filterCurrencyList = currencyList.filter(item => {
    return (
      item.fullName.toLowerCase().includes(searchKey.toLowerCase()) ||
      item.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  });

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Đang tải dữ liệu</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row items-center bg-primary p-2 py-4">
        <TouchableOpacity onPress={() => navigation.navigate('TienIchHome')}>
          <Icon name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="items-center w-[90%]">
          <Text className="text-gray-50 font-bold text-2xl">
            Tra cứu tỷ giá
          </Text>
        </View>
      </View>
      <MoneyHeader
        onMoneyChange={handleMoneyChange}
        base={base}
        value={money}
        symbol={baseSymbol}
      />
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={24} />
        <TextInput
          style={styles.searchInput}
          placeholder={'Tìm theo mã, tên hoặc ký hiệu'}
          onChangeText={setSearchKey}
          value={searchKey}
        />
      </View>
      <ScrollView>
        {filterCurrencyList.map(item => (
          <InternationalView
            unit={item.name}
            unitLogo={item.symbol}
            uriFlag={item.uriFlag}
            currentRate={item.rate}
            pickedUnit={base}
            amount={item.amount}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Currency;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  searchBarContainer: {
    height: '8%',
    backgroundColor: '#dddddd',
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchInput: {
    width: '90%',
    marginLeft: 5,
    height: '100%',
  },
  placeholder: {
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
