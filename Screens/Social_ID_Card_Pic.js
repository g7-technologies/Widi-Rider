
import React, { useState,useEffect } from 'react';
import { ScrollView, ImageBackground,StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
export default function IDCARD({navigation,route}){
  
    const [fontside, setfrontImage] = useState(null);
    const [backside, setbackImage] = useState(null);
    const [Card_front_side,front_side_of_idCard]=useState([])
    const [Card_back_side,back_side_of_idCard]=useState([])
    const [phone,phonenumber]=useState(route.params.phone)
    const [cardnumber,IDcardnumber]=useState('')
    const [error_message,show_error]=useState('')
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
      const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64:true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setfrontImage(result.uri);
            front_side_of_idCard(`data:image/jpg;base64,${result.base64}`)
          // this.sendpic(result.uri,)
        }
      };
      const pickImage2 = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64:true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setbackImage(result.uri);
            back_side_of_idCard(`data:image/jpg;base64,${result.base64}`)
          // this.sendpic(result.uri,)
        }
      };
    return(
        <ScrollView  style={styles.container}>
           <View style={{marginTop:50}}>
               <Image style={{width:180,alignSelf:'center',height:180,resizeMode:'contain'}} source={require('../assets/undraw_Personal_site_re_c4bp.png')}/>
            </View>
           <Text style={{marginLeft:10,color:'#8c8c8c',fontWeight:'400',marginVertical:10}}>ID Card Detail </Text>
           <View>
            <TextInput onChangeText={(idcardnumber)=>IDcardnumber(idcardnumber)}  placeholder='CNIC NUMBER' keyboardType='number-pad' placeholderTextColor={'#8c8c8c'} style={styles.input}/>
           </View>
           <Text style={{marginLeft:10,color:'#8c8c8c',fontWeight:'400',marginVertical:10}}>ID Card Image </Text>
           <View style={{flexDirection:'row',}}>
            {fontside==null?

                <TouchableOpacity onPress={pickImage} style={{width:'50%',alignSelf:'center'}}>
                    
                        <Entypo name="camera" style={{alignSelf:'center'}} size={40} color="#8c8c8c" />
                   
                    {/* undraw_Hire_re_gn5j */}
                    <Text style={{textAlign:'center',marginTop:10}}>Front  Side</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={pickImage} style={{width:'50%'}}>
                    
                    <ImageBackground style={{width:150,height:100,alignSelf:'center',justifyContent:'center',alignItems:'center'}} source={{uri:fontside}}>
                        
                    </ImageBackground>
               
                    <Text style={{textAlign:'center',marginTop:10}}>Front  Side</Text>
                </TouchableOpacity>
            }
            {backside==null?
            <TouchableOpacity onPress={pickImage2} style={{width:'50%'}}>
                
                    <Entypo name="camera" style={{alignSelf:'center'}} size={40} color="#8c8c8c" />
                
                <Text style={{textAlign:'center',marginTop:10}}>Back  Side</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={pickImage2} style={{width:'50%'}}>
                <ImageBackground style={{width:160,height:100,justifyContent:'center',alignSelf:'center',alignItems:'center'}}  source={{uri:backside}}>
                   
                </ImageBackground>
                <Text style={{textAlign:'center',marginTop:10}}>Back  Side</Text>
            </TouchableOpacity>

            }
               
            
           </View>
           <Text style={{textAlign:'center',marginVertical:5,color:'red',fontFamily:'poppin'}}> {error_message}</Text>
            <TouchableOpacity onPress={()=>{
              if(Card_front_side.length<1  ){
                show_error('Front Side Image require')
              }else if (Card_back_side.length<1){
                show_error('Back Side Image require')

              }else{
                show_error('')
              
              navigation.navigate('Dashboard')}}} style={styles.LoginButton}>
                <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
       
        backgroundColor:'#fff'
    },
    input:{
        borderWidth:1,
        padding:12,
        margin:10,
        borderRadius:5,
        fontWeight:'bold',
        borderColor:'#8c8c8c'
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:8,
        margin:20,
        borderRadius:5
    },
    text:{
        fontWeight:'900',
        fontSize:15,
        textAlign:'center',
        letterSpacing:1,
        color:'#fff'
    }
})