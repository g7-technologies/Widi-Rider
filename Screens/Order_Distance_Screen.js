import { connect } from "react-redux";
import React, { useRef, isValidElement, useEffect, useState } from "react";
import {
  Dimensions,
  Animated,
  StyleSheet,
  AppState,
  TextInput,
  Image,
  Text,
  ScrollView,
  View,
  ImageBackground,
  BackHandler
} from "react-native";
import { basepath,Imagebasepath } from "../BasePath/Basepath";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, {PROVIDER_GOOGLE, Marker, Callout,Polyline } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance, getPreciseDistance } from "geolib";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { LocationGeofencingEventType } from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; 
import { Video, AVPlaybackStatus } from 'expo-av';
import { Feather } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var firebaseConfig = {
  apiKey: "AIzaSyB-_1l1k5RmgGk_EvghDsYbP1obo51J6Hw",
  authDomain: "widideliveryboy.firebaseapp.com",
  databaseURL: "https://widideliveryboy-default-rtdb.firebaseio.com",
  projectId: "widideliveryboy",
  storageBucket: "widideliveryboy.appspot.com",
  messagingSenderId: "180629219472",
  appId: "1:180629219472:web:56ce6c7af84dd7570a9015",
  measurementId: "G-RQXZYMT0SW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


  const LOCATION_TASK_NAME = 'background-location-task';
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;
      // console.log(locations[0].coords.latitude)
      Backgroundup(locations[0].coords.latitude,locations[0].coords.longitude,)
    }
  });
  async function Backgroundup(lat,lng) 
  {
    let user = await AsyncStorage.getItem("DELIVERY_BOY_USER_DATA");
    console.log('back groudn location worksssss')
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    let user_id = JSON.parse(user);
    firebase
      .database()
      .ref("users/" + user_id.id)
      .set({
        latitude: lat,
        longitude: lng,
        timestamp: datetime
      });
  }
  var is_order_complete=false
  const GEO_FENCING_LOCATION = 'location-task';
  TaskManager.defineTask(GEO_FENCING_LOCATION, ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      return;
    }
    if (eventType === LocationGeofencingEventType.Enter) {
      // console.log("You've entered region:", region);
      navigation.navigate('orderComplete' ,{'orderstatus':orderstatus})
      is_order_complete=true
    } else if (eventType === LocationGeofencingEventType.Exit) {
      // console.log("You've left region:", region);
      is_order_complete=false
    }
  });
  // TaskManager.defineTask(GEO_FENCING_LOCATION, ({ data, error }) => {
  //     if (error) {
  //       // Error occurred - check `error.message` for more details.
  //       return;
  //     }
  //     console.log('geofencing data',data)
       
        
  //       //console.log(locations[0].coords.latitude)
  //       console.log('geofencing data',data.eventType)
  //       if(data.eventType==1){
  //      is_order_complete=true
  //       }else{
  //       is_order_complete=false
  //       }
      
  // });
  
 
