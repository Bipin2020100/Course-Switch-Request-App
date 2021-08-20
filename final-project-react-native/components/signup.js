import IPAddress from './backend'
import React, { useState } from 'react'
import { Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, Keyboard, TouchableOpacity, Alert } from 'react-native'
// import Icon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Entypo';
import { Input, Button, Header } from 'react-native-elements';
import axios from 'axios'


const SignUp = ({ navigation }) => {

    const [state, setState] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        currentcourse: ''
    })

    const setEmail = (email) => {
        setState({ ...state, email: email })
    }
    const setPassword = (password) => {
        setState({ ...state, password: password })
    }
    const setFirstname = (firstname) => {
        setState({ ...state, firstname: firstname })
    }
    const setLastname = (lastname) => {
        setState({ ...state, lastname: lastname })
    }
    const setCurrentcourse = (currentcourse) => {
        setState({ ...state, currentcourse: currentcourse })
    }
    const Submit = () => {
        console.log({ state })
        axios.post("http://localhost:3000/auth/signup", { ...state })
            // .then(response => response.json())
            .then(({ data }) => {
                // console.log(response.data)
                if (data.status == "success" || data.status == "already_added" || data.status == "error") {
                    Alert.alert("Successful sign up")
                    navigation.navigate('loginPage');
                }
                else {
                    // setState({
                    //     email: '',
                    //     password: '',
                    //     firstname: '',
                    //     lastname: '',
                    //     currentcourse: ''
                    // })
                    Alert.alert("Try signup again")
                }
            })

    }


    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <Header
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MIU CSR App', style: { color: '#fff' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <Input
                    placeholder='first name'
                    label='Your First name'
                    value={state.firstname}
                    onChangeText={(firstname) => setFirstname(firstname)}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Input
                    placeholder='last name'
                    label='Your Last name'
                    value={state.lastname}
                    onChangeText={(lastname) => setLastname(lastname)}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Input
                    placeholder='email'
                    value={state.email}
                    leftIcon={{ type: 'fontisto', name: 'email' }}
                    label='Your Email Address'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Input
                    placeholder='password'
                    leftIcon={{ type: 'entypo', name: 'lock' }}
                    label='Your Password'
                    value={state.password}
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <Input
                    placeholder='current course'
                    label='Currently Enrolled In'
                    value={state.currentcourse}
                    onChangeText={(currentcourse) => setCurrentcourse(currentcourse)}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Button
                    onPress={() => Submit()}
                    loading={false}
                    title='Submit'
                />

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUp;