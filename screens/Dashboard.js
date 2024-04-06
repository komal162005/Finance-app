import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Icon from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { Title } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native";

export default function Dashboard({ navigation }) {
  const [users, setData] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    await SecureStore.setItemAsync(
      "newURL",
      "https://finance-app-757u.onrender.com"
    );
    axios
      .get(`https://finance-app-757u.onrender.com/user/${userId}`)
      .then((users) => setData(users.data))
      .catch((err) => console.err(err));
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../compo/dBG.jpg")}
        resizeMode="cover"
        style={{ width: "100%", height: 180 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerTxt}>WELCOME</Text>
          <Icon
            style={styles.TopIcon}
            name="user-circle"
            size={30}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Title>
            {users.map((item) => (
              <View key={item._id} style={styles.item}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    fontFamily: "serif",
                    elevation: 20,
                    color: "white",
                    marginHorizontal: 15,
                  }}
                >
                  {item.fname} !
                </Text>
              </View>
            ))}
          </Title>
        </View>
      </ImageBackground>
      <View
        style={{
          paddingTop: 20,
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          borderRadius: 30,
          elevation: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 40,
            fontSize: 25,
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          Categories
        </Text>
        <View style={styles.IE}>
          <TouchableOpacity
            style={styles.choose}
            onPress={() => navigation.navigate("Income")}
          >
            <ImageBackground
              source={require("../compo/income.png")}
              style={styles.image}
            >
              <Text style={styles.txt}>Income</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choose}
            onPress={() => navigation.navigate("Expense")}
          >
            <ImageBackground
              source={require("../compo/exp.png")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.txt}>Expense</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.IE}>
          <TouchableOpacity
            style={styles.choose}
            onPress={() => navigation.navigate("Goal")}
          >
            <ImageBackground
              source={require("../compo/target.png")}
              style={styles.image}
            >
              <Text style={styles.txt}>Goal</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choose}
            onPress={() => navigation.navigate("Budget")}
          >
            <ImageBackground
              source={require("../compo/budget.png")}
              style={styles.image}
            >
              <Text style={styles.txt}>Budget</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.IE}>
          <TouchableOpacity
            style={styles.choose}
            onPress={() => navigation.navigate("Tax")}
          >
            <ImageBackground
              source={require("../compo/taxre.png")}
              style={styles.image}
            >
              <Text style={styles.txt}>Tax</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
  },
  TopIcon: {
    marginTop: 45,
    marginBottom: 15,
    fontFamily: "serif",
    elevation: 20,
    color: "white",
    marginLeft: 140,
  },
  headerTxt: {
    marginTop: 45,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "serif",
    elevation: 20,
    color: "white",
    marginHorizontal: 15,
  },
  header: {
    flexDirection: "row",
  },
  image: {
    height: "95%",
    width: "95%",
    justifyContent: "flex-start",
    borderRadius: 20,
    alignSelf: "center",
    borderRadius: 30,
  },
  IE: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
    marginHorizontal: 30,
    height: "22%",
    width: "70%",
    justifyContent: "flex-start",
  },
  choose: {
    height: "75%",
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 20,
  },
  txt: {
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 3,
  },
});
