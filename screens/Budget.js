import { SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  TextInput,
  ScrollView, 
  FlatList
} from 'react-native'
import React, { useState,useEffect } from 'react';
import styles from '../Styles.style';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import { ListItem } from '@rneui/themed';


function Budget ()  {
  const [errorMsg,setErrorMsg]=useState('');
  const [newBudget,setNewBudget]=useState([]);
  const [budgetEntries,setBudgetEntries]=useState([]);

  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const response = await axios.get('http://192.168.0.102:8000/budget');
      setBudgetEntries(response.data);
    } catch (error) {
      console.error('Error fetching income data:', error.message);
    }
  }

  const submit=()=>{  
    if(!newBudget.amount||!newBudget.type){
      setErrorMsg('Please fill all fields!')
    }
    else{
      fetch('http://192.168.0.101:8000/budget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            fetchBudget
          },
          body: JSON.stringify(newBudget),
          })
        .then(res=>res.json()).then(
          data=>{
            if(data.error){
          setErrorMsg(data.error);
        }
        else{
          alert("Budget Crated Successfully");
        }
         })
    }
  }
  return (
    <SafeAreaView style={styles.con}>
      <View style={styles.header}>
      <Text style={styles.headertxt}>Budget Creation</Text>
      </View>
      <View>
      {
        errorMsg ? <View style={{flexDirection:'row',
        marginTop:20}}><Icon style={styles.err} name='alert' size={15}/><Text style={styles.err}>{errorMsg}</Text></View>:null
      }
      <Text style={styles.txt}>Crate your Budget:</Text>
      <View style={styles.input}>
      <TextInput style={{marginLeft:10}}
      placeholder='enter budget amount...'
      placeholderTextColor={'white'} 
      keyboardType='number-pad'
      onChangeText={(number) => setNewBudget({ ...newBudget, amount:number })}
onPressIn={()=>setErrorMsg(null)}
      />
      </View>
      <View style={styles.input}>
        <TextInput style={{marginLeft:10}}
        placeholder='Budget type...'
        placeholderTextColor={'white'} 
        onChangeText={(text) => setNewBudget({ ...newBudget, type: text })}
        onPressIn={()=>setErrorMsg(null)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={submit}><Text style={{color:'white',alignSelf:'center',
      fontWeight:'bold',fontSize:15}}>Set Budget</Text></TouchableOpacity>
      </View>  
      <View style={{marginTop:20}}>
      <Text style={{fontSize:20,
      marginLeft:25,
      fontWeight:'bold',
      color:'white',
      marginBottom:10,
      fontFamily:'serif'}}>Created Budget</Text>
        <FlatList 
        pagingEnabled
          data={budgetEntries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem bottomDivider style={styles.list}>
              <ListItem.Content >
                <ListItem.Title>{new Date(item.date).toLocaleDateString()+` - ${item.amount} - ${item.type}  `}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </SafeAreaView>
    
  )
}

export default Budget

