// import React from "react";
// import { Text, View, Button, ScrollView } from "react-native";
// import { ListItem, Avatar, Text as MaterialText } from "@react-native-material/core";
// import ProfileLists from '../components/ProfileLists'

// // function Partner(props){
// //     return(
// //         <View style={{marginBottom:10, paddingBottom:10}} >
// //         <ListItem
// //             leadingMode="avatar"
// //             leading={
// //                 <Avatar image={{ uri: HOST+props.attachment }} size={50} />
// //             }
// //             title= "Ujjwal Kar"
// //             secondaryText={
// //                 <View>
// //                     <Text>Hello World</Text>
// //                     <View>
// //                     <Button 
// //                         style={{textAlign: 'right'}} 
// //                         title="Message"
// //                         onPress={() => props.navigation.navigate({
// //                             name:'Read',
// //                             params: {post: 'posts/views/'+props.id, ids: props.id, type: "posts"}
// //                         })}
// //                     />
// //                     </View>
// //                 </View>                
// //             }
// //         />
// //     </View>
// //     )
// // }

// const Partners = (props) => {
//     return (
//         <ScrollView>
//             <MaterialText 
//                 variant="h6" 
//                 style={{
//                     backgroundColor:'#636e72',
//                     color: 'white',
//                     fontSize: 18,
//                     fontWeight: '600',
//                     padding: 5,
//                 }}>
//                     Startups for you...
//             </MaterialText>
//             <ProfileLists name="Brajesh Maheshwari" desc="Co-Founder Director of Allen Career Institute"  img="https://startupoverflowweb.netlify.app/static/media/Brajesh_Maheshwari.bb5b0fb8832b1c4849eb.jpg" btnTitle="Contact with Partners" id="1"/>
//             <ProfileLists name="Vinay Kumar Reddy Nuvvuru" desc="Founder of Indian Academy of Competitive Exams"  img="https://startupoverflowweb.netlify.app/static/media/Vinay-kumar-reddy.4e0e3f5d0d3f5e461005.jpg" btnTitle="Contact with Partners" id="2"/>
//             <ProfileLists name="Dr P Prasant" desc="Speaker, Educator in teaching Cyber Security"  img="https://startupoverflowweb.netlify.app/static/media/Dr%20P%20Prasant.271d836b02162ad51630.jpg" btnTitle="Contact with Partners" id="3"/>
//             <ProfileLists name="Dr Chandan Agarwal" desc="Chairperson of G.D. Goenka School"  img="https://startupoverflowweb.netlify.app/static/media/Chandan_Aggarwal.2b628be7ea20068eab61.jpg" btnTitle="Contact with Partners" id="4"/>
//             <ProfileLists name="Dhana Durga" desc="Founder and Principal, SVES"  img="https://startupoverflowweb.netlify.app/static/media/Dhana-Durga.9c8d4c6089d896d8c91b.jpeg" btnTitle="Contact with Partners" id="5"/>
//             <ProfileLists name="Karan Shah" desc="Founder & CEO of IIDE"  img="https://startupoverflowweb.netlify.app/static/media/Karan%20Shah.5abc9dff7e92607b7571.jpg" btnTitle="Contact with Partners" id="6"/>
//         </ScrollView>
//     )
// }    

// export default Partners;