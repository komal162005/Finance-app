import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'

function Home({navigation}) {
  return (
    <View style={styles.con} >
      <Text style={styles.title}>FinanceTracker</Text>
      <Image source={require('../compo/logo.png')} 
      style={styles.image}></Image>
      <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.btn}>
     <Text style={styles.txt}>Start</Text>
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
    height:"55%",
    width:'55%'
},
con:{
    alignItems:'center',
    justifyContent:'center',
    height:'100%'
},
txt:{
    alignSelf:'center',
    marginHorizontal:30,
    fontSize:16,
    fontWeight:'800',
    marginVertical:6,
    color:'white'
},
btn:{
    alignItems:"center",
    marginHorizontal:25,
    marginTop:15,
    paddingHorizontal:10,
    borderRadius:23,
    borderRadius:10,
    backgroundColor:'#bc4749',
    color:'white',
    alignSelf:'center'
}
})