import {connect} from 'react-redux'
import React, { isValidElement, useState } from 'react';
import {Dimensions,Animated,TouchableOpacity, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView ,{ Marker}from 'react-native-maps';

function CustomerOrders({navigation,data}){
   console.log("data is.....................start.........................................")
   console.log(data)
   console.log("data is.....................end.........................................")

    return(
        <View style={{flex:1}}>
        <ScrollView style={{flex:1,backgroundColor:'cream',}} >
        <View style={{padding:20,width:'95%',borderRadius:5,marginVertical:5,alignSelf:'center',shadowOpacity:0.3,backgroundColor:'#fff',shadowOffset:{width:0.3,height:0.4}}}>
          <View style={{flexDirection:"row",justifyContent:'space-between'}} >
            <Text style={styles.headingtext}>{data.customer.name}</Text>
            <Text style={styles.headingtext}>{data.resturant.name}</Text>
          </View>
          <View style={{marginVertical:8,width:'98%'}}>
            <Text style={{fontWeight:'500'}} >Pickup Addresss</Text>
            <Text style={{width:'100%',marginLeft:10,fontStyle:'italic',color:'gray'}}>{data.resturant.address}</Text>
          </View>
         
          <View style={{marginVertical:5,width:'98%'}}>
            <Text style={{fontWeight:'500'}}>Delievery Address</Text>
            <Text style={{width:'100%',marginLeft:10,fontStyle:'italic',color:'gray'}}>{data.customer_address}</Text>
          </View>
          <View style={{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:'500',width:200,}}>Total Amont : ${data.amount-data.discount}</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('OrderInfo',{data})}>
                <MaterialCommunityIcons name="information" size={24}  color='#0f76de' />
              </TouchableOpacity>
          </View>
          {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
            <Text style={{fontFamily:'poppinbold',color:'#0f76de'}}>View Map Distance</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('OrderDistenceScreen')}>
              <FontAwesome5 name="map-marked-alt" size={24} color="#0f76de" />
            </TouchableOpacity>
          </View> */}
        </View>



       
        
        
      </ScrollView>
      </View>
    )
}

export default CustomerOrders

const styles=StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    headingtext:{
      color:'#0f76de',
      fontFamily:'poppinbold'
    }
})