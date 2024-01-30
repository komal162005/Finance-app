import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Setting from './screens/Setting';
import Icons from '@expo/vector-icons/AntDesign';
import Profile from './otherScreens/Profile'; 

const stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

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
                  name='piechart'
                  size={25}
                  color={focused ? '#8338ec' : '#9594e5'}
                />
              </View>
            ),
          }}
              />
              <Tab.Screen name='setting' component={Setting} 
                options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name='settings'
                  size={25}
                  color={focused ? '#8338ec' : '#9594e5'}
                />
              </View>
            ),
          }}
              />
              <Tab.Screen name='profile' component={Profile} 
                options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icons
                  name='user'
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
