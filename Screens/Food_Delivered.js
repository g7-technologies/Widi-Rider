import React from 'react';
import { StyleSheet,FlatList,Image,TouchableOpacity, Text, View } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import FAQ from '../Component/FAQ'
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox  from "../Component/CheckBox";
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            privacy_policy:''
        }
    }

    
  render() {
    return (

    <>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
                {Platform.OS=='ios'?
                    <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                    :
                    <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
                }
                <Text style={styles.textcolor}>Setting</Text>

            </TouchableOpacity>
        </View>
       <ScrollView>
        <Text>Food delivered</Text>
       </ScrollView>
        
    </>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  header:{
    backgroundColor:'#0f76de',
    height:60,
    justifyContent:'center',
    
  },
  textcolor:{
   fontFamily:'poppinbold',
    color:'#fff',
    top:4,
    marginLeft:30
  },
});