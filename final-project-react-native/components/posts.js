import jwt_decode from 'jwt-decode';
import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-community/picker'
import axios from 'axios';
// import { post } from '../../final-project-express/routes/auth';
import Post from './post'



const PostPage = () => {

    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        currentcourse: '',
        desiredcourse: '',
        date: '',
        courses: [],
        selectedValue: '',
        postText: '',
        posts: []
    });


    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                try {
                    const data = jwt_decode(value);
                    setState({
                        ...state,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        currentcourse: data.currentcourse,
                        email: data.email
                    })
                } catch {
                    console.log('failed to decode')
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const GetPosts = () => {
        axios.get('http://localhost:3000/src/getposts').then(result => {
            setState({ ...state, posts: result.posts })
        }).catch(error => {
            console.log(error)
        })
    }

    const AddPost = () => {
        const postData = {
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email,
            currentcourse: state.currentcourse,
            desiredcourse: state.desiredcourse,
            date: new Date(),
            postText: state.postText
        }

        axios.post('http://localhost:3000/src/addpost', { ...postData }).then(result => {
            setState({ ...state, posts: result })
        })
    }

    const ChangePostText = (postText) => {
        setState({ ...state, postText: postText })
    }

    const DesiredCoursesList = () => {
        const list = state.courses.map(course => {
            <Picker.Item label={course.name} value={course.name} />
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3000/src/courses").then((result) => {
            setState({ ...state, courses: result.courses });
            getToken();
            GetPosts();
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Picker
                selectedValue={state.desiredcourse}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setState({ ...state, desiredcourse: itemValue })}
            >
                {DesiredCoursesList()}
            </Picker>
            <FlatList
                data={state.posts}
                renderItem={({ item }) => { <Post post={item} /> }}
                keyExtractor={item = item.date} />
            <View style={styles.footerContainer}>
                <TextInput onChangeText={(postText) => ChangePostText(postText)} placeholder='New Post' style={styles.searchInput} />
                <TouchableOpacity onPress={() => AddPost()} style={styles.button}>
                    <Text style={styles.buttonText}>Add Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
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

export default PostPage