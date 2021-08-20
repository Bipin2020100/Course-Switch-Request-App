import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native'


const EditPage = ({ route: { params } }, { navigation }) => {

    const post = params;

    const [state, setState] = useState({
        postText: '',
        post: post
    })

    const EditPost = () => {
        axios.put('http://localhost:3000/src/editpost', { ...state }).then(({data}) => {
            if (data.status === 'success') {
                navigation.navigate('PostsScreen')
            } else {
                Alert.alert('Post was not updated')
                setState({ ...state, postText: '' })
            }
        })
    }

    const ChangePostText = (postText) => {
        setState({
            ...state,
            postText: postText
        })
    }



    return (

        <SafeAreaView style={styles.footerContainer}>
            <Text>Edit Your Post</Text>
            <TextInput onChangeText={(postText) => ChangePostText(postText)} placeholder='New Post' style={styles.searchInput} />
            <TouchableOpacity onPress={() => EditPost()} style={styles.button}>
                <Text style={styles.buttonText}>Add Post</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default EditPage;