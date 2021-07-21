import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import db from '../Config';

//const font = 

export default class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
            fontLoaded: false,
            data: []
        };
    }


    fetchUser = async()=>{
        let username = this.props(state.params);
        console.log(username);
        let data = await db.collection("users").where("Username", '==', username).get();
        if(data){
            this.setState({data: data})
            console.log(this.state.data);
        }
    }

    componentDidMount(){
        this.fetchUser();
    }

    keyExtractor = (index, item)=> index.toString()

    renderItem = ({item})=>(          
        <View>
          <Text>{"Student name "+ item.Name}</Text>
        </View>
        )

    render(){
        return(
            <View style = {styles.container}>
                 <SafeAreaView style = {styles.safeview}/>
                    <Text>App Name</Text>
                    <Text>Profile</Text>
                    <View>
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.data}
                        renderItem = {this.renderItem}
                         />
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignSelf:"center",
        alignItems:"center",
    },
    safeview: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appname:{

    }
});