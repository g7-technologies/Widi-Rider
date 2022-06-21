
import React, { isValidElement, useState } from 'react';
import {Dimensions,Animated, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground } from 'react-native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';

import {DrawerContent} from './DrawerContent'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profile from '../Screens/Profile'


import {connect} from 'react-redux'
import HistoryScreen from '../Screens/History'
import  HomeScreen from "../Screens/Home_Screen";
import MapView ,{ Marker}from 'react-native-maps';





const Drawer = createDrawerNavigator();

 function App() {
  return (
    
        <Drawer.Navigator   drawerContent={props=><DrawerContent {...props}/>} >
             <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
             <Drawer.Screen name="Profile" component={Profile} options={{headerShown:false}} />
          
             
             <Drawer.Screen name="HistoryScreen" component={HistoryScreen} options={{headerShown:false}} />
             
        </Drawer.Navigator>
   
  );
}

export default connect(null)(App)
const styles = StyleSheet.create({
  
  header:{
    backgroundColor:'#0f76de',
    padding:10,
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
