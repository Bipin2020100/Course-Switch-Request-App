import React from 'react'
import { SafeAreaView, Text } from 'react-native'


function Student({ student }) {
     return (
          <SafeAreaView>
               <Text>{student.firstname} {student.lastname}</Text>
               <Text>{student.email}</Text>
          </SafeAreaView>
     );
}

export default Student;