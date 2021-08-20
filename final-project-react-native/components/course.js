import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";



const Course = ({ item }) => {


    const [state, setState] = useState({
        date: item.offeringDate,
        courseID: item.courseID,
        name: item.name,
        counter: item.studentsRequesting.length,
    });

    const navigation = useNavigation()

    const gotoCourse = () => {
        navigation.navigate('coursePage', { item: item })
    }
    console.log(state)
    return (


        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={gotoCourse}>
                <Text style={styles.courseName}>{state.name}</Text>
            </TouchableOpacity>
            <Text style={styles.courseName}>{state.courseID}</Text>
            <Text style={styles.date}>{state.date}</Text>
            <Text style={styles.counter}>{state.counter}</Text>
            <Divider style={{ backgroundColor: "blue" }} />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#cbebf7",
        alignItems: "center",
        justifyContent: "center"
    },
    courseName: {
        fontWeight: "bold",
        fontSize: 20
    },
    date: {
        fontSize: 15,
        color: "#871000"
    },
    counter: {
        fontSize: 15,
        color: "black"
    }
});

export default Course;