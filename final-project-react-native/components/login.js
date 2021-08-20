import IPAddress from './backend';
import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
} from "react-native";
// import Icon from "react-native-vector-icons/Fontisto";
import Icon from "react-native-vector-icons/Entypo";
import { Input, Button, Header } from "react-native-elements";
import axios from "axios";
import { Alert } from "react-native";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [state, setState] = useState({
        email: "",
        password: "",

    });

    const setEmail = (email) => {
        setState({ ...state, email: email });
    };
    const setPassword = (password) => {
        setState({ ...state, password: password });
    };

    const SignUpNav = () => {
        navigation.navigate("signUp");
    };

    const LoginHandler = () => {


        axios.post("http://localhost:3000/auth/login/", { ...state }).then(({ data }) => {
            let location;
            if (data.status === "success") {

                const setStorage = async (data) => {
                    try {
                        await AsyncStorage.setItem('@storage_Key', data.token)
                    } catch (error) {
                        // saving error
                    }
                };

                setStorage();



                const getLocation = async () => {

                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        setErrorMsg('Permission to access location was denied');
                        return;
                    }

                    location = await Location.getCurrentPositionAsync({});
                    const reverseLocation = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude })
                    return postalCode = reverseLocation.find(property => {
                        let zipcode;
                        zipcode = property.postalCode
                        return zipcode;
                    })
                }
                let postalCode = getLocation();

                if (postalCode = '52557') {
                    navigation.navigate("home");
                }
            } else {
                // setState({
                //     email: "",
                //     password: "",
                // });
                Alert.alert("Login was unsuccessful");
            }
        })
    }






    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <Header
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{
                        text: "MIU CSR App",
                        style: { color: "#fff" },
                    }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                />


                <Input
                    placeholder='email'
                    leftIcon={{ type: "fontisto", name: "email" }}
                    label='Your Email Address'
                    onChangeText={(email) => {
                        setEmail(email);
                    }}
                    value={state.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder='password'
                    leftIcon={{ type: "entypo", name: "lock" }}
                    label='Your Password'
                    onChangeText={(password) => {
                        setPassword(password);
                    }}
                    value={state.password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <Text>
                    <Button onPress={() => LoginHandler()} title='Login' />
                    <Text> </Text>
                    <Button onPress={SignUpNav} title='Sign Up' />
                </Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}




export default Login;