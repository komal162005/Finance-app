import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Pressable,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import "react-native-get-random-values";
import * as SecureStore from "expo-secure-store";
import Icon from "@expo/vector-icons/AntDesign";

export default function EditProfileScreen({ navigation }) {
  const [image, setImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const [users, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const ImageUri = image;
  const [email, setEmail] = useState("");
  const [address, setAdd] = useState(null);
  const [fname, setFname] = useState("");
  const [mobileNo, setMobileNo] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access camera roll denied");
      }

      // Retrieve the stored profile picture URI from AsyncStorage
      try {
        const userId = await SecureStore.getItemAsync("userId");
        const storedImage = await AsyncStorage.getItem(
          `selectedImage_${userId}`
        );
        if (storedImage) {
          setImage(storedImage);
        }
      } catch (error) {
        console.error("Error retrieving profile picture:", error.message);
      }
    })();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    axios
      .get(`/user/${userId}`)
      .then((users) => setData(users.data))
      .catch((err) => console.error(err));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      const userId = await SecureStore.getItemAsync("userId");
      setImage(result.assets[0].uri);
      setModalVisible(!modalVisible);
      // Save the image URI to AsyncStorage
      await AsyncStorage.setItem(`selectedImage_${userId}`, result.uri);
      console.log("Image URI saved to AsyncStorage:", result.uri);
    }
    console.log(image);
    console.log(ImageUri);
  };

  const saveData = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    const url = await SecureStore.getItemAsync("URL");
    console.log(url);
    const Data = {
      userId,
      fname: fname,
      mobileNo: mobileNo,
      email: email,
      address: address,
    };
    if (mobileNo.length !== 10) {
      setErrorMsg("Please enter valid mobile number!!");
      return;
    } else if (!fname || !mobileNo || !address) {
      setErrorMsg("Please all fields!!");
      return;
    } else {
      const localhost = url + "/update";
      console.log(localhost);
      fetch(`${localhost}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            ToastAndroid.show(
              "your inforamtion updated successfully",
              ToastAndroid.LONG
            );
            navigation.navigate("Profile");
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.imagep} />}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="camera-outline" size={20} />
          </TouchableOpacity>
        </TouchableOpacity>
        {users.map((item) => (
          <View key={item._id} style={{ margin: 10 }}>
            <Text style={{ fontSize: 20 }}>{item.fname}</Text>
          </View>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Upload profiel picture</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <MaterialCommunityIcons name="camera-outline" size={24} />
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={pickImage}
              >
                <MaterialIcons name="photo-library" size={24} color="black" />
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <MaterialCommunityIcons name="cancel" size={24} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          value={fname}
          placeholder="Full Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          onPressIn={() => setErrorMsg(null)}
          onChangeText={(text) => setFname(text)}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <Feather name="phone" color={colors.text} size={20} />
        <TextInput
          value={mobileNo}
          placeholder="Phone"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          onPressIn={() => setErrorMsg(null)}
          autoCorrect={false}
          onChangeText={(number) => setMobileNo(number)}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="envelope-o" color={colors.text} size={20} />
        {users.map((item) => (
          <View key={item._id}>
            <Text
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  fontSize: 15,
                },
              ]}
            >
              {item.email}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.action}>
        <MaterialCommunityIcons
          name="map-marker-circle"
          color={colors.text}
          size={20}
        />
        <TextInput
          value={address}
          placeholder="Address"
          placeholderTextColor="#666666"
          autoCorrect={false}
          onPressIn={() => setErrorMsg(null)}
          onChangeText={(text) => setAdd(text)}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      {errorMsg ? (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Icon style={styles.err} name="warning" size={15} />
          <Text style={styles.err}>{errorMsg}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.commandButton} onPress={() => saveData()}>
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  err: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  commandButton: {
    borderWidth: 1,
    marginTop: 30,
    backgroundColor: "#9d4edd",
    borderRadius: 10,
    paddingVertical: 6,
    borderColor: "#9d4edd",
    alignItems: "center",
    alignSelf: "center",
    width: 150,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  imagep: {
    borderRadius: 75,
    width: 120,
    height: 120,
    borderColor: "pink",
    borderWidth: 0,
  },
  editBtn: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 8,
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#dedbd2",
    borderRadius: 10,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginHorizontal: 30,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
