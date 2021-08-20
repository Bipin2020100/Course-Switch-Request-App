import React, { useState } from 'react'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native'
import { Button } from 'react-native-elements'
import Student from './student'
import * as MailComposer from 'expo-mail-composer';


export const CoursePage = ({ route: { params } }) => {

     const course = params.item
     const [state, setState] = useState({
          currentStudents: course.studentsEnrolled,
          pendingStudents: course.studentsRequesting
     })

     async function sendEmailAsync() {
          let result = await MailComposer.composeAsync({
               recipients: state.currentStudents,
               subject: 'Switch Request Offer',
               body: "Hey! Wanna swap courses with me?",
          });
     }


     return (
          <SafeAreaView>
               <Text> Current Students</Text>
               <FlatList
                    data={state.currentStudents}
                    renderItem={({ item }) => <Student student={item} />}
                    keyExtractor={item => item.email}
               >

               </FlatList>
               <Text> Pending Students</Text>
               <FlatList
                    data={state.pendingStudents}
                    renderItem={({ item }) => <Student student={item} />}
                    keyExtractor={item => item.email}
               >

               </FlatList>
               <Button title='Email A Switch Offer' onPress={sendEmailAsync} type="outline" raised={true} />

          </SafeAreaView>
     );
};

export default CoursePage;