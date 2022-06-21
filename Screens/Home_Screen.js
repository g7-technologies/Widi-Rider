
import React, { useEffect,isValidElement, useState } from 'react';
import {Dimensions,Animated,TouchableOpacity, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';

import {DrawerContent} from './DrawerContent'
import Profile from '../Screens/Profile'
import * as Location from 'expo-location';

import {connect} from 'react-redux'
import HistoryScreen from '../Screens/History'
import  MapScreen from "../Screens/MapScreen";
import OrderList from "../Screens/Order_List";
//Notification Permission
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

function HomeScreen({ navigation }) {

  useEffect(() => {
    const config = async () => {
      let res = await Permissions.askAsync(Permissions.LOCATION);
      if (res.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };

    config();
  }, []);
  return (
   <>
    <View style={styles.header}>
        <View style={{flexDirection:'row',marginTop:5,alignItems:'center',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
              <Image source={require('../assets/Drawericon.png')} style={{width:20,height:20}} />
            </TouchableOpacity>
            <Text style={{fontFamily:'poppinbold',color:'#fff'}}>Dashboard</Text>
            <Text>    </Text>
        </View>
    </View>
   
    
    <View style={{flex:1}}>
     
            <MapScreen navigation={navigation}/>
     
    </View>
   
   </> 

  
  );
}




const Drawer = createDrawerNavigator();

 function App() {
  return (
    
        <Drawer.Navigator   drawerContent={props=><DrawerContent {...props}/>} >
             <Drawer.Screen name="Home" component={HomeScreen} />
             <Drawer.Screen name="Profile" component={Profile} />
             
             <Drawer.Screen name="Wallet" component={Wallet} />
             
             
             
             <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
             
        </Drawer.Navigator>
   
  );
}

export default connect(null)(HomeScreen)
const styles = StyleSheet.create({
  
  header:{
    backgroundColor:'#0f76de',
    padding:14,
    justifyContent:'center' 
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  Buttons:{
    padding:10,
    borderWidth:0.5,
    borderColor:'#dddddd',
    width:Dimensions.get('window').width/2,
    justifyContent:'center',
    alignItems:'center',
    elevation:3,
    shadowOffset:{width:1,height:1}
    
  },
  minicontainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingHorizontal:10,
    marginBottom:5
  },
  headingtext:{
    fontWeight:'bold',
    fontSize:15,
    color:'#0f76de',
  },
  borderLine:{
    width:'90%',
    borderColor:'#dddddd',
    marginTop:10,
    borderBottomWidth:0.5,
    alignSelf:'center'
  },
});
