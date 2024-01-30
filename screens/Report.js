import { StyleSheet, Text, View,Dimensions,ActivityIndicator,FlatList,Refre, ScrollView,RefreshControl, SafeAreaView } from 'react-native'
import React from 'react';
import styles from '../Styles.style';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';
import RefreshableFlatList from 'react-native-refreshable-flatlist';

export default function Report({navigation}) {
  const [loading, setLoading] = useState(true);
  const [incomeEntries,setIncomeEntries]=useState([]);
  const [expenses,setExpenses]=useState([]);
  const [refreshing, setRefreshing] = useState(false);

  
  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.103:8000/income');
      const response1 = await axios.get('http://192.168.0.103:8000/expense');
      setIncomeEntries(response.data);
      setExpenses(response1.data);
      setRefreshing(true)
    } catch (error) {
      console.error('Error fetching income data:', error.message);
    }
    finally{
      setLoading(false);
      setRefreshing(false)
    }
  };
  
  const renderPieChart = ()=>{

    if (incomeEntries.length === 0) {
      return <Text>Loading data...</Text>;
    }

    const data = incomeEntries.map((item) => ({
      name: item.source,
      amount: item.amount,
      color: getRandomColor(),
    }));  

    return(
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    )
  }

  const renderPieChartExp = ()=>{

    if (expenses.length === 0) {
      return <Text>Loading data...</Text>;
    }

    const data = expenses.map((item) => ({
      name: item.category,
      amount: item.amount,
      color: getRandomColor(),
    }));  

    return(
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    )
  }
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const calculateTotal = (data, type) => {
    return data.reduce((total, item) => total + item.amount, 0);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const totalIncome=calculateTotal(incomeEntries, 'income');
  const totalExpenses=calculateTotal(expenses,'expense');
  const balance=totalIncome-totalExpenses;

  return (
    <View style={styles.con}>
      <View style={styles.header}>
      <Text style={styles.headertxt}>Report</Text>
      </View>
      <Text style={{alignSelf:'center',fontSize:15}}>Income Report </Text>
      <View style={{marginTop:20,marginHorizontal:30,gap:10}}>
      <SafeAreaView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
    }>
    <FlatList
        data={[
          {key: `Total Income :${totalIncome.toFixed(2)}`},
          {key: `Total Expense :${totalExpenses.toFixed(2)}`},
          {key: `Balance amount :${balance.toFixed(2)}`},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />  
       {renderPieChart()}
       {renderPieChartExp()}
    </SafeAreaView>
      </View>
    </View>
    )
}

