import { Text, View,TouchableOpacity,StyleSheet,Image, ImageBackground } from 'react-native'
import React from 'react';
import Report from '../screens/Report';
import Setting from './Setting';


export default function Dashboard({navigation}) {
  return (
    
    <View style={styles.container}>
      <Text style={{
        fontSize: 30,
        marginTop: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        fontFamily:'serif'
      }}>Welcome</Text>
      <View style={styles.IE}>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Income')}>
        <Text style={styles.txt}>Income</Text>
          <ImageBackground source={require('../compo/income.png')} style={styles.image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Expense')}>
        <Text style={styles.txt}>Expense</Text>
          <ImageBackground source={require('../compo/exp.png')} resizeMode='cover' style={styles.image}/> 
        </TouchableOpacity>
      </View>
      <View style={styles.IE}>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Goal')}>
        <Text style={styles.txt}>Goal</Text>
          <ImageBackground source={require('../compo/target.png')} style={styles.image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Budget')}>
          <Text style={styles.txt}>Budget</Text>
          <ImageBackground source={require('../compo/budget.png')} style={styles.image}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    height:'100%',
    backgroundColor:'#9d4edd'
  },
  image:{
    height:'80%',
    width:'90%',
    justifyContent:'flex-start',
    borderRadius:20,
    alignSelf:'center'
  },
  IE:{
    flexDirection:'row',
    columnGap:20,
    rowGap:20,
    alignItems:'center',
    marginTop:10,
    height:'25%',
    width:'70%',
    justifyContent:'center',
  },
  choose:{
    height:'90%',
    width:'50%',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:10
  },
  txt:{
    fontWeight:'700',
    alignSelf:'center',
    marginBottom:10,
    marginTop:5
  }
})

