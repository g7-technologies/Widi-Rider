import React, { useState } from 'react';
import { ScrollView, Platform,StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons,Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { basepath } from "../BasePath/Basepath";
import Toast from 'react-native-tiny-toast';
export default function App({navigation}) {
  const [email,setemail]=React.useState('')
  const [error_message,showerror]=React.useState('')
  function UpdateEmail(){
    //  console.log(1)
      const formData = new FormData()
      formData.append('delivery_boy_id', '2');
      formData.append('email', email);
  
      
      try{
        fetch(`${basepath}delivery_boy_change_email`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body:formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.error){
            console.log(responseJson)
            alert(responseJson.error_msg)
            navigation.goBack();
          
          }
         else {
         console.log(responseJson.user)
         Toast.show(responseJson.success_msg)
         navigation.goBack();
         setEmail(responseJson.user);
          }
        })
        .catch((error) =>{});
      }catch(e){}
    }

    async  function setEmail (user){
       console.log('/////////////////')
      // navigation.replace('Dashboard')
      
      AsyncStorage.setItem('DELIVERY_BOY_USER_DATA', JSON.stringify(user), (err)=> {
       if(err){
           console.log("an error");
           throw err;
       }
           console.log("success");
       }).catch((err)=> {
           console.log("error is: " + err);
       });
     }


  function ValidateEmail(email)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
      
        return (false)
  }
  function form_validation ()  {
    if(email === '' ){
      showerror('Email is required')
    }else if(!ValidateEmail((email).trim())){
      showerror('Invalid Email')
    }else{
      
   
      
      UpdateEmail()
    }
  }



    return (
    <ScrollView style={styles.container}>
       <View style={styles.header}>
    <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}> Email</Text>

        </TouchableOpacity>
    </View>
     
        
        <Image  source={require('../assets/undraw_cooking_lyxy.png')} style={{width:100,height:100,alignSelf:'center',resizeMode:'contain',marginBottom:40}}/>
      <Text style={styles.heading_text}>Change Your Email</Text>
      
      
      <TextInput onChangeText={(email)=>setemail(email)} placeholder='Email'  placeholderTextColor={'#8c8c8c'} style={{...styles.input, borderColor:'#8c8c8c'}}/>
      <Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>{error_message}</Text>
      <TouchableOpacity onPress={()=>form_validation()} style={styles.LoginButton}>
          <Text style={styles.text}>Update</Text>
      </TouchableOpacity>
      
   
    </ScrollView>
  );
}
//colors on focus #97c6f4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
   
  },
  header:{
    backgroundColor:'#0f76de',
    height:60,
    justifyContent:'center',
   // marginTop:Platform.OS=='android'?25:0 
},
  heading_text:{
    color:'#5d5d5d',
    fontSize:20,
    fontFamily:'poppinbold',
    padding:10
  },
  textcolor:{
    fontFamily:'poppinbold',
     color:'#fff',
     top:4,
     marginLeft:30
 },
    input:{
      borderWidth:1,
      padding:8,
      margin:10,
      borderRadius:5,
      fontWeight:'bold',
     
    },
    LoginButton:{
      backgroundColor:'#0f76de',
      padding:12,
      margin:20,
      borderRadius:5
  },
    text:{
       fontFamily:'poppin',
        fontSize:15,
        textAlign:'center',
        letterSpacing:1,
        color:'#fff'
    }
});
