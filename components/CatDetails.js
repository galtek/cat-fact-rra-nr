import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';



export default class CatDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            fact: ""
        }
    }

    componentDidMount(){
        console.log("Enter in componentDidMount")
        this.getFactData()
    }

    

    //data
    //JSON Objects
    // https://catfact.ninja/fact
    // {
    //     fact: "It has been scientifically proven that owning cats is good for our health and can decrease the occurrence of high blood pressure and other illnesses.",
    //     length: 149
    // }
    getFactData = async () => {
        console.log("Enter in getData")
        const apiURL = "https://catfact.ninja/fact"
        fetch(apiURL).then((res) => res.json())
        .then((resJson) => {
            console.log("resJson Cat Detail")
            console.log(resJson)
            this.setState({
                fact: resJson.fact
            })
        })
    }
    //TODO: include metrics of load for random facts
    

    render() {
        const { cat } = this.props.route.params;
        return (
            <> 
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Cat Detail</Text>
                </View>
                <Text style={styles.detailTitleBreed}>Breed</Text>
                <Text style={styles.detailTitleInfo}>{JSON.stringify(cat.breed)}</Text>
                <Text style={styles.detailText}>Country: {JSON.stringify(cat.country)}</Text>
                <Text style={styles.detailText}>Origin: {JSON.stringify(cat.origin)}</Text>
                <Text style={styles.detailText}>Coat: {JSON.stringify(cat.coat)}</Text>
                <Text style={styles.detailText}>Pattern: {JSON.stringify(cat.pattern)}</Text>
                <View style={styles.horrizontalLine} />
                <Text style={styles.detailFactText}>Random Fact: {this.state.fact}</Text>
                <Button
                    title="Another fact" style={styles.button} onPress={() => this.getFactData()}
                />
            </>
        )
    }



}//end class App


//Style 
const styles = StyleSheet.create ({
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
    detailTitleBreed: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 30
    },
    detailTitleInfo: {
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
    },
    detailText: {
        fontSize: 16,
        padding: 5
    },
    detailFactText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 5,
        marginTop: 30
    },
    button: { 
        backgroundColor: '#287094',
        padding: 20,
        marginTop: 30,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 20 
    },
    horrizontalLine: {
        borderBottomColor: '#287094',
        borderBottomWidth: 1,
        marginTop: 20
    }
})