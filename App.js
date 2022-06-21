
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Screens
import Login from './Screens/Login'
import Intro from './Screens/Intro_Screen'
import Phone from './Screens/Phone_Number_Screen'
import PhoneAuth from './Screens/Phon_Number_Authentication_Screen'
import Signup from './Screens/Signup'
import Forgot from './Screens/Forgot_Password'
import Dashboard from './Screens/Dashboard_Screen'
import Profile from './Screens/Profile'
import Settings from './Screens/Settings';
import HelpCenter from './Screens/HelpCenter'
import TermsandCondotion from './Screens/TermsandCondition'
import ChangePassword from './Screens/Change_Password'
import ChangeEmail from './Screens/Change_Email'
import ChangePhone from './Screens/Change_Phone'
import SetPassword from "./Screens/SetPassword";
import Update_PhoneAuth from './Screens/Update_Phon_Number_Authentication_Screen'
import Privacy_Policy from './Screens/Privacy_Policy'
import Confirmorder from './Screens/Confirm_Order'
import History from './Screens/History'
import Idcardimage from './Screens/ID_Card_Pic'
import OrderInfo from './Screens/Order_Info'
import  OrderList from "./Screens/Order_List";
import OrderDistenceScreen from './Screens/Order_Distance_Screen'
import  Complete_Order_Status from "./Component/Completed_Order_Status";
import store from './Store/Index'
import Social_Idcard_Pic from "./Screens/Social_ID_Card_Pic";
import  FoodDelivered from "./Screens/Food_Delivered";
import orderComplete from './Screens/order_complete'
const Stack = createStackNavigator();
const Stacknot = createStackNavigator();

const Stacklogin = createStackNavigator();

