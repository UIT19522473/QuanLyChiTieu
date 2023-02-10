import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  addTodo,
  deleteTodo,
  updateTickTodo,
  updateNoteTodo,
} from '../../../redux/slice/dataAllSlice/dataAllSlice';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const ItemTodo = props => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [tick, setTick] = useState(false);
  const toggleTick = () => {
    firestore()
      .collection('Todo')
      .doc(props.todo.id.toString())
      .update({
        tick: !tick,
      })
      .then(() => {
        updateTickTodo({id: props.todo.id, tick: !tick});
        setTick(!tick);
        // dispatch(deleteTodo(props.todo.id));
      });
  };

  useEffect(() => {
    setText(props.todo.note);
  }, []);

  const handleDeleteTodo = () => {
    firestore()
      .collection('Todo')
      .doc(props.todo.id.toString())
      .delete()
      .then(() => {
        dispatch(deleteTodo(props.todo.id));
      });
  };

  const BlurInput = () => {
    firestore()
      .collection('Todo')
      .doc(props.todo.id.toString())
      .update({
        note: text,
      })
      .then(() => {
        // dispatch(deleteTodo(props.todo.id));
        dispatch(updateNoteTodo({id: props.todo.id, note: text}));
      });
  };

  return (
    <View className="flex-row p-4 items-center border-[1px] mt-4 mx-4 rounded-lg border-gray-500">
      <TouchableOpacity
        onPress={toggleTick}
        className="mr-4 h-[28px] w-[28px] border-[1px] rounded-full justify-center items-center">
        {/* {toggleCheckBox && (
      <View className="bg-green-600 flex-1 w-full justify-center items-center">
        <Icon name="done" color={'white'} size={14} />
      </View>
    )} */}

        {tick && (
          <View className="bg-green-600 flex-1 w-full rounded-full justify-center items-center">
            <Icon name="done" color={'white'} size={18} />
          </View>
        )}
      </TouchableOpacity>
      <View className="flex-row">
        <TextInput
          style={{
            textDecorationLine: tick ? 'line-through' : '',
            // textDecorationStyle: 'solid',
          }}
          multiline={true}
          className="text-xl max-w-[240px] flex-wrap "
          onFocus={() => console.log('In')}
          onBlur={() => BlurInput()}
          value={text}
          onChangeText={setText}
          placeholder="Thêm công việc"
        />
      </View>
      <TouchableOpacity
        onPress={handleDeleteTodo}
        className="ml-auto  h-[28px] w-[28px] rounded-full justify-center items-center">
        {/* {toggleCheckBox && (
      <View className="bg-green-600 flex-1 w-full justify-center items-center">
        <Icon name="done" color={'white'} size={14} />
      </View>
    )} */}

        {/* {props.item.tick && ( */}
        <View className=" bg-gray-400 flex-1 w-full rounded-full justify-center items-center">
          <Icon name="close" color={'white'} size={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Todo = ({navigation}) => {
  const dispatch = useDispatch();
  const allData = useSelector(State => State.dataAll);
  const auth = useSelector(State => State.auth);

  const [todo, setTodo] = useState('');

  const handleAddTodo = () => {
    const time = new Date();
    const timeAdd =
      time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
    console.log('add todo');

    firestore()
      .collection('Todo')
      .doc('' + time.getTime())
      .set({
        id: time.getTime(),
        time: timeAdd,
        note: todo,
        userName: auth.userName,
        tick: false,
      })
      .then(() => {
        dispatch(
          addTodo({
            id: time.getTime(),
            time: timeAdd,
            note: todo,
            userName: auth.userName,
            tick: false,
          }),
        );
        setTodo('');
        // console.log('add todo', allData.arrTodo);
      });
  };

  // console.log('todo', allData.arrTodo);
  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between bg-primary p-2 py-4">
        <TouchableOpacity onPress={() => navigation.navigate('TienIchHome')}>
          <Icon name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-gray-50 font-bold text-2xl">
            Việc hằng ngày
          </Text>
        </View>

        <TouchableOpacity
        // onPress={toggleModal}
        >
          {/* <Icon name="add" size={32} color="white" /> */}
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}} className=" mb-4">
        {allData.arrTodo.map((todo, index) => (
          <ItemTodo todo={todo} key={index} />
        ))}
      </ScrollView>

      <SafeAreaView className="flex-row justify-between items-center px-4 m-4 mb-8">
        <TextInput
          value={todo}
          onChangeText={setTodo}
          className="border-[1px] w-[270px] text-lg mr-2 px-3 rounded-lg"
          placeholder="Thêm công việc"
        />
        <TouchableOpacity
          onPress={() => handleAddTodo()}
          className="p-[12px] rounded-lg bg-primary">
          <Icon name="add" size={28} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Todo;
