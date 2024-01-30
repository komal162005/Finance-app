import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,TextInput,FlatList, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react';
import  Icon  from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../Styles.style';
import { ListItem } from '@rneui/themed';
import axios from 'axios';

function Expense()  {
  const [errorMsg,setErrorMsg]=useState('');
  const [newExpense,setNewExpense]=useState([]);
  const [expenses,setExpenses]=useState([]);
  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const response = await axios.get('http://192.168.0.102:8000/expense');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expense data:', error.message);
    }
  }

  const submit=()=>{
    if(!newExpense.amount||!newExpense.category){
      setErrorMsg('Please fill the fields!')
    }
    else
    {
      fetch('http://192.168.0.101:8000/expense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExpense),
          fetchExpense
        })
        .then(res=>res.json()).then(
          data=>{
            if(data.error){
          setErrorMsg(data.error);
        }
        else{
          alert("Expense added Successfully");
        }
         })
        }
  }
  return (
    <SafeAreaView style={styles.con}>
      <View style={Styles.header}>
      <Text style={Styles.headertxt}>Expense Details</Text>
      </View>
      <View>
      {errorMsg ? <View style={{flexDirection:'row',
        marginTop:20}}><Icon style={styles.err} name='alert' size={15}/><Text style={styles.err}>{errorMsg}</Text></View> : null}
      <Text style={styles.txt}>Add your Expense:</Text>
      <View style={styles.input}>
      <TextInput style={{marginLeft:10}}
      placeholder='enter Expense...'
      keyboardType='number-pad'
      onChangeText={(number) => setNewExpense({ ...newExpense, amount:number })}
onPressIn={()=>setErrorMsg(null)}
      />
      </View>
      <View style={styles.input}>
        <TextInput style={{marginLeft:10}}
        placeholder='Category...'
        onChangeText={(text) => setNewExpense({ ...newExpense, category: text })}
        onPressIn={()=>setErrorMsg(null)}
        />
      </View>
      <TouchableOpacity style={Styles.btn} onPress={submit}><Text style={{color:'white',alignSelf:'center',
      fontWeight:'bold',fontSize:15}}>Add Expense</Text></TouchableOpacity>
      </View>
      <View style={{marginTop:20}}>
      <Text style={{
        fontSize:20,
        fontFamily:'serif',
        marginTop:15,
        marginHorizontal:20,
        fontWeight:'bold',
        marginBottom:10
        }}>Expense List</Text>
        <FlatList 
        pagingEnabled
          data={expenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem style={Styles.list}>
              <ListItem.Content >
                <ListItem.Title>{new Date(item.date).toLocaleDateString()+` - ${item.amount} - ${item.category}  `}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
      </SafeAreaView>
  )
}

export default Expense

const styles = StyleSheet.create({
  con:{
    height:'100%'
    } ,
    txt:{
      fontSize:20,
      fontWeight:'800',
      alignSelf:'flex-start',
      marginLeft:30,
      marginTop:30,
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
            flexDirection:'row'
    },
    btn:{
      backgroundColor:'#06d6a0',
      alignSelf:'flex-start',
      marginHorizontal:25,
      marginTop:10,
      paddingHorizontal:10,
      paddingVertical:6,
      marginBottom:10,
      borderRadius:10,
      width:'80%',
      borderColor:'#06d6a0',
      height:'25%'
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
})