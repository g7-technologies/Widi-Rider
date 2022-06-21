import { connect } from "react-redux";
import React, { useRef, isValidElement, useEffect, useState } from "react";
import {
  Dimensions,
  Animated,
  StyleSheet,
  AppState,
  TextInput,
  Image,
  Text,
  ScrollView,
  View,
  ImageBackground,
  BackHandler
} from "react-native";
import { basepath,Imagebasepath } from "../BasePath/Basepath";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, {PROVIDER_GOOGLE, Marker, Callout,Polyline } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance, getPreciseDistance } from "geolib";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { LocationGeofencingEventType } from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; 
import { Video, AVPlaybackStatus } from 'expo-av';
import { Feather } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function orderComplete({ navigation ,route}) {
  
  const [orderstatus,order_status]=useState(route.params.orderstatus)
  useEffect(() => {
   
    
  }, []);

  async function  Complete_Order (){
    console.log('xxxxxxxxxxxxxxxxxxxxx')
    const formData = new FormData()
    console.log(orderstatus)
    formData.append('order_id', orderstatus);
   
    try{
      fetch(`${basepath}complete_order`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log('token')
         console.log( responseJson)
         console.log('token')
       navigation.navigate('History')
      })
      .catch((error) =>{});
    }catch(e){}
  }

 

  return (
    <View style={{flex:1}}>
    
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>  navigation.popToTop()} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Order Complete</Text>
        </TouchableOpacity>
       
      </View>
      <View style={{flex:1,}}>
        <Video
            style={{width:300,alignSelf:'center',height:300}}
            source={require( '../Video_animations/kk3tv5hf.mp4')}
            shouldPlay={true}
            resizeMode="contain"
            isLooping
        />
        <TouchableOpacity onPress={()=>Complete_Order()} style={styles.LoginButton}>
          <Text style={styles.textStyle}>Mark as Delivered</Text>
        </TouchableOpacity>
      </View>
    </View>


</View>
  );
}

export default orderComplete;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  LoginButton:{
    backgroundColor:'#0f76de',
    padding:12,
    margin:20,
    borderRadius:5,
    //alignSelf:'center',
},
});
