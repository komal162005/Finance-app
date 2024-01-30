import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Styles = StyleSheet.create({
  con:{
    height:'100%'
    },
    txt:{
      fontSize:20,
      fontWeight:'800',
      alignSelf:'flex-start',
      marginLeft:30,
      marginTop:20,
      fontFamily:'serif',
    },    
    btn:{
        backgroundColor:'#06d6a0',
        marginHorizontal:25,
        marginTop:20,
        paddingHorizontal:10,
        borderRadius:10,
        paddingVertical:6,
        alignItems:'center',
        width:'80%',
        alignSelf:'flex-start',
        elevation:20
      },
    headertxt:{
        fontSize: 20,
        marginTop: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily:'serif',
        alignSelf:'center',
        position:'absolute',
        },
        item: {
          padding: 10,
          fontSize: 18,
          height: 44,
        },
    input:{
        alignSelf:'flex-start',
        marginHorizontal:25,
        marginTop:10,
        paddingHorizontal:10,
        borderColor:"#06d6a0",
        paddingVertical:6,
        marginBottom:10,
        borderWidth:1,
        borderRadius:20,
        width:'80%',
        flexDirection:'row',
    },
    inputHead:{
      alignSelf:'flex-start',
        marginHorizontal:30,
        marginTop:10,
        flexDirection:'row',
        fontWeight:'500'
    },
    header:{
        height:'13%',
      width:'100%',
      backgroundColor:'white',
      alignItems:'center',
      borderRadius:10,
      marginBottom:10,
      backgroundColor:'#06d6a0',
      borderRadius:30,
      elevation:20
    },
    list:{
      marginBottom:1,
      borderRadius:20,
      marginHorizontal:25,
      paddingVertical:6,
      },
err:{
  color: 'blue',
  alignSelf: 'center',
  marginTop: 10,
  fontSize: 15,
  fontFamily:'serif',
  fontWeight:'bold',
  backgroundColor:'red',
  alignSelf:'center',    
},
datePicker:{
  flexDirection:'row',
  columnGap:10,
  marginHorizontal:30,
  marginTop:10,
  height:'3%'
}
})

export default Styles

