import React,{useState} from 'react'
import {View,ScrollView,FlatList,Modal,Text,Image,StyleSheet,TouchableOpacity,Platform}from 'react-native'
import { Ionicons,FontAwesome5,Foundation,MaterialCommunityIcons ,MaterialIcons} from '@expo/vector-icons';
import CustomerOrders from "../Component/Customer_Orders";
export default function OrderInformation({navigation,route}){
  

    return(
        <>
          <View style={{flex:1,backgroundColor:'cream'}}>
            <View style={styles.header}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',margin:5,marginLeft:20,top:10}}>
                    {Platform.OS=='ios'?
                        <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                        :
                        <Ionicons name="md-arrow-back" size={24} color="#FFF" />
                    }
                    <Text style={styles.textcolor}>Order List</Text>
                </TouchableOpacity>
                {/* onPress={()=>navigation.navigate('OrderDistenceScreen')} */}
               <TouchableOpacity >
                {/* <FontAwesome5 name="map-marked-alt" style={{top:5,right:10}} size={20} color="#fff" /> */}
               </TouchableOpacity>
              </View>
            </View>
            <FlatList

             keyExtractor={(item, index) => index.toString()}
              data={route.params.data.reverse()}
              renderItem={({ item, index, separators }) => (
                <CustomerOrders data={item} navigation={navigation}/>
              )}
            />
            
          </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
       
      },
      heading_text:{
        color:'#5d5d5d',
        fontSize:20,
        fontWeight:'700',
        padding:10
      },
       
        header:{
            backgroundColor:'#0f76de',
            height:60,
            justifyContent:'center' 
        },
        textcolor:{
            fontWeight:'bold',
            color:'#fff',
            top:4,
            marginLeft:30
        },
        CardContainer:{
            width:'95%',
            padding:10,
            paddingVertical:20,
            borderRadius:5,
            alignSelf:'center',
            backgroundColor:'#fff',
            shadowOpacity:0.1,
            marginTop:20,
            shadowOffset:{width:0.5,height:0.5},
            elevation:3
        },
        ContactCardContainer:{
            width:'95%',
            padding:10,
            paddingVertical:20,
            borderRadius:5,
            alignSelf:'center',
            backgroundColor:'#fff',
            shadowOpacity:0.1,
            marginTop:10,
            shadowOffset:{width:0.5,height:0.5},
            elevation:3
        },
        PayentCardContainer:{
            width:'95%',
            
            paddingVertical:10,
            borderRadius:5,
           
            alignSelf:'center',
            backgroundColor:'#fff',
            shadowOpacity:0.1,
            marginTop:10,
            shadowOffset:{width:0.5,height:0.5}
        },
        miniContainer:{
            flexDirection:'row',
            margin:10,
            marginTop:5,
            justifyContent:'space-between'
        },
        borderLine:{
            width:'95%',
            alignSelf:'center',
            borderColor:'#dddddd',
            marginTop:10,
            borderBottomWidth:0.4
        },
        colortext:{
            color:'#0f76de',
            fontWeight:'500'
        },
        LoginButton:{
            backgroundColor:'#0f76de',
            padding:12,
            margin:20,
            borderRadius:5
        },
        text:{
            fontWeight:'600',
            fontSize:15,
            textAlign:'center',      
            color:'#fff'
        },
        //
    
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        //    shadowOffset:{width:1,height:1},
        //    backgroundColor:'#000000A9'
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            width:'80%',
            height:350,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          openButton: {
            backgroundColor: '#F194FF',
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },   
     
});
  