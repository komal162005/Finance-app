import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Button,Image } from 'react-native'
import {Avatar,Title,Caption,TouchableRipple} from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ImagePicker from 'react-native-image-picker';

export default function Profile({navigation}) {
  // const [imageUri, setImageUri] = useState(null);

  const [users,setData]=useState([]);
  useEffect(()=>{
    axios.get('http://192.168.0.103:8000/user')
    .then(users=>setData(users.data))
    .catch(err=>console.err(err))
  },[]);

  // const openImagePicker = () => {
  //   const options = {
  //     title: 'Select Avatar',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error:', response.error);
  //     } else {
  //       const uri = response.uri;
  //       setImageUri(uri);
  //     }
  //   });
  // };

  // const uploadImage = async () => {
  //   try {
  //     if (!imageUri) {
  //       console.log('Please select an image first');
  //       return;
  //     }

  //     // Upload the image to your server and get the image URL
  //     const formData = new FormData();
  //     formData.append('profileImage', {
  //       uri: imageUri,
  //       type: 'image/jpeg',
  //       name: 'profile.jpg',
  //     });

  //     const response = await axios.post('http://192.168.0.102:8000/upload', formData);

  //     // Assuming your server responds with the image URL
  //     const imageUrl = response.data.imageUrl;
  //     console.log('Image URL:', imageUrl);

  //     // Now you can save the imageUrl in MongoDB or use it as needed
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  const submit=()=>{
    AsyncStorage.setItem('keepLoggedIn','');
    navigation.navigate('Login');
  }

return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
      <View style={{width:'100%',alignItems:'center', marginTop: 50,borderBottomColor:'black',borderBottomWidth:1,marginBottom:30,}}>
        <Avatar.Image 
        source={{
          uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        }}
        size={120}
        />
        {/* <View>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Select Image" onPress={openImagePicker} />
      <Button title="Upload Image" onPress={uploadImage} />
        </View> */}
        <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
              fontFamily:'serif',
              fontSize:20
            }]}>{users.map(item => (
          <View key={item._id} style={styles.item}>
            <Text style={{color:"white",alignSelf:'center',fontFamily:'serif',
              fontSize:15}}>{item.fname}</Text>
          </View>
        ))}</Title>
      </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="white" size={20}/>
          {users.map(item => (
          <View key={item._id} style={styles.item}>
            <Text style={{color:"white", marginLeft: 20}}>{item.address}</Text>
          </View>
        ))}
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="white" size={20}/>
          <Text style={{color:"white", marginLeft: 20}}>+91-900000009</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="white" size={20}/>
          {users.map(item => (
          <View key={item._id} style={styles.item}>
            <Text style={{color:"white", marginLeft: 20}}>{item.email}</Text>
          </View>
        ))}
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Saving</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Total Expense</Caption>
          </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={submit}><Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>LOG-OUT</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#9d4edd'
  },
  userInfo:{
    paddingHorizontal: 30,
    marginBottom:30
  },
  row:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    backgroundColor:'#06d6a0',
  alignSelf:'center',
  marginHorizontal:25,
  marginTop:80,
  paddingHorizontal:10,
  paddingVertical:6,
  marginBottom:10,
  borderRadius:10,
  width:'50%',
  borderColor:'#06d6a0',
  justifyContent:'center'
  }
  
})