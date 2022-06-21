import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,

  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
const Rider_CompletedOrders=({navigation,item})=>{
    return(
        <View style={styles.Container}>
        <Text style={{fontWeight:'600',marginVertical:10}}>Order Number</Text>
        <View style={styles.minicontainer}>
            <Text style={{fontWeight:'700',color:'#007aff'}}>{item.order_id}</Text>
            
                <Text style={{fontWeight:'bold',color:'#007aff'}}>Completed</Text>
               
            
        </View>
        <View style={styles.minicontainer}>
            
            <Text style={styles.graytext}>{item.created_at}</Text>
            <Text style={{fontWeight:'600',color:'#007aff'}}>Total : $ {item.amount-item.discount}</Text>
        </View>
        <TouchableOpacity  onPress={()=>navigation.navigate('Complete_Order_Status',{'order':item})} style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
          <Text  style={{fontWeight:'bold',color:'#007aff'}}>See Detail</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
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
    Body:{
      flex:1,
      
      justifyContent:'center',
      alignItems:'center'
    },
      Container:{
          margin:10,
        justifyContent:'space-between',
        paddingVertical:5,
        paddingHorizontal:5,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.3,
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:5,
        elevation:3
      },
      graytext:{
          color:'#5c5c5c',
      },
      textstyle:{
          fontWeight:'600'
      },
      minicontainer:{
          flexDirection:'row',
          justifyContent:'space-between',
          marginVertical:4
      },
      borderLine:{
          width:'100%',
          borderColor:'#dddddd',
          marginTop:10,
          borderBottomWidth:0.5,
          alignSelf:'center'
      },

      
  });
  export default Rider_CompletedOrders
   