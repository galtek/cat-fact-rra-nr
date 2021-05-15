import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DeviceInfo from 'react-native-device-info';
// import { getApplicationName } from 'react-native-device-info';
//TODO: create iOS and Android projects to run pod install in iOS root file and react link react-native-device-info in out root to update manifest and info for Android

export default class Metrics extends Component {
    constructor(props){
        super(props)
        this.state = {
            loadDelay: "",
            readmeText: "",
            readmeButtonTitle: "Read me details",
            isShowReadMe: false
        }
    }

    componentDidMount(){
        console.log("dataFromMem string")
        this.getStringData()
    }

    myalert = async (val) => {
        alert(val);
        return;
    }

    getJsonData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@cat_list')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
        // error reading value
        console.log("error in AsyncStorage"+e)
        this.myalert("error in AsyncStorage"+e)
        }
    }
    getStringData = async () => {
        try {
          const value = await AsyncStorage.getItem('@networkDelay')
          if(value !== null) {
            // value previously stored
            console.log("loadDelay")
            console.log(value)
            this.setState({
                loadDelay: value
            })
          }else {
              console.log("value is empty")
          }
        } catch(e) {
          // error reading value
          console.log("error in AsyncStorage"+e)
          this.myalert("error in AsyncStorage"+e)
        }
    }

    getReadMe = async () => {

        if (this.state.isShowReadMe){
            this.setState({
                readmeText: "",
                readmeButtonTitle: "Read me details",
                isShowReadMe: false
            })
        }else {
            this.setState({
                readmeText: `Summary
                Create a hybrid app, supporting iOS and/or Android, that queries a Cat Facts data source and presents the results. 
                The app should efficiently show a very long list, using paging where necessary. Selecting an entry in the list should display more information. 
                The user should be able to navigate back and forth between views. The app should capture performance information and display to another view.`,
                readmeButtonTitle: "Hide",
                isShowReadMe: true
            })
        }

        
    }


    render() {
        return (
            <> 
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Metrics</Text>
                </View>
                {/* <Text style={styles.networkDelayText}>Model: {this.state.loadDelay}ms</Text>
                <Text style={styles.networkDelayText}>OS: {this.state.loadDelay}ms</Text> */}
                <Text style={styles.networkDelayText}>Load Delay: {this.state.loadDelay}ms</Text>
                <Button
                    title="Check Mem"
                    onPress={() => this.getStringData()}
                />
                <View style={styles.horrizontalLine} />
                <Button
                    title={this.state.readmeButtonTitle}
                    onPress={() => this.getReadMe()}//() => this.props.navigation.push('Home')
                />
                <Text style={styles.readMeText}>{this.state.readmeText}</Text>
            </>
        )
    }



}//end class App


const styles = StyleSheet.create ({
    container: {
        marginTop: 20,
        backgroundColor: '#f6f6f6'
    },
    headerContainer: {
        backgroundColor: '#287094',
    },
    headerTitle: {
        color: '#f6f6f6',
        textAlign: 'center',
        fontSize: 42, 
        fontWeight: 'bold',
        padding: 20,
        marginTop: 30
    },
    networkDelayText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    readMeText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 5,
        marginTop: 30
    },
    horrizontalLine: {
        borderBottomColor: '#287094',
        borderBottomWidth: 1,
        marginTop: 20
    }
})