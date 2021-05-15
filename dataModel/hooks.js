
//TODO: pass all functions and methods in this file to separaate from UI
export const breedsList = () => {


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


    const loadBreeds = async () => {
        const breedsData = await AsyncStorage.getItem("@BreedListStore:Breeds");
        if (breedsData){
            const breeds = JSON.parse(breedsData);
            this.setState(breeds);
        }
    }


    return {handleLoadMore, myalert}
}