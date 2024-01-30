import { Email } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native'; 
const Register = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    fname: '',
    email: '',
    password: '',
    address:'',
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const submit = () => {
    if (!fdata.fname || !fdata.email || !fdata.password ) {
      setErrorMsg('All fields are required!');
      return;
    } else {
      if (fdata.password !== fdata.ConfirmPassword) {
        setErrorMsg('Password and Confirm must be the same!');
        return;
      } 
      else {
        fetch('http://192.168.0.105:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        })
        .then(res=>res.json()).then(
          data=>{
            if(data.error){
          setErrorMsg(data.error);
        }
        else{
          alert("Account created Successfully");
          navigation.navigate("Login");
        }
         })
      console.log(fdata);
    }
      
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../compo/bg.jpg')} resizeMode='cover' style={styles.image}>
        <Text style={styles.title}>Sign Up</Text>
        {errorMsg ? <Text style={styles.err}>{errorMsg}</Text> : null}
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            onChangeText={(text) => setFdata({ ...fdata, fname: text })}
            onPressIn={() => setErrorMsg(null)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            onChangeText={(text) => setFdata({ ...fdata, email: text })}
            onPressIn={() => setErrorMsg(null)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(text) => setFdata({ ...fdata, password: text })}
            onPressIn={() => setErrorMsg(null)}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(text) => setFdata({ ...fdata, ConfirmPassword: text })}
            onPressIn={() => setErrorMsg(null)}
          />
          <TextInput
          multiline={true}
          numberOfLines={5}
            style={styles.input}
            placeholder="Address"
            onChangeText={(text) => setFdata({ ...fdata, address: text })}
            onPressIn={() => setErrorMsg(null)}
          />
          <TouchableOpacity onPress={() => submit()} style={styles.btn}>
            <Text style={{color:'white',fontWeight:'bold'}}>REGISTER</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  err: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 40,
    fontFamily: 'sans-serif-condensed',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#9d4edd',
  },
  link: {
    color: 'blue',
  },
  btn: {
    marginHorizontal: 25,
    borderWidth: 1,
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#9d4edd',
    borderRadius: 10,
    paddingVertical: 6,
    borderColor: '#9d4edd',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
});

export default Register;
