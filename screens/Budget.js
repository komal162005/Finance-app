import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

function Budget ()  {
  return (
    <View style={styles.con}>
      <View style={{
      marginTop:30,
      height:'15%',
      width:'100%',
      backgroundColor:'white',
      alignItems:'center',
      borderRadius:30}}>
      <Text style={{
        fontSize: 30,
        marginTop: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        fontFamily:'serif',
        marginTop:40
      }}>Budget Details</Text> 
      </View> 
    </View>
  )
}

export default Budget

const styles = StyleSheet.create({
  con:{
    alignItems:'center',
    backgroundColor:'#9d4edd',
    height:'100%'
    }  
})