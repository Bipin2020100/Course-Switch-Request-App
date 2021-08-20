import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import {
    Card,
    Title,
    Paragraph,
    Subheading,
    Headline,
    Caption,
} from "react-native-paper";
import { Divider } from "react-native-elements";
import { useNavigation } from '@react-navigation/native'
import axios from "axios";



const Post = ({ post }) => {

    const [state, setState] = {
        email: '',
        post: post
    }

    const navigation = useNavigation();

    const EditPost = () => {
        navigation.navigate('EditPostsScreen', { ...state })
    }
    const DeletePost = () => {
        axios.post('http://localhost:3000/src/deletepost', { ...state.post }).then(result => {
            navigation.navigate('PostsScreen')
        })
    }

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
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
    }

    useEffect(() => {
        getToken()
    }, [])

    return (state.email === post.email ?
        (<View>
            <Card>
                <Card.Content>
                    <Title>
                        {post.firstname} {post.lastname}
                    </Title>
                    <Subheading>
                        Current course :{post.currentcourse}
                    </Subheading>
                    <Subheading>
                        Desired course :{post.desiredcourse}
                    </Subheading>
                    <Paragraph>{post.postText}</Paragraph>
                    {/* <Headline>desired course</Headline> */}
                    <Caption>
                        Date:{post.date.getFullYear()}/{post.date.getMonth()}/
                        {post.date.getDate()}
                    </Caption>
                </Card.Content>
            </Card>
            <Text>
                <Button onPress={EditPost} title='Update Post' />
                <Button onPress={DeletePost} title='Delete Post' />
            </Text>
            <Divider style={{ backgroundColor: "blue" }} />;
        </View>) : (<View>
            <Card>
                <Card.Content>
                    <Title>
                        {post.firstname} {post.lastname}
                    </Title>
                    <Subheading>
                        Current course :{post.currentcourse}
                    </Subheading>
                    <Subheading>
                        Desired course :{post.desiredcourse}
                    </Subheading>
                    <Paragraph>{post.postText}</Paragraph>
                    {/* <Headline>desired course</Headline> */}
                    <Caption>
                        Date:{post.date.getFullYear()}/{post.date.getMonth}/
                        {post.date.getDate}
                    </Caption>
                </Card.Content>
            </Card>
            <Divider style={{ backgroundColor: "blue" }} />;
        </View>)
    )
};

export default Post;
