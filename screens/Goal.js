import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

function Goal ()  {
  return (
    <View style={styles.con}>
      <View style={{height:'20%',
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
        marginTop:60
      }}>Goal Details</Text>
      </View>  
    </View>
  )
}

export default Goal

const styles = StyleSheet.create({
  con:{
    alignItems:'center',
    backgroundColor:'#9d4edd',
    height:'100%'
    }
  
})