import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import React from "react";

function Home({ navigation }) {
  const [isLogged, setIsLogged] = useState(false);
  const _retriveData = async () => {
    try {
      const data = await AsyncStorage.getItem("keepLoggedIn");
      setIsLogged(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    _retriveData();
  }, []);

  const submit = () => {
    {
      isLogged ? navigation.navigate("Dash") : navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.con}>
      <Image source={require("../compo/logo.png")} style={styles.image}></Image>
      <Text
        style={{
          fontSize: 35,
          fontWeight: "500",
          alignSelf: "center",
          fontFamily: "serif",
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 5,
          marginTop: 40,
        }}
      >
        Easily manage your Finance
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 30,
          marginRight: 30,
          fontWeight: "300",
          alignSelf: "center",
          fontFamily: "serif",
          marginBottom: 30,
        }}
      >
        Leading you to a better future
      </Text>
      <TouchableOpacity onPress={submit} style={styles.btn}>
        <Text style={styles.txt}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    fontWeight: "800",
    color: "#d62828",
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "black",
    shadowRadius: 20,
  },
  image: {
    marginTop: 80,
    height: "40%",
    width: "100%",
    borderRadius: 40,
  },
  con: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  txt: {
    alignSelf: "center",
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "800",
    marginVertical: 6,
    color: "white",
  },
  btn: {
    marginHorizontal: 18,
    borderWidth: 1,
    marginTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#bc4749",
    borderRadius: 30,
    paddingVertical: 2,
    borderColor: "#bc4749",
    alignItems: "center",
    width: "70%",
    height: "5%",
    alignSelf: "center",
    elevation: 20,
  },
});
