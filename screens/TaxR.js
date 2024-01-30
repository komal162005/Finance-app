import { View, Text,TouchableOpacity,TextInput,SectionList,FlatList } from 'react-native'
import React, { useState,useEffect } from 'react';
import styles from '../Styles.style';
import  Icon  from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { ListItem } from '@rneui/themed';

export default function TaxR() {
  const [TaxRecord,setTaxRecord]=useState({ amount: '', type: ''});
  const[errorMsg,setErrorMsg]=useState('');
  const [taxEntries,setTaxEntries]=useState([]);

  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchRecord();
  }, []);


  const fetchRecord = async () => {
    try {
      const response = await axios.get('http://192.168.0.103:8000/taxRecord');
      setTaxEntries(response.data);
    } catch (error) {
      console.error('Error fetching income data:', error.message);
    }
  }

  const addRecord=()=>{
    if(!TaxRecord.amount||!TaxRecord.type){
      setErrorMsg('Please fill all the fileds!');
      return
    }
    else{
      fetch('http://192.168.0.103:8000/taxRecord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(TaxRecord),
          fetchRecord
        })
        .then(res=>res.json()).then(
          data=>{
            if(data.error){
          setErrorMsg(data.error);
        }
        else{
          alert("Record added Successfully");
        }
         })
    }
  }
  return (
    <View style={styles.con}>
      <View style={styles.header}>
      <Text style={styles.headertxt}>Tax Records</Text>
      </View>
      {errorMsg ? <View style={{flexDirection:'row',
        marginTop:20}}><Icon style={styles.err} name='alert' size={15}/><Text style={styles.err}>{errorMsg}</Text></View> : null}
      <View><Text style={{marginHorizontal:25,
        marginTop:10,fontWeight:'500',alignSelf:'center',fontSize:15}}>Fill Details about tax here.</Text></View>
<View style={styles.input}>
  <TextInput 
    placeholder='enter amount...'
      keyboardType='number-pad'
      onChangeText={(text) => setTaxRecord({ ...TaxRecord, amount: text })}
        onPressIn={()=>setErrorMsg(null)}
  />
</View>
<View style={styles.input}>
        <TextInput style={{marginLeft:10}}
        placeholder='Type...'
        onChangeText={(text) => setTaxRecord({ ...TaxRecord, type: text })}
        onPressIn={()=>setErrorMsg(null)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={addRecord}><Text style={{color:'white',alignSelf:'center',
      fontWeight:'bold',fontSize:15}}>Add Record</Text></TouchableOpacity>
      <View style={{marginTop:20}}>
      <Text style={{fontSize:20,
      marginLeft:25,
      fontWeight:'bold',
      marginBottom:10,
      fontFamily:'serif'}}>Records List</Text>
      <FlatList 
        pagingEnabled
          data={taxEntries}
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
    </View>
  )
}