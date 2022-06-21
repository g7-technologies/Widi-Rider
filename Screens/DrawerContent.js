
import React,{useEffect} from 'react';
import { StyleSheet,Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createDrawerNavigator, DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';


export  function DrawerContent({props,navigation}) {
    const [name,username]=React.useState('')
    const [img,setimg]=React.useState('')
    const [email,setemail]=React.useState('')

    async  function LoginScreen(){
        navigation.replace('Login')
       await AsyncStorage.setItem('userLogedin','false')
       await AsyncStorage.setItem('DELIVERY_BOY_USER_DATA','')
       
    }
    useEffect(()=>{
        GetUserInfo() 
      })
      async function GetUserInfo() {
          var user_data=await AsyncStorage.getItem('DELIVERY_BOY_USER_DATA')
          var user_name=JSON.parse(user_data)
          console.log('...............start...............')
          console.log(user_name)
          console.log('...............end...............')

          username(user_name.name)
          setimg(user_name.image)
          setemail(user_name.email)
      }
  
  return (
   <View style={{flex:1}}>
        <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <View style={styles.ImageContainer}>
            <Image style={{width:80,top:20,alignSelf:'center',height:80,borderRadius:100}} source={require('../assets/newSplash_30.png')}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                {img=="" || img==null?
                 <Image style={{width:50,height:50,top:10,borderRadius:100,borderWidth:1,borderColor:"#fff"}} source={{ uri:'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'}}/>:
                 <Image style={{width:50,height:50,top:10,borderRadius:100}} source={{ uri:'http://www.g7technologies.com/widi/public/user_profile_pic/'+img}}/>
                
                }
                <View>
                <Text style={styles.textcolor}>{name}</Text>
                <Text style={{   color:'#fff', marginLeft:20,marginTop:5,marginBottom:3,fontSize:11}}>{email}</Text>
                </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/home.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.closeDrawer(),navigation.navigate('Profile')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/user.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Profile</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('History')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/motorbiking.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>My Orders</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('HelpCenter')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/information.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Help Center</Text>
                </View>
            </TouchableOpacity>
           
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('Settings')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/settings.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Settings</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('TermsandCondotion')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/accept.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Terms and Conditions </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={async()=>
            {
                // navigation.replace('Dashboard')
                await AsyncStorage.setItem('userLogedinDeliveryBoy','false')
                navigation.replace('Login')
            }
                } style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/logout.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Sign out</Text>
                </View>
            </TouchableOpacity>

           
            
        </DrawerContentScrollView>
        
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',    
    },
    ImageContainer:{
        backgroundColor:'#0f76de',
        height:180,
        paddingHorizontal:10,
        justifyContent:'flex-end',
        bottom:20
    },
    textcolor:{
        color:'#fff',
        fontWeight:'bold',
        marginTop:50,
        marginLeft:20
    },
    ButtonConatiner:{
        flexDirection:'row',
        padding:10,
    },
    Icon_image_style:{
        width:15,
        height:15,
        resizeMode:'contain',
        top:10
    },
    buttonSubContainer:{
        marginLeft:10,
        borderBottomWidth:0.4,
        width:'100%',
        borderColor:'#dddddd',
        padding:10
    },
    buton_text_color:{
        color:'#676767',
        fontWeight:'500'
    }
});
