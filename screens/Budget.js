// All the user interface elements
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
// All libraries needed
import * as SecureStore from "expo-secure-store";
import React, { useState, useEffect } from "react";
import styles from "../Styles.style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function Budget({ navigation }) {
  // all the array of variables.
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState(null);
  const [refreshing, setRefershing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [budgetEntries, setBudgetEntries] = useState([]);

  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchBudget();
  }, []);

  // function that interact with backend with api.
  const fetchBudget = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      const response = await axios.get(`/budget/${userId}`);
      setBudgetEntries(response.data);
      setRefershing(false);
    } catch (error) {
      console.error("Error fetching budget data:", error.message);
    }
  };

  const onRefresh = () => {
    setBudgetEntries([]);
    fetchBudget();
  };

  const submit = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    console.log(userId);

    const Data = {
      userId,
      amount: amount,
      type: type,
    };

    if (!amount || !type) {
      setErrorMsg("Please fill all fields!");
    } else {
      fetch("https://finance-app-757u.onrender.com/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          fetchBudget,
        },
        body: JSON.stringify(Data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            ToastAndroid.show("Budget Crated Successfully", ToastAndroid.LONG);
          }
        });
    }
  };
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
        <Text style={styles.headertxt}>Budget Creation</Text>
      </View>
      {refreshing ? <ActivityIndicator /> : null}
      <View>
        {errorMsg ? (
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Icon style={styles.err} name="alert" size={15} />
            <Text style={styles.err}>{errorMsg}</Text>
          </View>
        ) : null}
        <Text style={styles.txt}>Crate your Budget:</Text>
        <View style={styles.input}>
          <FontAwesome
            name="rupee"
            size={18}
            color="black"
            style={{ marginLeft: 10, marginTop: 5 }}
          />
          <TextInput
            style={{ marginLeft: 10 }}
            placeholder="enter budget amount..."
            placeholderTextColor={"grey"}
            keyboardType="number-pad"
            value={amount}
            onChangeText={(Number) => setAmount(Number)}
            onPressIn={() => setErrorMsg(null)}
          />
        </View>
        <View style={styles.input}>
          <Icon
            name="format-list-bulleted-type"
            size={20}
            color="black"
            style={{ marginTop: 4, marginLeft: 5 }}
          />
          <TextInput
            style={{ marginLeft: 10 }}
            placeholder="Budget type..."
            placeholderTextColor={"grey"}
            value={type}
            onChangeText={(text) => setType(text)}
            onPressIn={() => setErrorMsg(null)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Set Budget
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 25,
            fontWeight: "bold",
            color: "black",
            marginBottom: 10,
            fontFamily: "serif",
          }}
        >
          Created Budget
        </Text>
        <FlatList
          pagingEnabled
          data={budgetEntries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem bottomDivider style={styles.list}>
              <ListItem.Content>
                <ListItem.Title>
                  {new Date(item.date).toLocaleDateString() +
                    ` - ${item.amount} - ${item.type}  `}
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

export default Budget;
