import IPAddress from './backend';
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import axios from "axios";
import Course from "./course";

const CourseListPage = () => {
    const [state, setState] = useState({
        courses: [],
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/src/courses`).then(({ data }) => {
            setState({ ...state, courses: data.courses });
        });
    }, []);

    return (
        <SafeAreaView>
            <FlatList
                data={state.courses}
                renderItem={({ item }) => <Course item={item} />}
                keyExtractor={(item) => {
                    item.courseID;
                }}
            />
        </SafeAreaView>
    );
};


export default CourseListPage;