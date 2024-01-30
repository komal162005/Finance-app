import { StyleSheet, Text, View,Button, TextInput, TouchableOpacity, Platform } from 'react-native'
import { useState,useRef,useEffect } from 'react';
import styles from '../Styles.style';
import DateTImePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Setting() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode,setMode]=useState(false);
  const [show,setShow]=useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminderText,setReminderText]=useState('');
  const [rTitle,setRTitle]=useState('');

  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const onChange = (e,selectedDate) =>{
    setDate(selectedDate);
    setShow(false);
  };

  const showMode = (modeToShow) =>{
    setShow(true);
    setMode(modeToShow);
  }

  const addReminder = () => {
      }
  
  return (
    <View style={styles.con}>
      <View style={styles.header}>
      <Text style={styles.headertxt}>REMINDER</Text>
      </View>
      <Text style={styles.inputHead}>Title:</Text>
      <View style={styles.input}>
        <TextInput placeholder='enter Title' 
          value={rTitle}
          onChangeText={(text)=>setRTitle(text)}
        />
      </View>
      <Text style={styles.inputHead}>Description:</Text>
      <View style={styles.input}>
        <TextInput placeholder='enter Description' 
        value={reminderText}
        onChangeText={(text)=>setReminderText(text)}
        />
      </View>
      <Text style={styles.inputHead}>Pick a Date:</Text>
      <View style={styles.datePicker}> 
      <TouchableOpacity style={{borderWidth:1,width:'35%',height:'100%',borderRadius:10,backgroundColor:'#06d6a0',borderColor:'#06d6a0'}} onPress={()=>showMode('date')}><Text style={{alignSelf:'center',fontWeight:'500'}}>Choose Date</Text></TouchableOpacity>
      <TouchableOpacity style={{borderWidth:1,width:'35%',height:'100%',borderRadius:10,backgroundColor:'#06d6a0',borderColor:'#06d6a0'}} onPress={()=>showMode('time')}><Text style={{alignSelf:'center',fontWeight:'500'}}>Choose Time</Text></TouchableOpacity>
      {
        show && (
          <DateTImePicker
        value={date}
        is24Hour={false}
        onChange={onChange}
        mode={mode}
      />
        )
      }
      </View>
      <Text style={styles.inputHead}>
        {date.toLocaleString()}
      </Text>
      <TouchableOpacity  style={styles.btn}
      onPress={async () => {
          await schedulePushNotification(rTitle,reminderText,date);
        }} ><Text>Add Reminder</Text></TouchableOpacity>
      <View>
      </View>
    </View>
  )
}

async function schedulePushNotification(title,message,date) {
  const scheduleDate=new Date(date);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
      data: { data: 'goes here' },
      },
    trigger: { 
      date:scheduleDate
     },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}