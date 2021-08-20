import jwt_decode from 'jwt-decode';
import { State } from "react-native-gesture-handler";
import React from "react";
import { Input, Button, Header } from "react-native-elements";
// import Icon from "react-native-vector-icons/Fontisto";
import Icon from "react-native-vector-icons/Entypo";
import { FlatList } from "react-native";
import axios from "axios";
import SwitchRequest from './switchReq'

const switchReqForm = () => {
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        currentcourse: "",
        desiredcourse: "",
        switchReq: [],
        data: {},
    });

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem("@storage_Key");
            if (value !== null) {
                try {
                    const data = jwt_decode(value)
                    setState({ ...state, data: data });
                } catch {
                    console.log('failed to decode');
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getSwitchReq = () => {
        axios
            .post("http://localhost:3000/src/fetchswitchReq", { ...state.data })
            .then((result) => {
                setState({ ...state, switchReq: result });
            });
    };

    useEffect(() => {
        getToken();
        getSwitchReq();
    }, []);

    const setEmail = (email) => {
        setState({ ...state, email: email });
    };
    const setDesiredcourse = (desiredcourse) => {
        setState({ ...state, desiredcourse: desiredcourse });
    };
    const setFirstname = (firstname) => {
        setState({ ...state, firstname: firstname });
    };
    const setLastname = (lastname) => {
        setState({ ...state, lastname: lastname });
    };
    const setCurrentcourse = (currentcourse) => {
        setState({ ...state, currentcourse: currentcourse });
    };

    const Submit = () => {
        const switchReqData = {
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email,
            currentcourse: state.currentcourse,
            desiredcourse: state.desiredcourse,
        };

        axios
            .post("http://localhost:3000/src/addswitchReq", {
                ...switchReqData,
            })
            .then((response) => {
                if (response.status === "success") {
                    setState({ ...state, switchReq: response.switchRequests });
                    Alert.alert("Successful Post");
                } else {
                    setState({
                        ...state,
                        firstname: "",
                        lastname: "",
                        email: "",
                        currentcourse: "",
                        desiredcourse: "",
                    });
                    Alert.alert("Try again");
                }
            });
    };

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
                <Text>Switch request form</Text>
                <Input
                    placeholder='first name'
                    label='Your First name'
                    onChangeText={(firstname) => {
                        setFirstname(firstname);
                    }}
                />
                <Input
                    placeholder='last name'
                    label='Your Last name'
                    onChangeText={(lastname) => {
                        setLastname(lastname);
                    }}
                />
                <Input
                    placeholder='email'
                    leftIcon={{ type: "fontisto", name: "email" }}
                    label='Your Email Address'
                    onChangeText={(email) => {
                        setEmail(email);
                    }}
                />
                <Input
                    placeholder='current course'
                    label='Currently Enrolled In'
                    onChangeText={(currentcourse) => {
                        setFirstname(currentcourse);
                    }}
                />
                <Input
                    placeholder='desiredcourse'
                    label='Desired Course'
                    onChangeText={(desiredcourse) => {
                        setDesiredcourse(desiredcourse);
                    }}
                />

                <Button onPress={Submit} loading={true} title='Submit' />
                <FlatList data={state.switchReq}
                    renderItem={({ item }) => <SwitchRequest request={item} />} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default switchReqForm;