function MapScreen({ navigation ,route}) {
  
  const [location, setLocation] = useState(null);
  const [user_latitude,userlatitude]=useState(route.params.user_latitude)
  const [user_longitude,userlongitude]=useState(route.params.user_longitude)
  const [hotel_latitude,hotellatitude]=useState(route.params.hotel_latitude)
  const [hotel_longitude,hotellongitude]=useState(route.params.hotel_longitude)
  const [latitude, getlatitude] = useState(32.463364);
  const [longitude, getlongitude] = useState(74.34345);
  const [orderstatus,order_status]=useState(route.params.order)
  const [distancecoords,getdistancecoords]=useState(null)
  const [place_name,placename]=useState('Hotel')
  const [errorMsg, setErrorMsg] = useState(null);
  const [id, userid] = useState("");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [deliver_tick,set_deliver_tick]=useState(false)

  const mapref = React.useRef(null);
  

  function centerMap() 
  {
    let latitude = location.latitude;
    let longitude = location.longitude;
    let latitudeDelta = 0.01;
    let longitudeDelta = 0.01;

    mapref.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
 
  }
  
  useEffect(() => {
    navigation.addListener('focus', () => {
      GetUserLocation();

       const backAction = () => {
     
       navigation.goBack(null)
     
      return true;
    };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();

      // alert('alert get updated data')\\

      // var query = firebase.database().ref("orders").orderByKey();
      // query.on("value",  (snapshot) => {
      //   snapshot.forEach( (childSnapshot)=> {
      //     var childData = childSnapshot.val();
      //     // if(CalculateDistanceBetweenRiderAndResturant(lat,lng,childData.data.resturant.latitude,childData.data.resturant.longitude)){
      //     //   x.push(childData.data);
      //     // }
      //     alert('run')
      //   });
      //   //resturantlist(x);
      // });
  
      
    });
   
    // GetUserLocation();
    
  }, []);
  async function StartGeoFencing() {
   await Location.startGeofencingAsync(GEO_FENCING_LOCATION, [{
       latitude:latitude,
       longitude:longitude,
       radius:20,
       notifyOnEnter:true,
       notifyonExit:true
   }])
  }
  
  async function GetUserLocation() 
  {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

     await Location.watchPositionAsync(
      {accuracy:Location.Accuracy.BestForNavigation,timeInterval:10000},
        (location)=>{  setLocation(location.coords),GetFirebaseOrdersData(location.coords.latitude,location.coords.longitude,location),saveDeliveryBoyLocation(location.coords.latitude,location.coords.longitude,location)}
      );
     
  }
  

  // async function  StartBackgroundLocationUpdate  () {
  //   const { status } = await Location.requestPermissionsAsync();
  //   if (status === 'granted') {
  //     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, { 
  //       accuracy: Location.Accuracy.BestForNavigation,
  //       timeInterval: 10000,
  //       // // distanceInterval: LOCATION_DISTANCE_INTERVAL,
  //       // foregroundService: {
  //       //     notificationTitle:' LOCATION_TITLE',
  //       //     notificationBody: 'LOCATION_SUBTITLE'
  //       // }
  //     });
  //   }else{
  //     alert('Permission to access location was denied pleaase enable it from setting')
  //   }
  // };
  // async function StopBackgroundLocationUpdate(params) {
  //   await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME,()=>console.log('Location update stop '))
  // }

  // useEffect(() => {
  //   AppState.addEventListener("change", _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener("change", _handleAppStateChange);
  //   };
  // }, []);
  // const _handleAppStateChange = (nextAppState) => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
  //     StopBackgroundLocationUpdate()
  //   }else{
  //     StartBackgroundLocationUpdate()
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
   
  // };

  // useEffect(()=>{
  //   // Get User Position after each minute
  //   (async () => 
  //   {
        
  //     await Location.watchPositionAsync(
  //       { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 15000 },
  //       (e) => {setLocation(e.coords),console.log('getting new location'),GetFirebaseOrdersData(e.coords.latitude,e.coords.longitude,e)}
  //     );
  //   })();
  // })
 

  var x =null; 
  async function GetFirebaseOrdersData(lat,lng) 
  {
    
    
    var query = await firebase.database().ref("order_status/"+orderstatus).orderByKey();
    query.on("value",  (snapshot) => {
      x=snapshot.val().status
      //  alert(typeof x)
      if(x===3)
      {
        // alert('user path')
        set_deliver_tick(true);
        let latis=user_latitude
        let lngis=user_longitude
        // alert(latis)
        getlatitude(latis)
        getlongitude(lngis)  
        placename('Customer')
  
        // saveDeliveryBoyLocation(location.latitude,location.longitude)
      setTimeout(() => {
        Directions(lat,lng,latis,lngis)
      }, 3000);
       
      StartGeoFencing()
       
  
      }else{
        // alert('Hotel path')
  
        let latis=parseFloat(hotel_latitude)
        let lngis=parseFloat(hotel_longitude)
        getlatitude(latis)
        getlongitude(lngis)
  
        setTimeout(() => {
          Directions(lat,lng,latis,lngis)
        }, 3000);
         
        
      }
    });

    
  }
  async function Directions(lat,lng,latis,lngis) {
    
    const resp = await fetch(
      //32.189631,74.180146
      //32.161663,74.192826        
      `https://maps.googleapis.com/maps/api/directions/json?origin=${lat},${lng}&destination=${latis},${lngis}&key=AIzaSyAt5-CxLbAkGYgmOc7K8tEnVGRF7Ll9BgA`
    );
    const response = await resp.json();
    // console.log(response)

    let points = response.routes[0].overview_polyline.points;
    console.log('points.....................................................................',points)
    decode(points);
    
    // alert(points)
    // decode(points);
  };
  async function decode  (encoded) {
    // array that holds the points

    var points = [];
    var index = 0,
      len = encoded.length;
    var lat = 0,
      lng = 0;
    while (index < len) {
      var b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii                                                                                    //and substract it by 63
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      var dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    let destinationpoints = points;
    getdistancecoords(destinationpoints)
    // this.setState({ coordss: destinationpoints, });

  };
  




  async function saveDeliveryBoyLocation(lat, lng) {
    let user = await AsyncStorage.getItem("DELIVERY_BOY_USER_DATA");
    let user_id = JSON.parse(user);
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    firebase
      .database()
      .ref("users/" + user_id.id)
      .set({
        latitude: lat,
        longitude: lng,
        timestamp: datetime
      });
  }

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      StopBackgroundLocationUpdate()
    }else{
      StartBackgroundLocationUpdate()
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    
  };

  async function StopBackgroundLocationUpdate() {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME,()=>console.log('Location update stop '))
  }
  async function  StartBackgroundLocationUpdate  () {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, { 
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,
        // // distanceInterval: LOCATION_DISTANCE_INTERVAL,
        // foregroundService: {
        //     notificationTitle:' LOCATION_TITLE',
        //     notificationBody: 'LOCATION_SUBTITLE'
        // }
      });
    }else{
      alert('Permission to access location was denied pleaase enable it from setting')
    }
  };
  
  async function  Complete_Order (){
    console.log('xxxxxxxxxxxxxxxxxxxxx')
    const formData = new FormData()
    console.log(orderstatus)
    formData.append('order_id', orderstatus);
   
    try{
      fetch(`${basepath}complete_order`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log('token')
         console.log( responseJson)
         console.log('token')
       navigation.goBack(null)
      //  is_order_complete=false
      })
      .catch((error) =>{});
    }catch(e){}
  }

 

  return (
    <View style={{flex:1}}>
    {/* {is_order_complete?
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>  navigation.popToTop()} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Order Complete</Text>
        </TouchableOpacity>
       
      </View>
      <View style={{flex:1,}}>
        <Video
            style={{width:300,alignSelf:'center',height:300}}
            source={require( '../Video_animations/kk3tv5hf.mp4')}
            shouldPlay={true}
            resizeMode="contain"
            isLooping
        />
        <TouchableOpacity onPress={()=>Complete_Order()} style={styles.LoginButton}>
          <Text style={styles.textStyle}>Mark as Delivered</Text>
        </TouchableOpacity>
      </View>
    </View>
: */}
    <View style={{ flex: 1 }}>
      
      {location == null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading Map Please Wait</Text>
        </View>
      ) : (
        <View>
           <View style={{  backgroundColor:'#0f76de', height:60,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10 }}>
          <TouchableOpacity onPress={()=>navigation.goBack(null)} >
              {Platform.OS=='ios'?
                  <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                  :
                  <Ionicons name="md-arrow-back" size={24} color="#FFF" />
              }
         </TouchableOpacity>

              <Text style={styles.textcolor}>Track</Text>
              {deliver_tick==true?
              <TouchableOpacity onPress={()=>navigation.navigate('orderComplete' ,{'orderstatus':orderstatus})}>
           <Feather style={{marginTop:5}} name="check" size={25} color="#fff" />       
           </TouchableOpacity>
           :
           <View><Text></Text></View>
              }
        </View>
        <MapView
          ref={mapref}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={{width:'100%',height:'100%'}}
        >
          <Marker
            title="asdadasdasdas"
            // color='#0f76de'
            pinColor='#0f76de'
            //image={require("../assets/Delivery_Boy.png")}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
          <Image source={require("../assets/Delivery_Boy.png")} style={{width:50,height:50}}/>
            <Callout>
              <Text>My Location</Text>
            </Callout>
          </Marker>

          <Marker
            // title="asdadasdasdas"
            //image={require("../assets/Delivery_Boy.png")}
            coordinate={{latitude:latitude,longitude:longitude}}
          >
            <Image source={require("../assets/destinationMap.png")} style={{width:70,height:70}}/>

            <Callout>
              <Text>{place_name}</Text>
            </Callout>
          </Marker>
          {distancecoords==null?null:
          <Polyline
            coordinates={distancecoords}
            strokeColor="red"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={4}
          />
         }
       
        </MapView>
        </View>
      )}
      <View style={{ position: "absolute", alignSelf: "flex-end" ,marginTop:60}}>
        <TouchableOpacity onPress={() => centerMap()}>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            style={{ alignSelf: "flex-end", margin: 10 }}
            size={24}
            color="#0f76de"
          />
        </TouchableOpacity>
       
      </View>
    </View>
{/* } */}
</View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  LoginButton:{
    backgroundColor:'#0f76de',
    padding:12,
    margin:20,
    borderRadius:5,
    //alignSelf:'center',
},
});