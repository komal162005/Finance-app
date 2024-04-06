import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SectionList,
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

export default function TaxR({ navigation }) {
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState(null);
  const [refreshing, setRefershing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [taxEntries, setTaxEntries] = useState([]);

  useEffect(() => {
    // Fetch all income entries when the component mounts
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");

      const response = await axios.get(`/taxRecord/${userId}`);
      setTaxEntries(response.data);
      setRefershing(false);
    } catch (error) {
      console.error("Error fetching Tax data:", error.message);
    }
  };

  const onRefresh = () => {
    setTaxEntries([]);
    fetchRecord();
  };

  const addRecord = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    console.log(userId);

    const Data = {
      userId,
      amount: amount,
      type: type,
    };
    if (!amount || !type) {
      setErrorMsg("Please fill all the fileds!");
      return;
    } else {
      fetch("https://finance-app-757u.onrender.com/taxRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
        fetchRecord,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            ToastAndroid.show("Record added Successfully", ToastAndroid.LONG);
          }
        });
    }
  };
  return (
    <View style={styles.con}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Ionicons
            style={{ marginHorizontal: 20, marginTop: 15 }}
            name="chevron-back"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Tax Records</Text>
      </View>
      {errorMsg ? (
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Icon style={styles.err} name="alert" size={15} />
          <Text style={styles.err}>{errorMsg}</Text>
        </View>
      ) : null}
      {refreshing ? <ActivityIndicator /> : null}
      <View>
        <Text
          style={{
            marginHorizontal: 25,
            marginTop: 10,
            fontWeight: "500",
            alignSelf: "center",
            fontSize: 15,
          }}
        >
          Fill Details about tax here.
        </Text>
      </View>
      <View style={styles.input}>
        <FontAwesome
          name="rupee"
          size={18}
          color="black"
          style={{ marginLeft: 10, marginTop: 5, marginRight: 5 }}
        />
        <TextInput
          placeholder="enter amount..."
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
          placeholder="Type..."
          value={type}
          onChangeText={(text) => setType(text)}
          onPressIn={() => setErrorMsg(null)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={addRecord}>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Add Record
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 25,
            fontWeight: "bold",
            marginBottom: 10,
            fontFamily: "serif",
          }}
        >
          Records List
        </Text>
        <FlatList
          pagingEnabled
          data={taxEntries}
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
    </View>
  );
}
