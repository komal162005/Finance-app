import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useState, useEffect } from "react";
import styles from "../Styles.style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function Goal({ navigation }) {
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [refreshing, setRefershing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [goalEntries, setGoalEntries] = useState([]);

  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchGoal();
  }, []);

  const fetchGoal = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      const response = await axios.get(`/goal/${userId}`);
      setGoalEntries(response.data);
      setRefershing(false);
    } catch (error) {
      console.error("Error fetching goal data:", error.message);
    }
  };

  const onRefresh = () => {
    setGoalEntries([]);
    fetchGoal();
  };

  const submit = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    console.log(userId);

    const Data = {
      userId,
      amount: amount,
      description: description,
    };
    if (!amount || !description) {
      setErrorMsg("Please fill the field!");
    } else {
      fetch("/goal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
        fetchGoal,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            ToastAndroid.show("Goal created Successfully", ToastAndroid.LONG);
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
        <Text style={styles.headertxt}>Goal Setting</Text>
      </View>
      {refreshing ? <ActivityIndicator /> : null}
      <View>
        {errorMsg ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon style={styles.err} name="alert" size={15} />
            <Text style={styles.err}>{errorMsg}</Text>
          </View>
        ) : null}
        <Text style={styles.txt}>Set your Goal:</Text>
        <View style={styles.input}>
          <FontAwesome
            name="rupee"
            size={18}
            color="black"
            style={{ marginLeft: 10, marginTop: 5 }}
          />
          <TextInput
            style={{ marginLeft: 10 }}
            placeholder="enter goal amount..."
            keyboardType="number-pad"
            value={amount}
            onChangeText={(number) => setAmount(number)}
            onPressIn={() => setErrorMsg(null)}
          />
        </View>
        <View style={styles.input}>
          <MaterialIcons name="short-text" size={24} color="black" />
          <TextInput
            style={{ marginLeft: 10 }}
            placeholder="Description..."
            value={description}
            onChangeText={(text) => setDescription(text)}
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
            Set Goal
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 25,
            fontWeight: "bold",
            fontFamily: "serif",
            marginBottom: 10,
          }}
        >
          created Goal
        </Text>
        <FlatList
          pagingEnabled
          data={goalEntries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListItem bottomDivider style={styles.list}>
              <ListItem.Content>
                <ListItem.Title>
                  {new Date(item.date).toLocaleDateString() +
                    ` - ${item.amount} - ${item.description}  `}
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

export default Goal;
