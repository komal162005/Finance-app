import { Button, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,Image, ScrollView} from 'react-native';
import React, { useState,useContext } from 'react'
import { TextInput } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import Icons from '@expo/vector-icons/AntDesign';
import axios from 'axios';

function Login({navigation}){
  const [showPassword,setShowPassword]=useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return(
    
    <View style={styles.container}>
<Image source={require('../compo/reg.jpg')} style={{height:'40%',
    width:'100%',
    borderRadius:10,
    }}/>
    <Text style={styles.header}>Log In</Text>
    <View style={styles.f}>
      <Icons name='mail' size={20}/>
      <TextInput
        style={styles.txtin}
        placeholder='Email'
        placeholderTextColor={'black'}
        secureTextEntry={!showPassword}
      />
    </View>
    <ScrollView>
    <View style={styles.f}>
    <Icon name='lock'  size={20}/>
    <TextInput
        style={styles.txtin}
        placeholder='Password'
        placeholderTextColor={'black'}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}><Icon style={styles.Icon} size={20} name={showPassword ? 'eye-slash' : 'eye'} /></TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Dash')}><Text>LOGIN</Text></TouchableOpacity>
    <View style={{marginLeft:10,alignSelf:'center',marginTop:10,flexDirection:'row',marginBottom:10}}>
        <Text>If new user click on </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Register")}><Text
            style={{color:'blue',textDecorationLine:'underline'}}>Register</Text></TouchableOpacity>
            </View>
            </ScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    btn:{
      marginHorizontal:25,
      borderWidth:1,
      marginTop:30,
      paddingHorizontal:10,
      backgroundColor:'#e63946',
      borderRadius:10,
      paddingVertical:6,
      borderColor:'#e63946',
      alignItems:'center',
      width:'80%',
      alignSelf:'center'
    },
    container:{
        height:'100%',
        backgroundColor:"white",
        flex:1

    },
    f:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:25,
        borderWidth:1,
        marginTop:30,
        paddingHorizontal:10,
        borderColor:"#e63946",
        borderRadius:10,
        paddingVertical:6,     
    },
    Icon:{
        paddingLeft:140
    },
    header:{
        alignSelf:'center',
        fontSize:25,
        fontWeight:'500',
        marginTop:25,
        color:'black'
    },
    txtin:{
        marginLeft:10,
    },
    txt:{
        color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center'
    }
    
})