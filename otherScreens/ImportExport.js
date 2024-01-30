import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import styles from '../Styles.style';
import * as Sharing from 'expo-sharing'
const SaveAndDownloadMongoDBData = () => {
  const [downloadedData, setDownloadedData] = useState([]);

  const fetchDataFromMongoDB = async () => {
    try {
      // Replace 'https://your-mongodb-api-endpoint/data' with your MongoDB API endpoint
      const response = await axios.get('http://192.168.0.103:8000/income');

      // Save the data to a file
      await saveDataToFile(response.data);

      // Set the downloaded data state for display
      setDownloadedData(response.data);

      Alert.alert('Save and Download Successful', 'Data saved to and downloaded from file.');
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error.message);
      Alert.alert('Fetch Failed', 'An error occurred while fetching data from MongoDB.');
    }
  };

  const saveDataToFile = async (data) => {
    try {
      const fileName = 'mongodb_data.txt';
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Save the data to a file in the app's document directory
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2), {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (error) {
      console.error('Error saving data to file:', error.message);
      Alert.alert('Save Failed', 'An error occurred while saving data to file.');
    }
  };

  const downloadFile = async () => {
    try {
      const fileName = 'mongodb_data.txt';
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Read the contents of the saved file
      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Set the downloaded data state for display
      setDownloadedData(fileData);
      await Sharing.shareAsync(fileUri, { mimeType: 'application/json', dialogTitle: 'Downloaded MongoDB Data' });
      Alert.alert('Download Successful', `Data downloaded from file.${fileUri}`);
    } catch (error) {
      console.error('Error downloading file:', error.message);
      Alert.alert('Download Failed', 'An error occurred while downloading data.');
    }
  };

  return (
    <View style={styles.con}>
    <View style={styles.header}><Text style={styles.headertxt}>Save and Download MongoDB Data</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={fetchDataFromMongoDB}><Text>Fetch Data</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={downloadFile}><Text>Download File</Text></TouchableOpacity>
      {downloadedData ? (
        <View>
          <Text>Downloaded Data:</Text>
          <Text>{downloadedData}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default SaveAndDownloadMongoDBData;
