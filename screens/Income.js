import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image,FlatList, ScrollView, SafeAreaView,RefreshControl, ActivityIndicator} from 'react-native'
import React from 'react';
import { useState,useEffect } from 'react';
import  Icon  from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { ListItem } from '@rneui/themed';
import Styles from '../Styles.style';

function Income()  {
  const [newIncome, setNewIncome] = useState({ amount: '', source: ''});
  const [refreshing,setRefershing]=useState(false);
  const [incomeEntries,setIncomeEntries]=useState([]);
  const[errorMsg,setErrorMsg]=useState('');
  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const response = await axios.get('http://192.168.0.103:8000/income');
      setIncomeEntries(response.data);
      setRefershing(false)
    } catch (error) {
      console.error('Error fetching income data:', error.message);
    }
  }

  const onRefresh = () =>{
    setIncomeEntries([]);
    fetchIncome();
  }
  const submit = async () => {
    if(!newIncome.amount||!newIncome.source){
setErrorMsg('Please fill all fields!')
    }
    else{
      fetch('http://192.168.0.103:8000/income', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newIncome),
          fetchIncome
        })
        .then(res=>res.json()).then(
          data=>{
            if(data.error){
          setErrorMsg(data.error);
        }
        else{
          alert("Income added Successfully");
        }
         })
    }
    console.log(newIncome)
  };
  return (
    <SafeAreaView style={styles.con}>
      <View style={Styles.header}>
      <Text style={Styles.headertxt}>Income Details</Text>
      </View>
      {refreshing ? <ActivityIndicator/>:null}
      <View>
      {errorMsg ? <View style={{flexDirection:'row',
        marginTop:20}}><Icon style={styles.err} name='alert' size={15}/><Text style={styles.err}>{errorMsg}</Text></View> : null}
      <Text style={styles.txt}>Add your Income:</Text>
      <View style={styles.input}>
      <TextInput style={{marginLeft:10}}
      placeholder='enter income...'
      keyboardType='number-pad'
      onChangeText={(number) => setNewIncome({ ...newIncome, amount:number })}
onPressIn={()=>setErrorMsg(null)}
      />
      </View>
      <View style={styles.input}>
        <TextInput style={{marginLeft:10}}
        placeholder='Source...'
        onChangeText={(text) => setNewIncome({ ...newIncome, source: text })}
        onPressIn={()=>setErrorMsg(null)}
        />
      </View>
      <TouchableOpacity style={Styles.btn} onPress={submit}><Text style={{color:'white',alignSelf:'center',
      fontWeight:'bold',fontSize:15}}>Add Income</Text></TouchableOpacity>
      </View>  
      <View style={{marginTop:20}}>
      <Text style={{fontSize:20,
      marginLeft:25,
      fontWeight:'bold',
      marginBottom:10,
      fontFamily:'serif'}}>Income List</Text>
        <FlatList 
        pagingEnabled
          data={incomeEntries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem bottomDivider style={styles.list}>
              <ListItem.Content >
                <ListItem.Title>{new Date(item.date).toLocaleDateString()+` - ${item.amount} - ${item.source}  `}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
          refreshControl={<RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
          />}
        />
      </View>
    </SafeAreaView>
  )
}

export default Income

const styles = StyleSheet.create({
con:{
  height:'100%'
  },
txt:{
  fontSize:20,
  fontWeight:'800',
  alignSelf:'flex-start',
  marginLeft:30,
  marginTop:20,
  
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
    padding: 10,
},
list:{
  marginBottom:1,
  borderRadius:20,
  marginHorizontal:25,
  paddingHorizontal:10,
  paddingVertical:6,
  
  }
})