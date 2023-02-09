import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import HeaderTime from '../home/HeaderTime';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import HeaderTimeAll from '../home/HeaderTimeAll';
import * as convertTime from '../../screens/FunctionGlobal/convertTimeByString';

const RowItem = ({allData, item}) => {
  // console.log('arrItems', arrItems);

  // console.log('arrTransfer', arrTransfer);

  let obj = allData.arrItem.find(o => o.id === item.idItem);

  return obj != null ? (
    <TouchableOpacity className="w-full justify-center border-b-[1px] border-gray-300 py-4">
      <View className="mx-1 flex-row flex items-center justify-between ">
        {/* <Text>{time}</Text> */}

        <View className="flex-row items-center justify-center">
          <View
            style={{backgroundColor: obj.color}}
            className="p-3 rounded-full">
            <Icon size={22} name={obj.icon} color={'white'} />
          </View>
          <Text className="font-bold text-lg ml-2">{obj.name}</Text>
        </View>

        <View className="justify-end">
          {item.type == 'thu' ? (
            <View className="flex-row  ml-auto">
              <Text
                style={{color: '#16a34c'}}
                numberOfLines={1}
                className="font-bold text-lime-500 text-xl mt-[1px] max-w-[160px] flex-row flex-end">
                +{item.value}
              </Text>
              <Text
                style={{color: '#16a34c'}}
                className="text-xl font-bold text-lime-500">
                {' '}
                đ
              </Text>
            </View>
          ) : (
            <View className="flex-row  ml-auto">
              <Text
                numberOfLines={1}
                className="font-bold text-red-500 text-xl mt-[1px] max-w-[160px] flex-row flex-end">
                -{item.value}
              </Text>
              <Text className="text-xl font-bold text-red-500"> đ</Text>
            </View>
          )}

          {item.note != '' ? (
            <Text
              numberOfLines={1}
              className="text-sm mt-2 max-w-[160px] italic">
              Ghi chú: {item.note}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <></>
  );
};

const RowHistory = ({time, allData}) => {
  let dayOfWeek = 'Hôm nay';
  const dateNow = new Date();

  const [camp, SetCamp] = useState('+');
  const [colorDate, SetColorDate] = useState('#6c7ee1');
  const [colorMoney, SetColorMoney] = useState('#16a34c');

  const timeValue = time.split('/');

  if (
    dateNow.getDate() === parseInt(timeValue[0]) &&
    dateNow.getMonth() === parseInt(timeValue[1]) - 1 &&
    dateNow.getFullYear() === parseInt(timeValue[2])
  ) {
    dayOfWeek = 'Hôm nay';
  } else {
    dayOfWeek = 'ngày khác';
  }

  let money = 0;

  allData.arrTrans.map(trans => {
    // console.log('item...', item);
    if (trans.time == time) {
      if (trans.type == 'thu') {
        money += trans.value;
      } else {
        money -= trans.value;
      }
    }
  });

  return (
    <View className="w-full">
      <View className="flex-row justify-between bg-neutral-200 py-2 items-center">
        <View className="flex-row items-end ml-4">
          <Text style={{color: colorDate}} className="mr-4 text-3xl font-bold">
            {timeValue[0]}
          </Text>
          <View>
            <Text className="text-base font-bold text-zinc-500">
              {/* {dayOfWeek} */}
              {convertTime.dayOfWeek(time)}
            </Text>
            <Text style={{color: colorDate}} className="font-bold text-base">
              Tháng {timeValue[1] + '/' + timeValue[2]}
            </Text>
          </View>
        </View>

        <View className="flex-row mr-4 max-w-[160px] justify-end">
          {/* <Text style={{color: colorMoney}} className="text-2xl font-bold">
            {camp}
          </Text> */}
          {money > 0 ? (
            <Text
              style={{color: colorMoney}}
              numberOfLines={1}
              className="text-2xl font-bold">
              +{money} đ
            </Text>
          ) : (
            <Text numberOfLines={1} className="text-2xl font-bold text-red-500">
              {money} đ
            </Text>
          )}
          {/* 
          <Text style={{color: colorMoney}} className="text-2xl font-bold">
            {' đ'}
          </Text> */}
        </View>
      </View>
      <View className="p-4">
        {/* <RowItem />
        <RowItem /> */}
        {allData.arrTrans.map((item, index) =>
          item.time == time && item.type == 'thu' ? (
            <RowItem allData={allData} item={item} />
          ) : (
            <></>
          ),
        )}
        {allData.arrTrans.map((item, index) =>
          item.time == time && item.type == 'chi' ? (
            <RowItem allData={allData} item={item} />
          ) : (
            <></>
          ),
        )}
      </View>
    </View>
  );
};

function compare(a, b) {
  //var dateStringA = "23/10/2015"; // Oct 23

  const datePartsA = a.time.split('/');

  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObjectA = new Date(
    +datePartsA[2],
    datePartsA[1] - 1,
    +datePartsA[0],
  );

  const datePartsB = b.time.split('/');

  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObjectB = new Date(
    +datePartsB[2],
    datePartsB[1] - 1,
    +datePartsB[0],
  );

  // console.log('in floop', dateObjectA - dateObjectB);

  if (dateObjectA < dateObjectB) {
    return 1;
  }
  if (dateObjectA > dateObjectB) {
    return -1;
  }
  return 0;
}

//function
const getDateStartWeek = timeVal => {
  const month = timeVal.split('/');

  // get number week in year
  const date = new Date(
    parseInt(month[2]),
    parseInt(month[1]) - 1,
    parseInt(month[0]) + 1,
  );

  let timeReturn = 0;
  const day = 60 * 60 * 24 * 1000;

  switch (date.getDay()) {
    //th8
    case 1:
      timeReturn = new Date(date.getTime() - 6 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    case 2:
      timeReturn = new Date(date.getTime());
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th3
    case 3:
      timeReturn = new Date(date.getTime() - day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th4
    case 4:
      timeReturn = new Date(date.getTime() - 2 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th5
    case 5:
      timeReturn = new Date(date.getTime() - 3 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th6
    case 6:
      timeReturn = new Date(date.getTime() - 4 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    //th7
    case 0:
      timeReturn = new Date(date.getTime() - 5 * day);
      return (
        timeReturn.getDate() -
        1 +
        '/' +
        timeReturn.getMonth() +
        1 +
        '/' +
        timeReturn.getFullYear()
      );
    default:
      return date;
  }

  //return date.getDay();
};

// rowHistory by search

const RowHistorySearch = ({allData, time, allTrans}) => {
  let dayOfWeek = 'Hôm nay';
  const dateNow = new Date();

  const [camp, SetCamp] = useState('+');
  const [colorDate, SetColorDate] = useState('#6c7ee1');
  const [colorMoney, SetColorMoney] = useState('#16a34c');

  const timeValue = time.split('/');

  if (
    dateNow.getDate() === parseInt(timeValue[0]) &&
    dateNow.getMonth() === parseInt(timeValue[1]) - 1 &&
    dateNow.getFullYear() === parseInt(timeValue[2])
  ) {
    dayOfWeek = 'Hôm nay';
  } else {
    dayOfWeek = 'ngày khác';
  }

  let count = 0;
  let money = 0;

  allTrans.map(trans => {
    // console.log('item...', item);
    if (trans.time == time) {
      count++;
      if (trans.type == 'thu') {
        money += trans.value;
      } else {
        money -= trans.value;
      }
    }
  });

  return count > 0 ? (
    <View className="w-full">
      <View className="flex-row justify-between bg-neutral-200 py-2 items-center">
        <View className="flex-row items-end ml-4">
          <Text style={{color: colorDate}} className="mr-4 text-3xl font-bold">
            {timeValue[0]}
          </Text>
          <View>
            <Text className="text-base font-bold text-zinc-500">
              {dayOfWeek}
            </Text>
            <Text style={{color: colorDate}} className="font-bold text-base">
              Tháng {timeValue[1] + '/' + timeValue[2]}
            </Text>
          </View>
        </View>

        <View className="flex-row mr-4 max-w-[160px] justify-end">
          {/* <Text style={{color: colorMoney}} className="text-2xl font-bold">
            {camp}
          </Text> */}
          {money > 0 ? (
            <Text
              style={{color: colorMoney}}
              numberOfLines={1}
              className="text-2xl font-bold">
              +{money} đ
            </Text>
          ) : (
            <Text numberOfLines={1} className="text-2xl font-bold text-red-500">
              {money} đ
            </Text>
          )}
          {/* 
          <Text style={{color: colorMoney}} className="text-2xl font-bold">
            {' đ'}
          </Text> */}
        </View>
      </View>
      <View className="p-4">
        {/* <RowItem />
        <RowItem /> */}
        {allTrans.map((item, index) =>
          item.time == time && item.type == 'thu' ? (
            <RowItem allData={allData} item={item} key={index} />
          ) : (
            <></>
          ),
        )}
        {allTrans.map((item, index) =>
          item.time == time && item.type == 'chi' ? (
            <RowItem allData={allData} item={item} key={index} />
          ) : (
            <></>
          ),
        )}
      </View>
    </View>
  ) : (
    <></>
  );
};

const LichSu = () => {
  // const arrItems = useSelector(State => State.itemHomeArr.arrItem);
  // const arrTransfer = useSelector(State => State.transferItem.arr);

  const [query, setQuery] = useState('');

  const timeNow = new Date();

  const timeNowString =
    timeNow.getDate() + '/' + timeNow.getMonth() + '/' + timeNow.getFullYear();

  const dispatch = useDispatch();

  // const modeTime = useSelector(State => State.currentTime);

  let allData = useSelector(State => State.dataAll);

  const sliceTransfer = allData.arrTrans.slice();

  sliceTransfer.sort(compare);

  const unique = Array.from(new Set(sliceTransfer.map(item => item.time)));

  const arrSearch = allData.arrItem.filter(
    item => item.name.toLowerCase().includes(query) && item.value > 0,
  );

  let arrTransfilter = [];

  const filterTransfer = () => {
    arrTransfilter = [];

    arrSearch.map(item => {
      allData.arrTrans.map(trans => {
        if (item.id == trans.idItem) {
          arrTransfilter.push(trans);
        }
      });
    });
  };
  filterTransfer();

  let BodySearch = null;

  BodySearch =
    arrTransfilter.length > 0 ? (
      allData.modeTime == 0 ? (
        <View>
          {unique.map(item =>
            allData.time == item ? (
              <RowHistorySearch
                allData={allData}
                time={item}
                allTrans={arrTransfilter}
              />
            ) : (
              <></>
            ),
          )}
        </View>
      ) : allData.modeTime == 1 ? (
        <View>
          {unique.map(item =>
            allData.week == getDateStartWeek(item) ? (
              <RowHistorySearch
                allData={allData}
                time={item}
                allTrans={arrTransfilter}
              />
            ) : (
              <></>
            ),
          )}
        </View>
      ) : allData.modeTime == 2 ? (
        <View>
          {unique.map(item =>
            allData.month == item.split('/')[1] + '/' + item.split('/')[2] ? (
              <RowHistorySearch
                allData={allData}
                time={item}
                allTrans={arrTransfilter}
              />
            ) : (
              <></>
            ),
          )}
        </View>
      ) : allData.modeTime == 3 ? (
        <View>
          {unique.map(item =>
            allData.year == item.split('/')[2] ? (
              <RowHistorySearch
                allData={allData}
                time={item}
                allTrans={arrTransfilter}
              />
            ) : (
              <></>
            ),
          )}
        </View>
      ) : allData.modeTime == 4 ? (
        <View>
          {unique.map(item => (
            <RowHistorySearch
              allData={allData}
              time={item}
              allTrans={arrTransfilter}
            />
          ))}
        </View>
      ) : (
        <></>
      )
    ) : (
      <Text>Khong co du lieu</Text>
    );

  // <View>
  //   {arrSearch.map(item => (
  //     // item.value > 0 ? <Text>{item.name}</Text> : <></>,
  //     <Text>{item.name}</Text>
  //   ))}
  //   <Text>{arrSearch.length}</Text>
  //   <Text>{arrTransfilter.length}</Text>
  // </View>

  let Body = null;

  //test

  // (allData.arrItem = allData.arrItem.filter(item =>
  //   item.name.toLowerCase().includes(query),
  // )),
  //   console.log('query...', query);
  //---------

  if (allData.modeTime == 0) {
    Body = (
      <View>
        {unique.map(item =>
          allData.time == item ? (
            <RowHistory time={item} allData={allData} />
          ) : (
            <></>
          ),
        )}
      </View>
    );
  } else if (allData.modeTime == 1) {
    Body = (
      <View>
        {unique.map(item =>
          allData.week == getDateStartWeek(item) ? (
            <RowHistory time={item} allData={allData} />
          ) : (
            <></>
          ),
        )}
      </View>
    );
  } else if (allData.modeTime == 2) {
    Body = (
      <View>
        {unique.map(item =>
          allData.month == item.split('/')[1] + '/' + item.split('/')[2] ? (
            <RowHistory time={item} allData={allData} />
          ) : (
            <></>
          ),
        )}
      </View>
    );
  } else if (allData.modeTime == 3) {
    Body = (
      <View>
        {unique.map(item =>
          allData.year == item.split('/')[2] ? (
            <RowHistory time={item} allData={allData} />
          ) : (
            <></>
          ),
        )}
      </View>
    );
  } else if (allData.modeTime == 4) {
    Body = (
      <View>
        {unique.map(item => (
          <RowHistory time={item} allData={allData} />
        ))}
      </View>
    );
  }

  let moneySearch = 0;
  let money = 0;

  allData.arrItem.map(item => {
    item.type == 'thu' ? (money += item.value) : (money -= item.value);
  });

  //moneySearch by allTransfilter
  arrTransfilter.map(trans => {
    trans.type == 'thu'
      ? (moneySearch += trans.value)
      : (moneySearch -= trans.value);
  });
  // let arrSearch = [];

  const handleSearch = text => {
    // arrSearch = [];
    setQuery(text);

    // allData.arrItem
    //   .filter(item => item.name.toLowerCase().includes(query))
    //   .map(item => {
    //     arrSearch.push(item);
    //   });
  };
  // console.log('arrSearch...', arrSearch);
  // setQuery('Tien phong');

  const boolCheck = false;
  return (
    <View className="flex-1">
      {/* <HeaderTime /> */}
      {/* <HeaderTimeAll /> */}
      {boolCheck ? (
        <Text>hello</Text>
      ) : (
        <>
          {query === '' ? (
            <View className="flex-row justify-center items-end my-4">
              <Text className="text-xl font-bold">{'Số dư:  '}</Text>
              {money > 0 ? (
                <>
                  <Text
                    style={{color: '#16a34c'}}
                    numberOfLines={1}
                    className="text-2xl font-bold max-w-[250px]">
                    {money}
                  </Text>
                  <Text
                    style={{color: '#16a34c'}}
                    className="text-2xl font-bold ">
                    {' đ'}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    numberOfLines={1}
                    className="text-2xl font-bold max-w-[250px] text-red-500">
                    {money}
                  </Text>
                  <Text className="text-2xl font-bold text-red-500">
                    {' '}
                    {' đ'}
                  </Text>
                </>
              )}
            </View>
          ) : (
            <View className="flex-row justify-center items-end my-4">
              <Text className="text-xl font-bold">{'Số dư:  '}</Text>
              {moneySearch > 0 ? (
                <>
                  <Text
                    style={{color: '#16a34c'}}
                    numberOfLines={1}
                    className="text-2xl font-bold max-w-[250px]">
                    {moneySearch}
                  </Text>
                  <Text
                    style={{color: '#16a34c'}}
                    className="text-2xl font-bold ">
                    {' đ'}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    numberOfLines={1}
                    className="text-2xl font-bold max-w-[250px] text-red-500">
                    {moneySearch}
                  </Text>
                  <Text className="text-2xl font-bold text-red-500">
                    {' '}
                    {' đ'}
                  </Text>
                </>
              )}
            </View>
          )}

          <View className="border-[1px] border-gray-400 rounded-2xl mx-4 h-[40px] px-3 mb-8 flex-row items-center">
            <Icon name="search" size={24} />
            <TextInput
              className="w-[300px]"
              placeholder="Tìm kiếm..."
              value={query}
              onChangeText={newText => handleSearch(newText)}
              // onChangeText={setQuery}
            />
          </View>
          <ScrollView>
            {query === '' ? <View>{Body}</View> : BodySearch}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default LichSu;
