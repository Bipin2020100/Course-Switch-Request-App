import React from 'react';
import {View} from 'react-native'
import {
     Card,
     Title,
     Paragraph,
     Subheading,
     Headline,
     Caption,
 } from "react-native-paper";
 import { Divider ,Button} from "react-native-elements";
import axios from 'axios';

function switchReq({request}) {

    const DeleteSwitchReq = () => {
        axios.delete('http://localhost:3000/src/deleteswitchreq')
    }

     return (
          <View>
            <Card>
                <Card.Content>
                    <Title>
                        {request.firstname} {request.lastname}
                    </Title>
                    <Subheading>
                        Current course :{request.currentcourse}
                    </Subheading>
                    <Subheading>
                        Desired course :{request.desiredcourse}
                    </Subheading>
                    <Paragraph>{request.email}</Paragraph>
                </Card.Content>
            </Card>
            {/* <Button onPress= {} title = "fulfilled"/> */}
            <Divider style={{ backgroundColor: "blue" }} />;
        </View>
     );
}

export default switchReq;
