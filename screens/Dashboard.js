import { Text, View,TouchableOpacity,StyleSheet,Image, ImageBackground } from 'react-native'
import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';

export default function Dashboard({navigation}) {
  return ( 
    <View style={styles.container}>
    <View style={{flexDirection:'row'}}>
    <Text style={styles.headerTxt}>WELCOME</Text>
    <Icon style={styles.TopIcon} name='user-circle' size={30} onPress={()=>navigation.navigate('Profile')}/>
    </View>
        <View style={{backgroundColor:'white',
        margin:25,
        width:'100%',
        height:'100%',
        alignItems:'center',
        borderRadius:30,
        elevation:20,}}>
        <View style={styles.IE}>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Income')}>
          <ImageBackground source={require('../compo/income.png')} style={styles.image}>
          <Text style={styles.txt}>Income</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Expense')}>
          <ImageBackground source={require('../compo/exp.png')} resizeMode='cover' style={styles.image}>
          <Text style={styles.txt}>Expense</Text>
          </ImageBackground> 
        </TouchableOpacity>
      </View>
      <View style={styles.IE}>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Goal')}>
          <ImageBackground source={require('../compo/target.png')} style={styles.image}>
          <Text style={styles.txt}>Goal</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Budget')}>
          <ImageBackground source={require('../compo/budget.png')} style={styles.image}>
          <Text style={styles.txt}>Budget</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.IE1}>
      <TouchableOpacity style={styles.choose} onPress={()=>navigation.navigate('Tax')}>
          <ImageBackground source={require('../compo/taxre.png')} style={styles.image}>
          <Text style={styles.txt}>Tax</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
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
  TopIcon:{
    marginTop: 45,
    marginBottom: 15,
    fontFamily:'serif',
    elevation:20,
    color:'white',
    marginLeft:140 
},
  headerTxt:{
    marginTop: 45,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily:'serif',
    elevation:20,
    color:'white'   
  },
  header:{
    flexDirection:'row'
    },
  image:{
    height:'95%',
    width:'95%',
    justifyContent:'flex-start',
    borderRadius:20,
    alignSelf:'center',
    borderRadius:30
  },
  IE:{
    flexDirection:'row',
    columnGap:20,
    rowGap:20,
    alignItems:'center',
    marginTop:30,
    height:'22%',
    width:'70%',
    justifyContent:'center',
  },
  IE1:{
    alignItems:'center',
    marginTop:10,
    height:'20%',
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
    borderRadius:10,
    elevation:20
  },
  txt:{
    fontWeight:'700',
    alignSelf:'center',
    marginTop:3,
  }
})

