import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import Icon from '@expo/vector-icons/Ionicons';
import Home from './screens/Home';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Income from './screens/Income';
import Expense from './screens/Expense';
import Goal from './screens/Goal';
import Budget from './screens/Budget';
import Report from './screens/Report';
import Profile from './otherScreens/Profile'; 
import FPass from './otherScreens/FPass';
import FPassCom from './otherScreens/ResetPassCom';
import { useRoute } from '@react-navigation/native';
import Notification from './screens/Notification.android';
import Icons from '@expo/vector-icons/FontAwesome5';
import Tax from './screens/TaxR';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImportExport from './otherScreens/ImportExport'

const stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();
const Drawer=createDrawerNavigator();

function DrawerNav(){
  return(
    <Drawer.Navigator>
      <Drawer.Screen name='Dash' component={Dashboard}/>
      <Drawer.Screen name='Notification' component={Notification}/>
    </Drawer.Navigator>
  )
}

function HomeScreen() {
  
  return (
          <Tab.Navigator initialRouteName='Dashboard' 
           screenOptions={({route})=>({
            tabBarStyle: {
            display: 'flex',
            position: 'absolute',
            elevation: 5,
            backgroundColor: 'white',
            height: 60,
          },
          tabBarShowLabel:false,
          headerShown:false
           })}>
          <Tab.Screen name='Dashboard' component={Dashboard} options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name='home'
                  size={25}
                  color={focused ? '#8338ec' : '#9594e5'}
                />
              </View>
            ),
          }}/>
              <Tab.Screen name='Report' component={Report} 
                options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icons
                  name='chart-pie'
                  size={25}
                  color={focused ? '#8338ec' : '#9594e5'}
                />
              </View>
            ),
          }}
              />
              <Tab.Screen name='Notification' component={Notification} 
                options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name='notifications'
                  size={25}
                  color={focused ? '#8338ec' : '#9594e5'}
                />
              </View>
            ),
          }}
              />
              <Tab.Screen name='profile' component={ImportExport} 
                options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icons
                  name='file-alt'
                  size={25}
                  color={focused ? '#8338ec' : '#9594e5'}
                />
              </View>
            ),
          }}
              />
            </Tab.Navigator>
        )
      }

function App() {
  const [isLogged,setIsLogged]=useState(false)
  const _retriveData=async()=>{
    try{
     const data=await AsyncStorage.getItem("keepLoggedIn");
     setIsLogged(data)
    }
    catch(error){

    }
  }

  useEffect(()=>{
    _retriveData();
  },[])

  return (
    
<NavigationContainer>
    <stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
    <stack.Screen name='Home' component={Home} />
      <stack.Screen name='Login'  component={Login}/>
      <stack.Screen name='Register'  component={Register}/>
      <stack.Screen name='Dash' component={HomeScreen}/>
      <stack.Screen name='Income' component={Income}/>
      <stack.Screen name='Expense' component={Expense}/>
      <stack.Screen name='Goal' component={Goal}/>
      <stack.Screen name='Budget' component={Budget}/>
      <stack.Screen name='forgotP' component={FPass}/>
      <stack.Screen name='forgotPC' component={FPassCom}/>
      <stack.Screen name='Tax' component={Tax}/>
      <stack.Screen name='drawer' component={DrawerNav}/>
      <stack.Screen name='Profile' component={Profile}/>
    </stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
