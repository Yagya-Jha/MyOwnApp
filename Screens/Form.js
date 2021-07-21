import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';
import db from '../Config';
import * as Font from 'expo-font';

export default class Form extends React.Component{
    constructor(){
        super();
        this.state = {name: '', grade: '', description: '',password: '',username: '', profilePic: 'image_1', dropdownheight: 40};
    }

    createAccount = async(name, grade, description, password, profilePic, username)=>{
        let s_name = name;
        let s_grade = grade;
        let s_description = description;
        let s_password = password;
        let s_profilePic = profilePic;
        let s_username = username;

        console.log(s_name + ', ' + s_grade + ', ' + s_description + ', ' + s_password + ', ' + s_profilePic + ', ' + s_username)

        if(s_name.trim() && s_grade.trim() && s_description.trim() && s_password.trim() ){
   //         if(db.collection("users").where("Username", "!==", s_username).get()){
                db.collection("users").add({
                    'Description': s_description,
                    'Grade': s_grade,
                    'Name': s_name,
                    'Password': s_password,
                    'Username':s_username,
                    'Profilepic': s_profilePic
                });
                this.props.navigation.navigate('ProfileScreen', {username: s_username});
       //     }
         //   else{
           //     Alert.alert("Error", "Username Already Exists Please enter a new one", [{text: 'Ok',onPress: ()=>console.log("ok pressed")}], {cancelable: false})
         //   }
        }else{
            Alert.alert("Error", "All feilds are required", [{text: 'Ok',onPress: ()=>console.log("ok pressed")}], {cancelable: false})
        }

    }

    render(){
        let images = {
            "image_1": require('../assets/Profile_Pictures/profile_img.png'),
            "image_2": require('../assets/Profile_Pictures/profile_img_2.png'),
            "image_3": require('../assets/Profile_Pictures/profile_img_3.png'),
        }
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.safeview}/>
                <Text>Welcome to App Name</Text>
                <Text>Fill This Form To Get Started</Text>

                <ScrollView >
                    <Image source = {images[this.state.profilePic]} style = {styles.profilePic} />
                    <View style = {styles.inputContainer}>
                    <DropDownPicker items = {[
                                    {label: 'image 1', value: 'image_1'},
                                    {label: 'image 2', value: 'image_2'},
                                    {label: 'image 3', value: 'image_3'}
                                ]}
                                defaultValue = {this.state.profilePic}
                                containerStyle = {{height: 40, borderRadius: 20,marginHorizontal: RFValue(10), marginBottom: 10}}
                                style = {{backgroundColor: 'transparent'}}
                                onOpen = {()=>{this.setState({dropdownheight: 170})}}
                                onClose = {()=>{this.setState({dropdownheight: 40})}}
                                itemStyle = {{justifyContent:"flex-start"}}
                                dropDownStyle = {'#2f345d'}
                                labelStyle = {styles.dropDownLabel}
                                arrowStyle = {styles.dropDownLabel}
                                onChangeItem = {items=>this.setState({profilePic: items.value})}
                                />
                    </View>
                    <KeyboardAvoidingView style = {{marginTop:20}} behaviour = "padding" enabled>
                    <View style = {styles.inputContainer}>
                        <Text style = {styles.inputText}>
                            Student Name: 
                        </Text>
                        <TextInput style = {styles.textInputStyle} placeholder = 'Student Name' onChangeText = {(text)=>{this.setState({name: text})}}></TextInput>
                    </View>

                    <View style = {styles.inputContainer}>
                        <Text style = {styles.inputText}>
                            Student Grade: 
                        </Text>
                        <TextInput style = {styles.textInputStyle} placeholder = 'Student Grade' onChangeText = {(text)=>{this.setState({grade: text})}}></TextInput>
                    </View>

                    <View style = {styles.inputContainer}>
                        <Text style = {styles.inputText}>
                            Student Description: 
                        </Text>
                        <TextInput style = {styles.textInputStyle} 
                        multiline = {true}
                        placeholder = 'Student Description' onChangeText = {(text)=>{this.setState({description: text})}}></TextInput>
                    </View>

                    <View style = {styles.inputContainer}>
                        <Text style = {styles.inputText}>
                            Student Username: 
                        </Text>
                        <TextInput style = {styles.textInputStyle} 
                        maxLength = {15}
                        placeholder = 'Username' onChangeText = {(text)=>{this.setState({username: text})}}></TextInput>
                    </View>

                    <View style = {styles.inputContainer}>
                        <Text style = {styles.inputText}>
                            Student Password: 
                        </Text>
                        <TextInput style = {styles.textInputStyle} 
                        
                        secureTextEntry = {true}
                        maxLength = {10}
                        placeholder = 'Password' onChangeText = {(text)=>{this.setState({password: text})}}></TextInput>
                    </View>
                    
                    </KeyboardAvoidingView>

                    <TouchableOpacity style = {styles.submitButton} onPress = {()=>this.createAccount(this.state.name,
                                                                                                      this.state.grade, 
                                                                                                      this.state.description, 
                                                                                                      this.state.password, 
                                                                                                      this.state.profilePic,
                                                                                                      this.state.username)}>
                            <Text style = {[styles.inputText, {textAlign: "center", marginBottom: 10}]}>
                                Create Account
                            </Text>
                        </TouchableOpacity>
                        <View style = {styles.inputContainer}>
                    <Text style = {styles.inputText}>Already Have an account</Text>
                    <TouchableOpacity style = {styles.login} onPress = {()=>this.props.navigation.navigate("LoginScreen")} ><Text style = {styles.inputText}>Login</Text></TouchableOpacity>
                </View>
                    </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        
    },
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        alignItems:"center",
        justifyContent:"center",
    },
    safeview: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        flex: 0.07,
        flexDirection: 'row',
        justifyContent: "center",
    },
    textInputStyle:{
        flex: 0.3,
        backgroundColor: 'white',
        marginLeft: 20,
        alignSelf:"center",
        width: RFValue(300),
        height: RFValue(35),
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 20,
    },
    appTitleText: {
        fontSize: 30,
    },
    inputText: {
        fontSize: 25,
    },
    submitButton:{
        backgroundColor: 'white'
    },
    inputContainer:{

    },
    dropDownLabel: {
        color: 'black',
    },
    profilePic: {
    resizeMode:"contain",
    width: Dimensions.get('window').width-40,
    height: 250,
    borderRadius:10,
    marginBottom:10}
});