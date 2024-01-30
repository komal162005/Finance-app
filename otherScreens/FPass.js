import { StyleSheet, Text, View, TextInput, TouchableOpacity,ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import Icon from '@expo/vector-icons/FontAwesome'
function FPass({navigation}) {
    const [email,setEmail]=useState(null);
    const [errorMsg,setErr]=useState(null);
    const submit = async()=>{
      try {
        const Data = {
          email: email,
        };
        if(!email){
          setErr('Please enter email address!');
          return
        } 
        else if(!email.includes('@')){
          setErr('Please enter valid email address!');
          return
        }
        else{
          await axios.post('http://192.168.0.103:8000/resetpass', Data, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Data),
        }).then(
          data=>{
            if(data.error){
          setErr(data.error);
        }
        else{
          ToastAndroid.show('token send to your email...',ToastAndroid.LONG)
          navigation.navigate('forgotPC',{email});
        }
         })
        }
      } catch (error) {
        console.error(error);
      }
    }
      return (
    <View style={styles.con}>
      <Text style={{alignSelf:'center',
      fontSize:20,
      fontFamily:'serif',
      paddingBottom:15,
      paddingTop:100
      }}>Forgot Password</Text>
      <Text style={{margin:15,fontFamily:'sans-serif'}}>Enter your email address to below to reset your password.</Text>
      <View style={styles.in}>
      <TextInput  placeholder ='Enter Email'
      value={email}
        onChangeText={(text)=>setEmail(text)}
        onPressIn={()=>setErr(null)}
      /></View>
      {errorMsg ? <View style={{flexDirection:'row',
        marginBottom:5}}><Icon style={styles.err} name='warning' size={15}/><Text style={styles.err}>{errorMsg}</Text></View> : null}
      <TouchableOpacity onPress={submit} style={styles.btn}><Text style={{color:'white',fontWeight:'bold'}}>Reset Password</Text></TouchableOpacity>
     </View>
  )
}

export default FPass

const styles = StyleSheet.create({
  err:{
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 15,
    padding: 10
  },
    con:{
        justifyContent:'center',
    },
    in:{
        margin:20,
        borderBottomWidth:1,
        borderColor:'#9d4edd'
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
      alignSelf:'center'
    }
})