import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Profile({ navigation }) {
  const [users, setData] = useState([]);
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseCount, setExpenseCount] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access camera roll denied");
      }
      try {
        const userId = await SecureStore.getItemAsync("userId");
        const storedImage = await AsyncStorage.getItem(
          `selectedImage_${userId}`
        );
        if (storedImage) {
          setImage(storedImage);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  const fetchData = async () => {
    const userId = await SecureStore.getItemAsync("userId");

    const response = await axios.get(`/income/${userId}`);
    setIncomeEntries(response.data);
    const TotalExpensesCount = response.data.length;
    setExpenseCount(TotalExpensesCount);
  };
  const fetchUser = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    const res = axios
      .get(`/user/${userId}`)
      .then((users) => setData(users.data))
      .catch((err) => console.err(err));
    // setImageUri(res.data.image);
  };
  const calculateTotal = (data, type) => {
    return data.reduce((total, item) => total + item.amount, 0);
  };
  const totalIncome = calculateTotal(incomeEntries, "income");

  const submit = () => {
    AsyncStorage.setItem("keepLoggedIn", "");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{ alignContent: "center", alignItems: "center" }}>
          {image && <Image source={{ uri: image }} style={styles.imagep} />}
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 10,
                  marginBottom: 5,
                  alignItems: "center",
                },
              ]}
            >
              {users.map((item) => (
                <View key={item._id} style={styles.item}>
                  <Text style={{ fontSize: 30 }}>{item.fname}</Text>
                </View>
              ))}
            </Title>
          </View>
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="black" size={20} />
          {users.map((item) => (
            <View key={item._id} style={styles.item}>
              <Text style={{ color: "black", marginLeft: 20 }}>
                {item.address}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Icon name="email" color="black" size={20} />
          {users.map((item) => (
            <View key={item._id} style={styles.item}>
              <Text style={{ color: "black", marginLeft: 20 }}>
                {item.email}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="black" size={20} />
          {users.map((item) => (
            <View key={item._id} style={styles.item}>
              <Text style={{ color: "black", marginLeft: 20 }}>
                {item.mobileNo}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>₹{totalIncome}</Title>
          <Caption>Saving</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{expenseCount}</Title>
          <Caption>Total Expense</Caption>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={submit}>
        <Text
          style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}
        >
          LOG-OUT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfo: {
    paddingHorizontal: 30,
    marginBottom: 30,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#06d6a0",
    alignSelf: "center",
    marginHorizontal: 25,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    borderRadius: 10,
    width: "50%",
    borderColor: "#06d6a0",
    justifyContent: "center",
  },
  imagep: {
    borderRadius: 75,
    width: 170,
    height: 170,
    borderColor: "grey",
    borderWidth: 0,
    borderWidth: 3,
  },
  editBtn: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 8,
    position: "absolute",
    right: 5,
    bottom: 5,
  },
});
