import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Styles = StyleSheet.create({
  bgimage: {
    flex: 1,
  },
  section:{
    height:100,
    width:'auto',
    borderRadius:20,
    overflow:'hidden',
    elevation:10
  },
  sectionImg:{
    height:100,
    width:'auto',
    resizeMode:'cover',
    flex:1
  },
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
    backgroundColor:'#ae60ff',
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
    fontSize:20,
    top:15,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:'serif',
    alignSelf:'center',
    color:'white',
    marginHorizontal:70
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 40,
    marginTop:15,
    elevation:10
  },
  item1:{
    padding: 15,
    fontSize: 18,
    marginTop:15,
    backgroundColor:'#caf0f8',
    height:60,
    borderRadius:10,
    alignSelf:'center',
  },
  input:{
    alignSelf:'flex-start',
    marginHorizontal:25,
    marginTop:10,
    paddingHorizontal:10,
    borderColor:"#ae60ff",
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
    height:80,
    width:'100%',
    alignItems:'center',
    marginBottom:10,
    backgroundColor:'#8338ec',
    elevation:20,
    flexDirection:'row'
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
    height:'3%',
    marginBottom:20
  },
  dropdown: {
    margin: 20,
    height: 50,
    borderBottomColor: 'gray',
    borderWidth:0.5,
    borderRadius:10
     },
  icon: {
    marginRight: 10,
    marginStart:10
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight:10
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

export default Styles

