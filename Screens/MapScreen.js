import React, { useRef, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  AppState,
  Text,
  View
} from "react-native";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPreciseDistance } from "geolib";
import * as TaskManager from 'expo-task-manager';

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
  if (error) 
  {
      console.log(error)
    return;
  }

  if (data) 
  {
    const { locations } = data;
    Backgroundup(locations[0].coords.latitude,locations[0].coords.longitude,)
  }
});
async function Backgroundup(lat,lng) 
  {
    let user = await AsyncStorage.getItem("DELIVERY_BOY_USER_DATA");
    var currentdate = new Date(); 
    console.log('Backgroundup save firebase data')
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
 
function MapScreen({ navigation }) {
  const [resturants, resturantlist] = useState([]);
  const [location, setLocation] = useState(null);
  const [getlocation, getLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [id, userid] = useState("");
  
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
      //alert('alert get updated data')\\

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
  
      GetUserLocation();
    });
    
    // GetUserLocation();
    
  }, []);
  
  async function GetUserLocation() 
  {  
    // alert('h');
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

     await Location.watchPositionAsync(
      {accuracy:Location.Accuracy.BestForNavigation,timeInterval:10000},
        (location)=>{ getLocation(location.coords), setLocation(location.coords),GetFirebaseOrdersData(location.coords.latitude,location.coords.longitude,location),saveDeliveryBoyLocation(location.coords.latitude,location.coords.longitude)}
      );
  }

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

    console.log('set firebase data saveDeliveryBoyLocation')
    firebase
      .database()
      .ref("users/" + user_id.id)
      .set({
        latitude: lat,
        longitude: lng,
        timestamp: datetime
      });
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
 

  
  function GetFirebaseOrdersData(lat ,lng,) 
  {
    var x = [];
    var query = firebase.database().ref("orders").orderByKey();
    query.on("value",  (snapshot) => {
      snapshot.forEach( (childSnapshot)=> {
        var childData = childSnapshot.val();
        if(CalculateDistanceBetweenRiderAndResturant(lat,lng,childData.data.resturant.latitude,childData.data.resturant.longitude)){
          x.push(childData.data);
        }
       
      });
      resturantlist([]);
      resturantlist(x);
    });


   
   //saveDeliveryBoyLocation(lat,lng)
    // alert('data is load from firebase lat is ' +lat+'      lng is'+lng)
  }


  const CalculateDistanceBetweenRiderAndResturant = (user_lat,user_lng,hotel_lat,hotel_lng) => {
    var pdis = getPreciseDistance(
      { latitude: user_lat, longitude: user_lng },
      { latitude: hotel_lat, longitude: hotel_lng }
    );
    if(pdis/1000<10){
     return true
    }else{
      return false
    }
  };

  function ordersAgainstHotel(resturant_id) 
  {
    let x = [];
    resturants.forEach(element => {
      if(element.resturant_id == resturant_id)
      {
        x.push(element)
      }
    });
    navigation.navigate("OrderList", { data: x})
    
  }

  return (
    <View style={{ flex: 1 }}>
      {location == null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading Map Please Wait</Text>
        </View>
      ) : (
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
            <Callout>
              <Text>My Location</Text>
            </Callout>
          </Marker>

          {resturants.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(marker.resturant.latitude),
                longitude: parseFloat(marker.resturant.longitude),
              }}
            >
              <Callout
                onPress={() =>
                  // navigation.navigate("OrderInfo", { data: marker })
                 ordersAgainstHotel(marker.resturant_id)
                }
              >
                <View>
                <Text>View Orders </Text>
                </View>
              </Callout>
            </Marker>
          ))}
       
        </MapView>
      )}
      <View style={{ position: "absolute", alignSelf: "flex-end" }}>
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
});
