import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LatestPostScreen from "./components/posts";
import SwitchRequestScreen from "./components/switchReqPage";
import CourseListPage from "./components/courselistpage";
import CoursePage from "./components/coursePage";
import Login from "./components/login";
import SignUp from "./components/signup";
import PostEditPage from './components/editpage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const CourseListComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='courseListPage'
                component={CourseListPage}
                options={{ title: "Courses" }}
            />
            <Stack.Screen
                name='coursePage'
                component={CoursePage}
                options={{ title: "Course Details" }}
            />
        </Stack.Navigator>
    )
};

const PostsComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='PostsScreen'
                component={LatestPostScreen}
                options={{ title: "Student Posts" }}
            />
            <Stack.Screen
                name='EditPostsScreen'
                component={PostEditPage}
                options={{ title: "Edit Your Post" }}
            />
        </Stack.Navigator>
    )
}

const HomeScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='courseList' component={CourseListComponent} />
            <Tab.Screen
                name='latestPost'
                component={PostsComponent}
                options={{ title: "Posts" }}
            />
            <Tab.Screen
                name='switchRequest'
                component={SwitchRequestScreen}
                options={{ title: "Create A Switch Request" }}
            />
        </Tab.Navigator>
    )
};

export default function App() {
    const [state, setState] = useState({
        token: null,
    });

    React.useEffect(() => {
        (async () => {
            let userToken = await AsyncStorage.getItem("userToken");

            setState({ token: userToken });
        })();
    }, []);

    return (!state.token ?
        (<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='loginPage'
                    component={Login}
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    name='signUp'
                    component={SignUp}
                    options={{ title: "Sign Up" }}
                />
                <Stack.Screen name='home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>) :
        (<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>)
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


