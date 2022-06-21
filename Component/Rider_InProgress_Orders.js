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
  Linking,
  Easing,
  Image
} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';

function  Rider_InProgress({navigation,item}){

    // const [In_Progress_data,set_In_Progress_data]=useState('')

    function dialCall ()  {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
        phoneNumber = `tel:${item.customer.phone}`;
        }
        else {
        phoneNumber = `telprompt:${item.customer.phone}`;
        }
        Linking.openURL(phoneNumber);
    };
    return(
       
        <View style={styles.Container}>
            <Text style={{fontWeight:'600',marginVertical:10}}>Order Number</Text>
            <View style={styles.minicontainer}>
                <Text style={{fontWeight:'700',color:'#007aff'}}>{item.order_id}</Text>
                <TouchableOpacity onPress={()=>{
                    if(item.status==3){
                    navigation.navigate('OrderDistenceScreen',
                    {    'order':item.id,
                        'hotel_latitude':parseFloat( item.resturant.latitude),
                        'hotel_longitude':parseFloat(item.resturant.longitude),
                        'user_latitude':parseFloat(item.latitude),
                        'user_longitude':parseFloat(item.longitude),
                        'ordernumber':item.order_id
                    })
                    }else{
                        navigation.navigate('OrderDistenceScreen',
                        {    'order':item.id,
                            'hotel_latitude':parseFloat( item.resturant.latitude),
                            'hotel_longitude':parseFloat(item.resturant.longitude),
                            'user_latitude':parseFloat(item.latitude),
                            'user_longitude':parseFloat(item.longitude),
                            'ordernumber':item.order_id
                        })
                    }
                    }} style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{...styles.graytext,marginRight:5}}>Track</Text>
                    <AntDesign name="right" size={12} color="#b7b7b7" />
                </TouchableOpacity>
            </View>
            <View style={styles.minicontainer}>
                
                <Text style={styles.graytext}>{item.created_at}</Text>
                <Text style={{fontWeight:'600',color:'#007aff'}}>Total : $ {item.amount-item.discount}</Text>
            </View>
            <Text style={{fontWeight:'600',marginVertical:10}}>Person Information</Text>
            
            <View style={styles.minicontainer}>
                <Text style={{fontWeight:'700',color:'#007aff'}}>Person Name</Text>
                    <Text style={{...styles.graytext,marginRight:5}}>{item.customer.name}</Text>
                
            </View>

            <View style={{...styles.minicontainer,marginVertical:4}}>
                <Text style={{fontWeight:'700',color:'#007aff'}}>Phone Nnumber</Text>
                <TouchableOpacity onPress={()=>dialCall()} style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{...styles.graytext,marginRight:5}}>{item.customer.phone}</Text>
                    <AntDesign name="phone" size={12} color="#b7b7b7" />
                </TouchableOpacity>
            </View>
            <View style={styles.minicontainer}>
                <Text style={{fontWeight:'700',color:'#007aff'}}>Status</Text>
                <Text style={{...styles.graytext,marginRight:5}}>{item.status==0?'In qeue':(item.status==1?'Cooking':(item.status==2?'Food Ready':'on the way '))}</Text>
                {/* <Text>{item.status}</Text> */}
            </View>
            
            <TouchableOpacity  onPress={()=>navigation.navigate('Complete_Order_Status',{'order':item})}  style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
             <Text  style={{fontWeight:'bold',color:'#5c5c5c'}}>View Order Detail</Text>
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
  export default Rider_InProgress
   