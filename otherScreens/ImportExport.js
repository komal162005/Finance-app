import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import XLSX from "xlsx";
import axios from "axios";
import styles from "../Styles.style";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import Icon from "@expo/vector-icons/Ionicons";
import { ToggleButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";

const Data = [
  { label: "Income", value: "1" },
  { label: "Expense", value: "2" },
  { label: "Goal", value: "3" },
  { label: "Budget", value: "4" },
  { label: "Tax Record", value: "5" },
];

export default function ImportExport({ navigation }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const exportDataToCsv = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    const url = await SecureStore.getItemAsync("newURL");
    console.log(url);
    if (value == "1") {
      const localhost = url + `/income/${userId}`;
      console.log(JSON.stringify(localhost));
      console.log(url);
      const response = await axios.get(`/income/${userId}`);
      setData(response.data);
      console.log(response.data);
      const fileName = "IncomeInfo.csv";
      const result = await FileSystem.downloadAsync(
        `${localhost}`,
        FileSystem.documentDirectory + fileName
      );
      console.log(result);
      save(result.uri, fileName);
      console.log("You selected income to export");
    } else if (value == "2") {
      const response = await axios.get(`/expense/${userId}`);
      const localhost = url + `/expense/${userId}`;
      setData(response.data);
      console.log(response.data);
      const fileName = "Expense.json";
      const result = await FileSystem.downloadAsync(
        `${localhost}`,
        FileSystem.documentDirectory + fileName
      );
      console.log(result);
      save(result.uri, fileName, result.headers["Content-Type"]);
      console.log("You selected expense to export");
    } else if (value == "3") {
      const response = await axios.get(`/goal/${userId}`);
      const localhost = url + `/goal/${userId}`;
      setData(response.data);
      console.log(response.data);
      const fileName = "Goal.csv";
      const result = await FileSystem.downloadAsync(
        `${localhost}`,
        FileSystem.documentDirectory + fileName
      );
      console.log(result);
      save(result.uri, fileName, result.headers["Content-Type"]);
      console.log("You selected goal to export");
    } else if (value == "4") {
      const response = await axios.get(`/budget/${userId}`);
      const localhost = url + `/budget/${userId}`;
      setData(response.data);
      console.log(response.data);
      const fileName = "Budget.csv";
      const result = await FileSystem.downloadAsync(
        `${localhost}`,
        FileSystem.documentDirectory + fileName
      );
      console.log(result);
      save(result.uri, fileName, result.headers["Content-Type"]);
      console.log("You selected budget to export");
    } else {
      const response = await axios.get("/taxRecord");
      const localhost = url + `/taxRecord/${userId}`;
      setData(response.data);
      console.log(response.data);
      const fileName = "TaxRecord.csv";
      const result = await FileSystem.downloadAsync(
        `${localhost}`,
        FileSystem.documentDirectory + fileName
      );
      console.log(result);
      save(result.uri, fileName);
      console.log("You selected Tax record to export");
    }
  };
  const save = async (uri, fileName) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert("Download Completed", "File downloaded successfully.");
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
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
        <Text style={styles.headertxt}> Export</Text>
      </View>
      <View
        style={{ flexDirection: "row", marginHorizontal: 25, marginTop: 20 }}
      >
        <Text
          style={{
            fontWeight: "600",
            marginBottom: 10,
            fontSize: 20,
            marginEnd: 10,
          }}
        >
          Export File
        </Text>
        <Icon name="document" size={20} />
      </View>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="folder1"
            size={20}
          />
        )}
      />
      <Text style={{ marginHorizontal: 25 }}>
        Click on button and choose where you want to export file
      </Text>
      <TouchableOpacity style={styles.btn} onPress={exportDataToCsv}>
        <Text>Download</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('backup')}><Text>Download</Text></TouchableOpacity> */}
    </View>
  );
}