const StackScreens=()=>{
  return(
  <Stack.Navigator>      
    <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}} />
    <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
    <Stack.Screen name="Profile" component={Profile}  options={{headerShown:false}}/>

    <Stack.Screen name="Signup" component={Signup}  options={{headerShown:false}}/>
    <Stack.Screen name="phone" component={Phone}  options={{headerShown:false}}/>
    <Stack.Screen name="phoneauth" component={PhoneAuth}  options={{headerShown:false}}/>
    <Stack.Screen name="Idcardimage" component={Idcardimage}  options={{headerShown:false}}/>
    <Stack.Screen name="forgotpassword" component={Forgot}  options={{headerShown:false}}/>
    <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}} />
    <Stack.Screen name="Confirmorder" component={Confirmorder} options={{headerShown:false}} />
    <Stack.Screen name="History" component={History} options={{headerShown:false}} />
    <Stack.Screen name="OrderInfo" component={OrderInfo} options={{headerShown:false}} />
    <Stack.Screen name="OrderDistenceScreen" component={OrderDistenceScreen} options={{headerShown:false}} />
    <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}} />
    <Stack.Screen name="HelpCenter" component={HelpCenter} options={{headerShown:false}} />
    <Stack.Screen name="TermsandCondotion" component={TermsandCondotion} options={{headerShown:false}} />
    <Stack.Screen name="ChangeEmail" component={ChangeEmail} options={{headerShown:false}} />
    <Stack.Screen name="ChangePhone" component={ChangePhone} options={{headerShown:false}} />
    <Stack.Screen name="SetPassword" component={SetPassword} options={{headerShown:false}} />
    <Stack.Screen name="Update_PhoneAuth" component={Update_PhoneAuth}  options={{headerShown:false}}/>
    <Stack.Screen name="PricavyPolicy" component={Privacy_Policy}  options={{headerShown:false}}/>
    <Stack.Screen name="Complete_Order_Status" component={Complete_Order_Status}  options={{headerShown:false}}/>
    <Stack.Screen name="Social_Idcard_Pic" component={Social_Idcard_Pic}  options={{headerShown:false}}/>
    <Stack.Screen name="OrderList" component={OrderList}  options={{headerShown:false}}/>
    <Stack.Screen name="FoodDelivered" component={FoodDelivered}  options={{headerShown:false}}/>
    <Stack.Screen name="orderComplete" component={orderComplete}  options={{headerShown:false}}/>

    
  </Stack.Navigator>)
}
const Login_Stack=()=>{
  return(
  <Stacknot.Navigator>      
    {/* <Stacknot.Screen name="Intro" component={Intro} options={{headerShown:false}} /> */}
    
    <Stacknot.Screen name="Login" component={Login} options={{headerShown:false}} />
    <Stack.Screen name="Profile" component={Profile}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Signup" component={Signup}  options={{headerShown:false}}/>
    <Stacknot.Screen name="phone" component={Phone}  options={{headerShown:false}}/>
    <Stacknot.Screen name="phoneauth" component={PhoneAuth}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Idcardimage" component={Idcardimage}  options={{headerShown:false}}/>
    <Stacknot.Screen name="forgotpassword" component={Forgot}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
    <Stacknot.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}} />
    <Stacknot.Screen name="Confirmorder" component={Confirmorder} options={{headerShown:false}} />
    <Stacknot.Screen name="History" component={History} options={{headerShown:false}} />
    <Stacknot.Screen name="OrderInfo" component={OrderInfo} options={{headerShown:false}} />
    <Stacknot.Screen name="OrderDistenceScreen" component={OrderDistenceScreen} options={{headerShown:false}} />
    <Stacknot.Screen name="Settings" component={Settings} options={{headerShown:false}} />
    <Stacknot.Screen name="HelpCenter" component={HelpCenter} options={{headerShown:false}} />
    <Stacknot.Screen name="TermsandCondotion" component={TermsandCondotion} options={{headerShown:false}} />
    <Stacknot.Screen name="ChangeEmail" component={ChangeEmail} options={{headerShown:false}} />
    <Stacknot.Screen name="ChangePhone" component={ChangePhone} options={{headerShown:false}} />
    <Stacknot.Screen name="SetPassword" component={SetPassword} options={{headerShown:false}} />
    <Stacknot.Screen name="Update_PhoneAuth" component={Update_PhoneAuth}  options={{headerShown:false}}/>
    <Stacknot.Screen name="PricavyPolicy" component={Privacy_Policy}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Complete_Order_Status" component={Complete_Order_Status}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Social_Idcard_Pic" component={Social_Idcard_Pic}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Intro" component={Intro} options={{headerShown:false}} />
    <Stacknot.Screen name="OrderList" component={OrderList}  options={{headerShown:false}}/>
    <Stacknot.Screen name="FoodDelivered" component={FoodDelivered}  options={{headerShown:false}}/>
    <Stack.Screen name="orderComplete" component={orderComplete}  options={{headerShown:false}}/>

  </Stacknot.Navigator>)
}
const Dashboard_Stack=()=>{
  return(
    <Stacklogin.Navigator>      

    
    <Stacklogin.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
    <Stacklogin.Screen name="Login" component={Login} options={{headerShown:false}} />
    <Stacklogin.Screen name="Profile" component={Profile} options={{headerShown:false}} />
    <Stacklogin.Screen name="Signup" component={Signup}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="phone" component={Phone}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="phoneauth" component={PhoneAuth}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="Idcardimage" component={Idcardimage}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="forgotpassword" component={Forgot}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}} />
    <Stacklogin.Screen name="Confirmorder" component={Confirmorder} options={{headerShown:false}} />
    <Stacklogin.Screen name="History" component={History} options={{headerShown:false}} />
    <Stacklogin.Screen name="OrderInfo" component={OrderInfo} options={{headerShown:false}} />
    <Stacklogin.Screen name="OrderDistenceScreen" component={OrderDistenceScreen} options={{headerShown:false}} />
    <Stacklogin.Screen name="Settings" component={Settings} options={{headerShown:false}} />
    <Stacklogin.Screen name="HelpCenter" component={HelpCenter} options={{headerShown:false}} />
    <Stacklogin.Screen name="TermsandCondotion" component={TermsandCondotion} options={{headerShown:false}} />
    <Stacklogin.Screen name="ChangeEmail" component={ChangeEmail} options={{headerShown:false}} />
    <Stacklogin.Screen name="ChangePhone" component={ChangePhone} options={{headerShown:false}} />
    <Stacklogin.Screen name="SetPassword" component={SetPassword} options={{headerShown:false}} />
    <Stacklogin.Screen name="Update_PhoneAuth" component={Update_PhoneAuth}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="PricavyPolicy" component={Privacy_Policy}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="Complete_Order_Status" component={Complete_Order_Status}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="Social_Idcard_Pic" component={Social_Idcard_Pic}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="Intro" component={Intro} options={{headerShown:false}} />
    <Stacklogin.Screen name="OrderList" component={OrderList}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="FoodDelivered" component={FoodDelivered}  options={{headerShown:false}}/>
    <Stack.Screen name="orderComplete" component={orderComplete}  options={{headerShown:false}}/>

  </Stacklogin.Navigator>)
}
export default   function App() {
  // const logged=userstate
  //  alert(skipintro) 
  const [logedinuser,islogedinuser]= React.useState(false)
  const [skipintroscreen,introscreen]=React.useState(false)
   const [loaded,fontloaded]= Font.useFonts({ 
      poppin:require('./assets/Poppins/Poppins-Regular.ttf'),
      poppinbold:require('./assets/Poppins/Poppins-SemiBold.ttf')
    });
  React.useEffect(()=>{
   UserSession();
    
  },[])
  async function UserSession() {
    const introstatus=await AsyncStorage.getItem('toLoginScreenDeliveryBoy')
   const userloginstatus=await AsyncStorage.getItem('userLogedinDeliveryBoy')
   //works when async is set to true //Passing its value to skipintroscreen
   introscreen(introstatus)
   //?
   islogedinuser(userloginstatus) 

  //  alert(typeof introstatus)
  // alert(typeof userloginstatus)
  }
   

  if(!loaded){
    return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
      <Text>Loading Your Application</Text>
    </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* {console.disableYellowBox=true} */}
      <StatusBar style="dark" backgroundColor="blue" hidden={true}/>
    <Provider store={store}>
        <NavigationContainer >
         {/*Skip intro is true when receive from async  */}
       
        {callthis(skipintroscreen,logedinuser)}
          
        </NavigationContainer>
    </Provider>
    </View>
  );
}
function callthis(skipintro,logedinstatus) {
console.log('Skip intro   '+  skipintro  +'   skip dashboard  '+  logedinstatus)
console.log('Skip intro type   '+  typeof skipintro  +'   skip dashboard type   '+   typeof logedinstatus)

if(skipintro=='true'){
    if(logedinstatus=='true'){
      return <Dashboard_Stack/>
      // alert('going to ggg')
    }else if(logedinstatus=='false'){
      return <Login_Stack/>
      // alert('going to Login')
    }else if(logedinstatus==null){
      return <Login_Stack/>
      // alert('going to Login')
    }
    
  }else if(skipintro=='false'){
    return <StackScreens/>
    // alert('going to intro')
  }else if(skipintro==null){
   
    return <StackScreens/>
  }
  // {skipintroscreen=='true'?
  // logedinuser=='true'?
  // (<Dashboard_Stack/>)
  // :(<Login_Stack/>):
  // (<StackScreens/>)}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  
});
