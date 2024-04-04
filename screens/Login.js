import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  ToastAndroid,
} from "react-native";
import React, { useState, useContext, createContext } from "react";
import { TextInput } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import Warn from "@expo/vector-icons/Ionicons";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
export const MyContext = createContext();

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const fPass = () => {
    navigation.navigate("forgotP");
  };
  const submit = async () => {
    const Data = {
      email: email,
      password: password,
    };

    if (email === "" || password === "") {
      setErrorMsg("*Please fill all fields!");
      return;
    } else if (!email.includes("@")) {
      setErrorMsg("Please Enter valid character!");
      return;
    } else if (email.includes(" ") || email.includes(" ")) {
      setErrorMsg("Space between character not allowed!");
      return;
    } else {
      try {
        const url = process.env.localhost_url;
        const response = await axios.post(`/signin`, Data, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        // const { token } = await response.data;
        const { userId } = await response.data;
        ToastAndroid.show("Login successfully..", ToastAndroid.LONG);
        navigation.navigate("Dash");
        // await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("userId", userId);
        await SecureStore.setItemAsync("url", "http://192.168.0.103:8000");
        console.log(Data);
        // console.log(token);
        console.log(JSON.stringify(userId));
      } catch (error) {
        setErrorMsg("error occured Please check email and password!");
        console.error(error);
      }
    }
  };

  const [showPassword, setShowPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../compo/lbg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          source={require("../compo/logo1.png")}
          style={{ height: "40%", width: "70%", alignSelf: "center" }}
        />
        <Text style={styles.header}>Welcome!</Text>
        {errorMsg ? (
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Warn style={styles.err} name="warning" size={15} />
            <Text style={styles.err}>{errorMsg}</Text>
          </View>
        ) : null}
        <View style={styles.inputHead}>
          <Text>Email</Text>
          <Icon style={styles.astrik} name="asterisk" size={8} />
        </View>
        <View style={styles.f}>
          <Icons name="gmail" size={20} />
          <TextInput
            style={styles.txtin}
            placeholder="Your email"
            value={email}
            placeholderTextColor={"grey"}
            onPressIn={() => setErrorMsg(null)}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <ScrollView>
          <View style={styles.inputHead}>
            <Text>Password</Text>
            <Icon style={styles.astrik} name="asterisk" size={8} />
          </View>
          <View style={styles.f}>
            <Icon name="lock" size={20} />
            <TextInput
              style={styles.txtin}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Your password"
              placeholderTextColor={"grey"}
              secureTextEntry={!showPassword}
              onPressIn={() => setErrorMsg(null)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                style={styles.Icon}
                size={20}
                name={showPassword ? "eye-slash" : "eye"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={fPass}>
              <Text
                style={{
                  alignSelf: "flex-end",
                  color: "blue",
                  textDecorationLine: "underline",
                  paddingRight: 25,
                }}
              >
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={submit}>
            <Text style={{ color: "white", fontWeight: "bold" }}>LOGIN</Text>
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 10,
              alignSelf: "center",
              marginTop: 15,
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Text>If new user click on </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "blue", textDecorationLine: "underline" }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  astrik: {
    paddingLeft: 5,
    color: "red",
  },
  inputHead: {
    alignSelf: "flex-start",
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: "row",
    fontWeight: "500",
    fontSize: 15,
    marginTop: 10,
  },
  image: {
    flex: 1,
  },
  h2: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 20,
    fontFamily: "sans-serif-condensed",
  },
  btn: {
    marginHorizontal: 25,
    borderWidth: 1,
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: "#9d4edd",
    borderRadius: 10,
    paddingVertical: 6,
    borderColor: "#9d4edd",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    elevation: 20,
  },
  container: {
    flex: 1,
  },
  f: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    paddingHorizontal: 10,
    borderColor: "#9d4edd",
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  Icon: {
    paddingLeft: 140,
  },
  header: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "sans-serif-condensed",
  },
  txtin: {
    marginLeft: 15,
  },
  txt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  err: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 15,
    padding: 10,
  },
});
