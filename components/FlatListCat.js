import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { breedsList } from '../dataModel/hooks';



export default class FlatListCat extends Component {//({ navigation })
    constructor(props){
        super(props)
        this.state = {
            data: [],
            page: 1,
            isLoading: false,
            isEndList: false,
            startTimeM: new Date().getTime(),
            durationM: 0
        }
    }


    componentDidMount(){
        console.log("componentDidMount")
        this.setState({ isLoading: true }, this.getData)
        if (global.NETWORK_TIME_ACCUM === 0){
            this.setState({
                durationM: new Date().getTime() - this.state.startTimeM
            })
        } else {
            global.NETWORK_TIME_ACCUM = ( global.NETWORK_TIME_ACCUM + (new Date().getTime() - this.state.startTimeM) ) / 2
            this.setState({
                durationM: global.NETWORK_TIME_ACCUM
            })
        }
        
    }
    componentWillUnmount(){
        
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")

        console.log("this.state.durationM")
        console.log(this.state.durationM)
        this.storeStringData('@networkDelay',this.state.durationM.toString())
    }

    

    //data
    //JSON Objects
    // data:
    // {
    //     breed: "Colorpoint Shorthair",
    //     country: "",
    //     origin: "",
    //     coat: "Short",
    //     pattern: ""
    // }
    // {
    //     fact: "The lightest cat on record is a blue point Himalayan called Tinker Toy, who weighed 1 pound, 6 ounces (616 g). Tinker Toy was 2.75 inches (7 cm) tall and 7.5 inches (19 cm) long.",
    //     length: 178
    //  }
    // "next_page_url": "https://catfact.ninja/breeds?page=2",
    // "path": "https://catfact.ninja/breeds",
    // "per_page": 25,
    // "prev_page_url": null,
    // "to": 25,
    // "total": 98,
    getData = async () => {
        const apiURL = "https://catfact.ninja/breeds?limit=30&page=" + this.state.page
        fetch(apiURL).then((res) => res.json())
        .then((resJson) => {

            if(resJson.isEmpty){
                console.log("Is an Empty JSON")
                let alrt = () => this.myalert("You are offline or have problem to collect data")
                alrt()
                console.log("You are offline or have problem to collect data")
                this.getJsonData()
            }else{
                console.log("Is NOT Empty JSON")

                if (resJson.next_page_url != null){
                    console.log("is NOT end of list")
                    this.setState({
                        data: this.state.data.concat(resJson.data),//for pagination join array
                        isLoading: false,
                        isEndList: false
                    })
                    let save = () => this.storeJsonData("@cat_list",this.state.data)
                    save()
                } else {
                    console.log("It is end of list")
                    this.setState({
                        isLoading: false,
                        isEndList: true
                        
                    })
                }
            }

        })
    }

    storeJsonData = async (key, value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          // saving error
          console.log("error in AsyncStorage"+e)
        }
    }
    storeStringData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          // saving error
          console.log("error in AsyncStorage"+e)
        }
    }

    getJsonData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@cat_list')
        console.log("JSON.parse(jsonValue)")
        console.log(JSON.parse(jsonValue))
        this.setState({
            data: JSON.parse(jsonValue)
        })
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
        // error reading value
        console.log("error in AsyncStorage"+e)
        }
    }
    getStringData = async () => {
        try {
          const value = await AsyncStorage.getItem('@networkDelay')
          if(value !== null) {
            // value previously stored
            console.log(value)
            return value
          }else {
              console.log("value is empty")
          }
        } catch(e) {
          // error reading value
          console.log("error in AsyncStorage"+e)
        }
      }

  

    handleLoadMore = () => {
        this.setState({page: this.state.page + 1, isLoading: true}, this.getData)
    }

    myalert = async (val) => {
    alert(val);
    return;
    }

    
    renderRow = ({item}) => {
        return (
            <TouchableOpacity 
            // onPress={() => this.myalert({item})}
            onPress={  () => {this.props.navigation.navigate('CatDetails', {cat: item}); }  }
            style={styles.itemRow}>
                <Text style={styles.itemText}>Breed: {item.breed}</Text>
                <Text style={styles.itemText}>Country: {item.country}</Text>
            </TouchableOpacity>
        )
    }

    renderFooter = () => {

        if (this.state.isLoading && !this.state.isEndList){
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        else if (this.state.isEndList){
            return (
                <View style={styles.loader}>
                    <Text style={styles.textEndList}>This is the end of list</Text>
                </View>
            )
        } else {
            return (
                null
            )
        }
    }


    render() {
        return (
            <> 
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Cat List</Text>
                </View>
                <Button
                    title="Metrics" style={styles.button} onPress={ () => {this.props.navigation.navigate('Metrics'); }}
                />
                <FlatList
                    style={styles.container}
                    data={this.state.data}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={this.renderFooter}
                />
            </>
        )
    }



}//end class App

//Style 
const styles = StyleSheet.create ({
    container: {
        marginTop: 20,
        backgroundColor: '#f6f6f6'
    },
    itemRow: {
        borderBottomColor: '#ccc',
        marginBottom: 10,
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 16,
        padding: 5
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
    loader: {
        marginTop: 10,
        alignItems: 'center'
    },
    textEndList: {
        color: '#287094'
    },
    button: { 
        backgroundColor: '#287094',
        padding: 20,
        marginTop: 30,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 20 
    },
})