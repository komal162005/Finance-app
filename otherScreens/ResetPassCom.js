import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";
import Icons from "@expo/vector-icons/MaterialIcons";
function ResetPassCom({ navigation }) {
  const [vcode, setVCode] = useState(null);
  const [pass, setPass] = useState(null);
  const [CPass, setCPass] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const route = useRoute();
  const { email } = route.params;
  const submit = async () => {
    try {
      const Data = {
        email: email,
        VerificationCode: vcode,
        password: pass,
      };
      if (pass !== CPass) {
        setErrorMsg("Password and confirm password must be same!");
        return;
      } else if (!vcode || !pass || !CPass) {
        setErrorMsg("All fields are required!");
      } else {
        await axios
          .post("/resetPasswordConfirm", Data, {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Data),
          })
          .then((data) => {
            if (data.error) {
              setErrorMsg(data.error);
            } else {
              ToastAndroid.show(
                "Password reset successfully",
                ToastAndroid.LONG
              );
              navigation.navigate("Login");
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.con}>
      <Image
        source={require("../compo/respass1.png")}
        style={{
          marginTop: 20,
          height: "40%",
          width: "80%",
          alignSelf: "center",
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          marginTop: 10,
          alignSelf: "center",
          fontSize: 25,
          fontFamily: "serif",
          marginBottom: 5,
        }}
      >
        Reset Password
      </Text>
      <Text style={{ margin: 15 }}>
        Your reset password Verification code is send on{" "}
        <Text style={{ color: "blue" }}>{email}</Text>
      </Text>
      <View style={styles.in}>
        <Icons name="security" size={15} style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Verification Code"
          value={vcode}
          onChangeText={(text) => setVCode(text)}
        />
      </View>
      <View style={styles.in}>
        <Icon name="lock" size={15} style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Password"
          value={pass}
          secureTextEntry={true}
          onPressIn={() => setErrorMsg(null)}
          onChangeText={(text) => setPass(text)}
        />
      </View>
      <View style={styles.in}>
        <Icon name="lock" size={15} style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Confirm Password"
          value={CPass}
          onPressIn={() => setErrorMsg(null)}
          secureTextEntry={true}
          onChangeText={(text) => setCPass(text)}
        />
      </View>
      {errorMsg ? (
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Icon style={styles.err} name="warning" size={15} />
          <Text style={styles.err}>{errorMsg}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.btn} onPress={submit}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ResetPassCom;
const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: "white",
  },
  err: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 15,
    padding: 10,
  },
  in: {
    margin: 15,
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#ffbe0b",
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    margin: 20,
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffbe0b",
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
    height: 35,
  },
});
