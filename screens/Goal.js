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

function Goal ()  {
  const [errorMsg,setErrorMsg]=useState('');
  const [goal,setGoal]=useState([]);
  const [goalEntries,setGoalEntries]=useState([]);

  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchGoal();
  }, []);

  const fetchGoal = async () => {
    try {
      const response = await axios.get('http://192.168.0.102:8000/goal');
      setGoalEntries(response.data);
    } catch (error) {
      console.error('Error fetching income data:', error.message);
    }
  }

  const submit=async()=>{
    if(!goal.amount||!goal.description){
      setErrorMsg('Please fill the field!')
    }
    else{
      fetch('http://192.168.0.102:8000/goal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(goal),
          fetchGoal
        })
        .then(res=>res.json()).then(
          data=>{
            if(data.error){
          setErrorMsg(data.error);
        }
        else{
          alert("Goal created Successfully");
        }
         })
    }
  }
  return (
    <SafeAreaView style={styles.con}>
      <View style={styles.header}>
      <Text style={styles.headertxt}>Goal Setting</Text>
      </View>
      <View>
      {
        errorMsg?<View style={{flexDirection:'row',
        marginTop:15,alignItems:'center',justifyContent:'center'}}><Icon style={styles.err} name='alert' size={15}/><Text style={styles.err}>{errorMsg}</Text></View>:null
      }
      <Text style={styles.txt}>Set your Goal:</Text>
      <View style={styles.input}>
      <TextInput style={{marginLeft:10}}
      placeholder='enter goal amount...'
      keyboardType='number-pad'
      onChangeText={(number) => setGoal({ ...goal, amount:number })}
onPressIn={()=>setErrorMsg(null)}
      />
      </View>
      <View style={styles.input}>
        <TextInput style={{marginLeft:10}}
        placeholder='Description...'
        onChangeText={(text) => setGoal({ ...goal, description: text })}
        onPressIn={()=>setErrorMsg(null)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={submit}><Text style={{color:'white',alignSelf:'center',
      fontWeight:'bold',fontSize:15}}>Set Goal</Text></TouchableOpacity>
      </View>  
      <View style={{marginTop:20}}>
      <Text style={{fontSize:20,
      marginLeft:25,
      fontWeight:'bold',
      fontFamily:'serif',
      marginBottom:10}}>created Goal</Text>
        <FlatList 
        pagingEnabled
          data={goalEntries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem bottomDivider style={styles.list}>
              <ListItem.Content >
                <ListItem.Title>{new Date(item.date).toLocaleDateString()+` - ${item.amount} - ${item.description}  `}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </SafeAreaView>
      )
}

export default Goal
