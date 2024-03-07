import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Styles from "../Styles.style";
import { ListItem } from "@rneui/themed";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

function Expense({ navigation }) {
  const [refreshing, setRefershing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      const response = await axios.get(`/expense/${userId}`);
      setExpenses(response.data);
      setRefershing(false);
    } catch (error) {
      console.error("Error fetching expense data:", error.message);
    }
  };
  const onRefresh = () => {
    setExpenses([]);
    fetchExpense();
  };

  const submit = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    console.log(userId);

    const Data = {
      userId,
      amount: amount,
      category: category,
    };

    if (!amount || !category) {
      setErrorMsg("Please fill the fields!");
    } else {
      fetch("/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
        fetchExpense,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            ToastAndroid.show("Expense added Successfully", ToastAndroid.LONG);
          }
        });
    }
  };
  return (
    <SafeAreaView style={styles.con}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Ionicons
            style={{ marginHorizontal: 20, marginTop: 15 }}
            name="chevron-back"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <Text style={Styles.headertxt}>Expense Details</Text>
      </View>
      {refreshing ? <ActivityIndicator /> : null}
      <View>
        {errorMsg ? (
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Icon style={styles.err} name="alert" size={15} />
            <Text style={styles.err}>{errorMsg}</Text>
          </View>
        ) : null}
        <Text style={styles.txt}>Add your Expense:</Text>
        <View style={Styles.input}>
          <TextInput
            style={{ marginLeft: 10 }}
            placeholder="enter Expense..."
            keyboardType="number-pad"
            value={amount}
            onChangeText={(number) => setAmount(number)}
            onPressIn={() => setErrorMsg(null)}
          />
        </View>
        <View style={Styles.input}>
          <TextInput
            style={{ marginLeft: 10 }}
            placeholder="Category..."
            value={category}
            onChangeText={(text) => setCategory(text)}
            onPressIn={() => setErrorMsg(null)}
          />
        </View>
        <TouchableOpacity style={Styles.btn} onPress={submit}>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Add Expense
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "serif",
            marginTop: 15,
            marginHorizontal: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Expense List
        </Text>
        <FlatList
          pagingEnabled
          data={expenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem style={Styles.list}>
              <ListItem.Content>
                <ListItem.Title>
                  {new Date(item.date).toLocaleDateString() +
                    ` - ${item.amount} - ${item.category}  `}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default Expense;

const styles = StyleSheet.create({
  con: {
    height: "100%",
  },
  txt: {
    fontSize: 20,
    fontWeight: "800",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 30,
  },
  input: {
    alignSelf: "flex-start",
    marginHorizontal: 25,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#06d6a0",
    paddingVertical: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    width: "80%",
    flexDirection: "row",
  },
  btn: {
    backgroundColor: "#06d6a0",
    alignSelf: "flex-start",
    marginHorizontal: 25,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    borderRadius: 10,
    width: "80%",
    borderColor: "#06d6a0",
    height: "25%",
  },
  err: {
    color: "blue",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 15,
    fontFamily: "serif",
    fontWeight: "bold",
    backgroundColor: "red",
    alignSelf: "center",
  },
});
