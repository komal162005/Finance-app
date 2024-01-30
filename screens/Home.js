import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'

function Home({navigation}) {
  return (
    <View style={styles.con} >
    <Text style={{
    fontSize:35,
    fontWeight:'500',
    alignSelf:'center',
    fontFamily:'serif',
    marginLeft:30,
    marginRight:30,
    marginBottom:5}}>
        Easily manage your Finance 
    </Text>
    <Text
    style={{
    fontSize:15,
    marginLeft:30,
    marginRight:30,
    fontWeight:'300',
    alignSelf:'center',
    fontFamily:'serif',
    }}>Leading you to a better future</Text>
      <Image source={require('../compo/logo.png')} 
      style={styles.image}></Image>
      <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.btn}>
     <Text style={styles.txt}>Get Started</Text>
      </TouchableOpacity>
          </View>
  )
}

export default Home

const styles = StyleSheet.create({
title:{
    alignItems:'center',
    fontWeight:'800',
    color:'#d62828',
    fontSize:20,
    justifyContent:'center',
    alignSelf:'center',
    shadowColor:'black',
    shadowRadius:20    
},
image:{
    height:"50%",
    width:'50%',
    borderRadius:30,
},
con:{
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
    backgroundColor:'white',
},
txt:{
    alignSelf:'center',
    marginHorizontal:20,
    fontSize:16,
    fontWeight:'800',
    marginVertical:6,
    color:'white'
},
btn:{
    marginHorizontal:18,
      borderWidth:1,
      marginTop:20,
      paddingHorizontal:10,
      backgroundColor:'#bc4749',
      borderRadius:10,
      paddingVertical:2,
      borderColor:'#bc4749',
      alignItems:'center',
      width:'90%',
      alignSelf:'center'
}
})