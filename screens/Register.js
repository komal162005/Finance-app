import React, { useContext, useState } from "react";
import Icon from "@expo/vector-icons/AntDesign";
import Icons from "@expo/vector-icons/FontAwesome";
import Icon1 from "@expo/vector-icons/MaterialCommunityIcons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
const Register = async ({ naviagtion }) => {
  const userId = uuidv4();
  const [fdata, setFdata] = useState({
    userId: userId,
    fname: "",
    email: "",
    password: "",
    address: "",
    mobileNo: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const submit = () => {
    if (!fdata.fname || !fdata.email || !fdata.password) {
      setErrorMsg("All fields are required!");
      return;
    } else {
      if (fdata.password !== fdata.ConfirmPassword) {
        setErrorMsg("Password and Confirm must be the same!");
        return;
      } else if (fdata.password.length > 8) {
        setErrorMsg("Password must be at least 8 characters!!");
        return;
      } else if (!fdata.email.includes("@")) {
        setErrorMsg("Please enter valid email!");
        return;
      } else {
        fetch("http://192.168.0.103:8000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fdata),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setErrorMsg(data.error);
            } else {
              ToastAndroid.show(
                "user registered successfully",
                ToastAndroid.LONG
              );
              naviagtion.navigate("Login");
            }
          });
        console.log(fdata);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../compo/lbg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>Sign Up</Text>
        {errorMsg ? (
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Icon style={styles.err} name="warning" size={15} />
            <Text style={styles.err}>{errorMsg}</Text>
          </View>
        ) : null}
        <View style={styles.wrapper}>
          <View style={styles.inputHead}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Name</Text>
            <FontAwesome5 name="asterisk" size={8} style={styles.astrik} />
          </View>
          <View style={styles.input}>
            <Icon name="user" size={17} color={"#9d4edd"} />
            <TextInput
              style={styles.f}
              placeholder="Enter Name"
              onChangeText={(text) => setFdata({ ...fdata, fname: text })}
              onPressIn={() => setErrorMsg(null)}
            />
          </View>
          <View style={styles.inputHead}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Email Address
            </Text>
            <FontAwesome5 name="asterisk" size={8} style={styles.astrik} />
          </View>
          <View style={styles.input}>
            <Icon name="mail" size={17} color={"#9d4edd"} />
            <TextInput
              style={styles.f}
              placeholder="Enter email"
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
              onPressIn={() => setErrorMsg(null)}
            />
          </View>
          <View style={styles.inputHead}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Contact Number
            </Text>
            <FontAwesome5 name="asterisk" size={8} style={styles.astrik} />
          </View>
          <View style={styles.input}>
            <Icon name="phone" size={17} color={"#9d4edd"} />
            <TextInput
              style={styles.f}
              placeholder="Enter contact number"
              onChangeText={(text) => setFdata({ ...fdata, mobileNo: text })}
              onPressIn={() => setErrorMsg(null)}
            />
          </View>
          <View style={styles.inputHead}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Password</Text>
            <FontAwesome5 name="asterisk" size={8} style={styles.astrik} />
          </View>
          <View style={styles.input}>
            <Icons name="lock" size={17} color={"#9d4edd"} />
            <TextInput
              style={styles.f}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              onPressIn={() => setErrorMsg(null)}
            />
          </View>
          <View style={styles.inputHead}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Confirm Password
            </Text>
            <FontAwesome5 name="asterisk" size={8} style={styles.astrik} />
          </View>
          <View style={styles.input}>
            <Icons name="lock" size={17} color={"#9d4edd"} />
            <TextInput
              style={styles.f}
              placeholder="Confirm password"
              secureTextEntry={true}
              onChangeText={(text) =>
                setFdata({ ...fdata, ConfirmPassword: text })
              }
              onPressIn={() => setErrorMsg(null)}
            />
          </View>
          <View style={styles.inputHead}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Address</Text>
            <FontAwesome5 name="asterisk" size={8} style={styles.astrik} />
          </View>
          <View style={styles.input}>
            <Icon1 name="map-marker-circle" size={17} color={"#9d4edd"} />
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={styles.f}
              placeholder="Address"
              onChangeText={(text) => setFdata({ ...fdata, address: text })}
              onPressIn={() => setErrorMsg(null)}
            />
          </View>
          <TouchableOpacity onPress={() => submit()} style={styles.btn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>REGISTER</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login", { userId })}
            >
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  astrik: {
    paddingLeft: 5,
    color: "red",
  },
  inputHead: {
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    fontWeight: "500",
    marginBottom: 5,
  },
  err: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    padding: 10,
  },
  f: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
    fontFamily: "sans-serif-condensed",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#9d4edd",
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    color: "blue",
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
    width: "100%",
    alignSelf: "center",
  },
});

export default Register;
