
import React, { useState } from 'react';
import { ScrollView, StyleSheet,Image, Text, Modal, TouchableOpacity, View } from 'react-native';
import { Ionicons,AntDesign,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
export default function App({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <>
    <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('MyCart')} style={{flexDirection:'row',margin:5,marginLeft:20,top:10}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Confirm Order</Text>
        </TouchableOpacity>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          
        <View style={styles.CardContainer}>
            <View style={{...styles.miniContainer,marginTop:15}}>
                <Text>Subtotal</Text>
                <Text>PKR 1000</Text>
            </View>
            <View style={styles.miniContainer}>
                <Text>Delivery fee</Text>
                <Text>PKR 90</Text>
            </View>
           
            <View style={styles.miniContainer}>
                <Text>GST</Text>
                <Text>PKR 10</Text>
            </View>
            <View style={styles.miniContainer}>
                <Text style={{fontWeight:'bold'}}>Do You have a voucher</Text>    
            </View>
            <View style={styles.borderLine}/>
            <View style={{...styles.miniContainer,top:10}}>
                <Text style={styles.colortext}>Total</Text>
                <Text style={styles.colortext}>PKR 1100</Text>
            </View>
        </View>
        <View style={styles.ContactCardContainer}>
            <View style={{...styles.miniContainer,marginTop:15}}>
                <Text style={styles.colortext}>Contact info</Text>
                <Text>someone@gmail.com</Text>
            </View>
            <View style={styles.borderLine}/>
            <Text></Text>
            <View style={{...styles.miniContainer,marginVertical:10}}>
                <Text style={styles.colortext}>Delivery detail: Home</Text>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Change</Text>
                    <AntDesign name="right" size={16}  />
                </TouchableOpacity>
               
            </View>
           <Text style={{marginLeft:10,fontSize:12}}>H/No 65 Street # Logos</Text>
           <View style={{marginVertical:5}}/>
           <View style={styles.borderLine}/>
           <View style={{...styles.miniContainer,marginTop:20}}>
                <Text style={styles.colortext}>Delivery time</Text>
                <Text>45 mins</Text>
            </View>
            
        </View>
        <View style={styles.PayentCardContainer}>
            <View style={styles.miniContainer}>
                <Text style={styles.colortext}>Payment method</Text>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Change</Text>
                    <AntDesign name="right" size={16}  />
                </TouchableOpacity>
            </View>
            <View style={styles.miniContainer}>
                
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../assets/money.png')} style={{marginHorizontal:5,resizeMode:'contain',width:15,height:15}}/>
                    <Text style={styles.colortext}>Cash</Text>
                </TouchableOpacity>
                <Text style={{marginRight:5}}>PKR 1100</Text>
            </View>
        </View>
        
     
      <TouchableOpacity onPress={() => {
          setModalVisible(true);
        }} style={styles.LoginButton}>
          <Text style={styles.text}>Confirm Order</Text>
      </TouchableOpacity>
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
    </>
  );
}
//colors on focus #97c6f4
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
        shadowOffset:{width:0.5,height:0.5}
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
        shadowOffset:{width:0.5,height:0.5}
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
