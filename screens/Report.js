import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import styles from "../Styles.style";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "react-native-chart-kit";
import RefreshableFlatList from "react-native-refreshable-flatlist";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Report({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [todayExpense, setTodayExpense] = useState(0);

  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      const response = await axios.get(`/income/${userId}`);
      const response1 = await axios.get(`/expense/${userId}`);
      const incomeData = response.data;
      setIncomeEntries(response.data);
      setExpenses(response1.data);
      setRefreshing(true);
      if (response.status === 200) {
        // Filter income entries for today (assuming your API returns entries with a 'date' field)
        const todayEntries = response.data.filter((entry) =>
          isToday(new Date(entry.date))
        );
        const todayExpEntries = response1.data.filter((entry) =>
          isToday(new Date(entry.date))
        );
        // Calculate the total income for today
        const totalTodayIncome = todayEntries.reduce(
          (total, entry) => total + entry.amount,
          0
        );
        const totalTodayExpense = todayExpEntries.reduce(
          (total, entry) => total + entry.amount,
          0
        );
        setTodayExpense(totalTodayExpense);
        setTodayIncome(totalTodayIncome);
      } else {
        console.error("Error fetching income data:", response.status);
        Alert.alert(
          "Fetch Failed",
          "An error occurred while fetching income data."
        );
      }
    } catch (error) {
      console.error("Error fetching income data:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const renderPieChart = () => {
    if (incomeEntries.length === 0) {
      return <Text>Loading data...</Text>;
    }

    const data = incomeEntries.map((item) => ({
      name: item.source,
      amount: item.amount,
      color: getRandomColor(),
    }));

    return (
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    );
  };

  const renderPieChartExp = () => {
    if (expenses.length === 0) {
      return <Text>Loading data...</Text>;
    }

    const data = expenses.map((item) => ({
      name: item.category,
      amount: item.amount,
      color: getRandomColor(),
    }));

    return (
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    );
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
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
  const totalIncome = calculateTotal(incomeEntries, "income");
  const totalExpenses = calculateTotal(expenses, "expense");
  const balance = totalIncome - totalExpenses;

  return (
    <SafeAreaView style={styles.con}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Ionicons
            style={{ marginHorizontal: 20, marginTop: 15 }}
            name="chevron-back"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.headertxt}> Report</Text>
      </View>
      <ScrollView>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 20,
            marginTop: 10,
            fontWeight: "800",
          }}
        >
          Summury of your Finance.
        </Text>
        <View style={{ marginTop: 20, marginHorizontal: 15 }}>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              marginTop: 10,
              marginBottom: 20,
              marginRight: 10,
            }}
          >
            <View style={styles.section}>
              <ImageBackground
                source={require("../compo/tin.jpg")}
                style={styles.sectionImg}
              >
                <Text style={styles.item}>Total Income {totalIncome} ₹</Text>
              </ImageBackground>
            </View>
            <View style={styles.section}>
              <ImageBackground
                source={require("../compo/tex.jpg")}
                style={styles.sectionImg}
              >
                <Text style={styles.item}>Total Expense {totalExpenses} ₹</Text>
              </ImageBackground>
            </View>
            <View style={styles.section}>
              <ImageBackground
                source={require("../compo/ba.jpg")}
                style={styles.sectionImg}
              >
                <Text style={styles.item}>Balance Amount {balance} ₹</Text>
              </ImageBackground>
            </View>
          </View>
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "800" }}>
            Your Today's Summury.
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginTop: 10,
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            <Text style={styles.item1}>Total Income: {todayIncome}</Text>
            <Text style={styles.item1}>Total Expense: {todayExpense}</Text>
          </View>
          {selectedTab == 0 ? (
            <View style={{ marginTop: 20, marginBottom: 50 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "800",
                  margin: 10,
                  alignSelf: "center",
                }}
              >
                Income Pie Chart
              </Text>
              {renderPieChart()}
            </View>
          ) : (
            <View style={{ marginTop: 20, marginBottom: 50 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "800",
                  margin: 10,
                  alignSelf: "center",
                }}
              >
                Expense Pie Chart
              </Text>
              {renderPieChartExp()}
            </View>
          )}
          <View
            style={{
              width: "100%",
              height: 60,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 5,
              paddingLeft: 5,
              backgroundColor: "white",
              marginBottom: 80,
              elevation: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                height: 50,
                backgroundColor: selectedTab == 0 ? "pink" : "white",
                borderRadius: 15,
                alignItems: "center",
              }}
              onPress={() => setSelectedTab(0)}
            >
              <Text
                style={{
                  color: selectedTab == 0 ? "white" : "black",
                  fontSize: 18,
                  fontWeight: "800",
                }}
              >
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                height: 50,
                backgroundColor: selectedTab == 1 ? "pink" : "white",
                borderRadius: 15,
                alignItems: "center",
              }}
              onPress={() => setSelectedTab(1)}
            >
              <Text
                style={{
                  color: selectedTab == 1 ? "white" : "black",
                  fontSize: 18,
                  fontWeight: "800",
                }}
              >
                Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
