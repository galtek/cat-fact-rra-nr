import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';



export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            page: 1,
            isLoading: false,
            isEndList: false
        }
    }

    componentDidMount(){
        this.setState({ isLoading: true }, this.getData)
        
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
            console.log("resJson")
            console.log(resJson)
            console.log("resJson.data.last_page")
            console.log(resJson.last_page)
            if (resJson.next_page_url != null){
                console.log("is NOT end of list")
                this.setState({
                    data: this.state.data.concat(resJson.data),//for pagination join array
                    isLoading: false,
                    isEndList: false
                })
                
            } else {
                console.log("It is end of list")
                this.setState({
                    isLoading: false,
                    isEndList: true
                })
            }
        })
    }

    handleLoadMore = () => {
        this.setState({page: this.state.page + 1, isLoading: true}, this.getData)
    }

    myalert = async () => {
    alert("Just press list item");
    return;
    }

    

    // renderRow = ({item}) => {
    //     return (
    //         <View style={styles.itemRow}>
    //             <Text style={styles.itemText}>Breed: {item.breed}</Text>
    //             <Text style={styles.itemText}>Country: {item.country}</Text>
    //         </View>
    //     )
    // }

    renderRow = ({item}) => {
        return (
            <TouchableOpacity 
            onPress={this.myalert}
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
                    <Text style={styles.headerTitle}>Cat Facs</Text>
                </View>
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
        fontFamily: 'Helvetica',
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
        fontFamily: 'Helvetica',
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
})



// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

// class ScrollViewCats extends Component {
//     state = {
//         cats: [
//            {'fact': 'Fact 1', 'length': 1},
//            {'fact': 'Fact 2', 'length': 2},
//            {'fact': 'Fact 3', 'length': 3},
//            {'fact': 'Fact 4', 'length': 4},
//            {'fact': 'Fact 5', 'length': 5},
//            {'fact': 'Fact 6', 'length': 6},
//            {'fact': 'Fact 7', 'length': 7},
//            {'fact': 'Fact 8', 'length': 8},
//            {'fact': 'Fact 9', 'length': 9},
//            {'fact': 'Fact 10', 'length': 10},
//            {'fact': 'Fact 11', 'length': 11},
//            {'fact': 'Fact 12', 'length': 12},
//            {'fact': 'Fact 13', 'length': 1},
//            {'fact': 'Fact 14', 'length': 2},
//            {'fact': 'Fact 15', 'length': 3},
//            {'fact': 'Fact 16', 'length': 4},
//            {'fact': 'Fact 17', 'length': 5},
//            {'fact': 'Fact 18', 'length': 6},
//            {'fact': 'Fact 19', 'length': 7},
//            {'fact': 'Fact 20', 'length': 8},
//            {'fact': 'Fact 21', 'length': 9},
//            {'fact': 'Fact 22', 'length': 10},
//            {'fact': 'Fact 23', 'length': 11},
//            {'fact': 'Fact 24', 'length': 12}
//         ]
//     }

//     myalert = async () => {
//         alert("Just press list item");
//       return;
//     }

//     render() {
//         return (
//            <View>
//               <ScrollView>
//                  {
//                     this.state.cats.map((item, index) => (
//                        <View key = {item.length} style = {styles.item}>
//                           {/* <Text style = {styles.textList}>{item.fact}</Text> */}
//                           <TouchableOpacity
//                             onPress={this.myalert}
//                             style={styles.button}>
//                             <Text style={styles.textList}>{item.fact}</Text>
//                         </TouchableOpacity>
//                        </View>
//                     ))
//                  }
//               </ScrollView>
//            </View>
//         )
//      }
// }

// export default ScrollViewCats

// const styles = StyleSheet.create ({
//    item: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: 30,
//       margin: 2,
//       borderColor: '#2a4944',
//       borderWidth: 1,
//       backgroundColor: '#f6f6f6'
//    },
//    textList: {
//        color: '#023246',
//        fontSize: 18,
//        fontFamily: 'Helvetica',
//        fontWeight: 'bold'
//    },
//    button: { 
//     //  backgroundColor: 'blue',
//      padding: 10,
//      borderRadius: 5 
//    },
// })