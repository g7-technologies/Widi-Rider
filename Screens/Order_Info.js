import React,{useState,useEffect} from 'react'
import {View,ScrollView,Modal,Text,Image,StyleSheet,TouchableOpacity,Platform, ActivityIndicator}from 'react-native'
import { Ionicons,FontAwesome5,Foundation,MaterialCommunityIcons ,MaterialIcons} from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast'
export default function OrderInformation({navigation,route}){

    const [data,getdata]=useState(route.params.data)
    const [modalVisible, setModalVisible] = useState(false);
    const [showindicator,indicatorcondition]=useState(true)
    const [id,userid]=useState(null)

    React.useEffect(()=>{
      GetUserdata()
    })
    async function GetUserdata(params) {
      var data=await AsyncStorage.getItem('DELIVERY_BOY_USER_DATA')
      var user=JSON.parse(data)
      userid(user.id)
    }

    async function  PickupOrder (){
      indicatorcondition(false)
       const formData = new FormData()
       
       formData.append('delivery_boy_id', id);
       formData.append('order_id', data.id);
      
       try{
         fetch(`${basepath}pickup_order`, {
           method: 'POST',
           headers: {
             Accept: "application/json",
             "Content-Type": "multipart/form-data",
           },
           body:formData
         })
         .then((response) => response.json())
         .then((responseJson) => {
           
           console.log( responseJson)
           if(!responseJson.error == true){
            //setModalVisible(true);
            indicatorcondition(true)
            // navigation.popToTop()
            Toast.show('Order Picked',{position:Toast.position.TOP})
       
       
           }else{
              indicatorcondition(true)
              // alert(responseJson.error_msg)
              Toast.show(responseJson.error_msg,{position:Toast.position.TOP})
           }
         })
         .catch((error) =>{

         });
       }catch(e){}
     }
    
    function customerPhonenumber(n){
      var number = String(n)
      var length = number.length-3
      var middle = '*'.repeat(length)

      // var str=number.substr(0,4)
      return(
              <Text  style={{marginLeft:10}}>{number[0]+number[1]+number[2]+middle+number[number.length-2]+number[number.length-1]}</Text>
      )

    }
    return(
        <>
        <View style={{flex:1}}>
            <View style={styles.header}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',margin:5,marginLeft:20,top:10}}>
                    {Platform.OS=='ios'?
                        <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                        :
                        <Ionicons name="md-arrow-back" size={24} color="#FFF" />
                    }
                    <Text style={styles.textcolor}>Order Info</Text>
                </TouchableOpacity>
                {/* onPress={()=>navigation.navigate('OrderDistenceScreen')} */}
               <TouchableOpacity >
                <FontAwesome5 name="map-marked-alt" style={{top:5,right:10}} size={20} color="#fff" />
              </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          
            <View style={styles.CardContainer}>
              <Text style={{fontWeight:'bold',fontSize:20}}> {data.resturant.name}</Text>
              <View style={{padding:10}}>
                  
                  <View style={{flexDirection:'row',marginVertical:5,marginLeft:5,alignItems:'center'}}>
                    <Foundation name="telephone" size={20} color="#0f76de" />
                    <Text style={{marginLeft:10}}>{data.resturant.phone}</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <MaterialIcons name="location-on" size={24} color="#0f76de" />
                    <Text style={{marginLeft:10}}>{data.resturant.address}</Text>
                  </View>
              </View>
            </View>
          <View style={styles.ContactCardContainer}>
                <Text style={{fontWeight:'bold',fontSize:20}}>Person Info</Text>
              <View style={{padding:10}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MaterialIcons name="person" size={24} color="#0f76de" />
                    <Text style={{marginLeft:10}}>{data.customer.name}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginVertical:5,marginLeft:5,alignItems:'center'}}>
                    <Foundation name="telephone" size={20} color="#0f76de" />
                   {customerPhonenumber(data.customer.phone)}
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <MaterialIcons name="location-on" size={24} color="#0f76de" />
                    <Text style={{marginLeft:10}}>{data.customer_address}</Text>
                  </View>
              </View>
          </View>
          <View style={styles.ContactCardContainer}>
               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={require('../assets/bike.png')} style={{resizeMode:'contain',width:30,height:30}}/>
                   <Text style={{fontWeight:'700',marginLeft:10}}>Delivery Charges</Text>
                   </View>
                   <Text style={{marginRight:5,color:'#0f76de',fontWeight:'700'}}>100 pkr</Text>
               </View>
          </View>
          {/* <View style={styles.ContactCardContainer}>
                <Text style={{fontWeight:'bold',fontSize:20}}>Order Detail </Text>
                
                <View style={{padding:10}}>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{marginLeft:10,fontWeight:'500'}}>1 Burger</Text>
                    <Text style={{marginLeft:10,color:'#0f76de',fontWeight:'700'}}>400 Pkr</Text>
                  </View>
                  <View style={{flexDirection:'row',marginVertical:5,alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{marginLeft:10,fontWeight:'500'}}>1 Burger</Text>
                    <Text style={{marginLeft:10,color:'#0f76de',fontWeight:'700'}}>400 Pkr</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{marginLeft:10,fontWeight:'500'}}>1 Burger</Text>
                    <Text style={{marginLeft:10,color:'#0f76de',fontWeight:'700'}}>400 Pkr</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',marginTop:20,justifyContent:'space-between'}}>
                    <Text style={{marginLeft:10,fontWeight:'500',color:'#0f76de',}}>Total</Text>
                    <Text style={{marginLeft:10,color:'#0f76de',fontWeight:'700'}}>1300 Pkr</Text>
                  </View>
                </View>
          </View> */}
          
          
        {showindicator?
          <TouchableOpacity onPress={() =>PickupOrder()} style={styles.LoginButton}>
              <Text style={styles.text}>Pickup Order</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.LoginButton}>
            <ActivityIndicator color='#fff'/>
          </TouchableOpacity>
        }


        <View style={{height:90}}/>
        <View style={{alignSelf:'center',marginHorizontal:20}}>
          <Text style={{...styles.text,fontWeight:'600',textAlign:'center',marginVertical:40,color:'#8c8c8c'}}>By completing this order,I agree to all  <Text style={{color:'#5d5d5d'}}>Terms and Services and Privacy Policy</Text> </Text>
          <Text style={{...styles.text,fontWeight:'600',textAlign:'center',marginVertical:40,color:'#8c8c8c'}}>Have a trouble in order? <Text style={{color:'#5d5d5d'}}>Contact Us</Text> </Text>
        </View>
        
        <View style={styles.centeredView}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              }}>
              <TouchableOpacity onPress={() => {
              setModalVisible(false);
              }} activeOpacity={1} style={styles.centeredView}>
              
              <View style={styles.modalView}>
                  <View style={{alignSelf:'flex-end',padding:5}}>
                      <MaterialIcons name="close" size={24} color="#0f76de" />
                  </View>
                  <Image source={require('../assets/confirmorder.png')} style={{width:100,height:100}}/>
                  <Text style={{marginTop:40,fontSize:30,fontWeight:'600'}}>Thank you!</Text>
                  <TouchableOpacity onPress={()=>{setModalVisible(false),navigation.navigate('History')}} style={{...styles.LoginButton,width:150}}>
                      <Text style={styles.text}>Track Order</Text>
                      
                  </TouchableOpacity>
                      <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                          <MaterialIcons name="share" size={24} color="black" />
                          <Text style={{marginLeft:10}}>Share Details</Text>
                      </TouchableOpacity>
              </View>
              </TouchableOpacity>
          </Modal>
  
        
      </View>
     
      </ScrollView>
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
  