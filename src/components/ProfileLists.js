import React from "react";
import { View, Text, Button, StyleSheet} from "react-native";
import { useWindowDimensions } from "react-native";
import { ListItem, Avatar } from "@react-native-material/core";

function ProfileLists({name, desc, img, id, btnTitle, navigation}){
    const { width } = useWindowDimensions();

    // const styles = StyleSheet.create({
    //     buttonStyle: {
    //         color: 'red',
    //         marginTop: 20,
    //         padding: 20,
    //         backgroundColor: 'green'
    //     }
    // });

    return(
        <View>
        <ListItem
            leadingMode="avatar"
            leading={
                <Avatar image={{ uri: img }} size={50} />
            }
            title= {name}
            secondaryText={desc
                // <View >
                //     {/* <View style={{}}> */}
                //     <Text>{desc}</Text>
                //     {/* </View> */}
                //     <Button 
                //         // style={{textAlign: 'right'}} 
                //         title="View Profile"
                //         onPress={() => props.navigation.navigate({
                //             name:'Read',
                //             params: {post: 'posts/views/'+props.id, ids: props.id, type: "posts"}
                //         })}
                //     />
                // </View>                
            }
        />
        <View style={{borderWidth: 20, borderColor:'white'}}>
            <Button 
                title={btnTitle}
            />
        </View>
    </View>
    )
}

export default ProfileLists;