import { Button, 
  ImageBackground, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View ,
  Image, 
  ScrollView,
  Animated,
  Dimensions,
  ToastAndroid
} from 'react-native';
import React, { useState,useContext } from 'react'
import { TextInput } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import Icons from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Login({navigation}){
  const [fdata,setFdata]=useState({
    email:'',
    password:'',
  });
  const [errorMsg,setErrorMsg]=useState(null);
  const fPass=()=>{
    navigation.navigate('forgotP');
  }
  const submit=()=>{
    if(fdata.email===''||fdata.password===''){
      setErrorMsg('*Please fill all fields!');
      return;
    }
    else if(!fdata.email.includes('@')){
setErrorMsg('Please Enter valid character!');
return;
    }
    else if(fdata.email.includes(' ')||fdata.email.includes(' ')){
      setErrorMsg('Space between character not allowed!');
      return;
          }
          else{
            fetch('http://192.168.0.103:8000/signin', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(fdata),
                })
                .then(res=>res.json()).then(
                  data=>{
                    if(data.error){
                  setErrorMsg(data.error);
                }
                else{
                  AsyncStorage.setItem("keepLoggedIn",JSON.stringify(true))
                  ToastAndroid.show('Login successfully',ToastAndroid.LONG)
                  navigation.navigate('Dash');
                  }
                 })
              console.log(fdata);
          }
  }
  
  const [showPassword,setShowPassword]=useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return(
    <View style={styles.container}>
    <ImageBackground source={require('../compo/bg.jpg')} resizeMode='cover' style={styles.image}>
    <Image  source={require('../compo/logo1.png')} style={{height:'40%',
    width:'70%',alignSelf:'center'}}/>
    <Text style={styles.header}>WELCOME</Text>
    <Text style={styles.h2}>Login Here</Text>
    {errorMsg ? <View style={{flexDirection:'row',
        marginBottom:5}}><Icon style={styles.err} name='warning' size={15}/><Text style={styles.err}>{errorMsg}</Text></View> : null}
    <View style={styles.f}>
      <Icons name='mail' size={20}/>
      <TextInput
        style={styles.txtin}
        placeholder='Email'
        placeholderTextColor={'black'}
        onPressIn={() => setErrorMsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, email: text })}
                  />
    </View>
    <ScrollView>
    <View style={styles.f}>
    <Icon name='lock'  size={20}/>
    <TextInput
        style={styles.txtin}
        placeholder='Password'
        placeholderTextColor={'black'}
        secureTextEntry={!showPassword}
        onPressIn={() => setErrorMsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, password: text })}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}><Icon style={styles.Icon} size={20} name={showPassword ? 'eye-slash' : 'eye'} /></TouchableOpacity>
    </View>
    <View ><TouchableOpacity onPress={fPass}><Text style={{alignSelf:'flex-end',color:'blue',textDecorationLine:'underline',paddingRight:25}}>Forgot Password</Text></TouchableOpacity></View>
    <TouchableOpacity style={styles.btn} onPress={submit}><Text style={{color:'white',fontWeight:'bold'}}>LOGIN</Text></TouchableOpacity>
    <View style={{marginLeft:10,alignSelf:'center',marginTop:15,flexDirection:'row',marginBottom:10}}>
        <Text>If new user click on </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text
            style={{color:'blue',textDecorationLine:'underline'}}>Register</Text></TouchableOpacity>
            </View>
            </ScrollView>
            </ImageBackground>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  h2:{
      alignSelf:'center',
      fontSize: 15,
      fontWeight: '500',
      paddingBottom: 20,
      fontFamily: 'sans-serif-condensed',
  },
    btn:{
      marginHorizontal:25,
      borderWidth:1,
      marginTop:30,
      paddingHorizontal:10,
      backgroundColor:'#9d4edd',
      borderRadius:10,
      paddingVertical:6,
      borderColor:'#9d4edd',
      alignItems:'center',
      width:'80%',
      alignSelf:'center',
      elevation:20
    },
    container:{
        flex:1
    },
    f:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:25,
        marginTop:10,
        paddingHorizontal:10,
        borderColor:"#9d4edd",
        paddingVertical:6,
        borderBottomWidth:1,
        marginBottom:10     
    },
    Icon:{
        paddingLeft:140
    },
    header:{
      marginTop:5,
      alignSelf:'center',
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
    },
    txtin:{
      marginLeft:15
    }
    ,
    txt:{
        color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center'
    },
    err:{
      color: 'red',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 15,
    padding: 10,
    }
    
})