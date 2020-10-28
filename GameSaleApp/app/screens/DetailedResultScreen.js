import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native'

export default function DetailedResultScreen({navigation}) {
    const searchUrl = "https://www.cheapshark.com/api/1.0/games?id=" + navigation.getParam('data');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let validSale = [];
    let gameData = [];

    useEffect(() => {
        fetch(searchUrl)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    function fillValid() {
        let dataDeals = data['deals'];
        
        for (let i = 0; i < dataDeals.length; i++){
            
            if (dataDeals[i].price != dataDeals[i].retailPrice) {
                dataDeals[i].savings = parseFloat(dataDeals[i].savings).toFixed(2);
                dataDeals[i].dealID = "https://www.cheapshark.com/redirect?dealID=" + dataDeals[i].dealID;
                validSale.push(dataDeals[i]);
            }
        }
        gameData.push(data['info']);
    }
    
    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> :(
                fillValid(),
                <View>
                    <FlatList
                        data={gameData}
                        keyExtractor={({ steamAppID }, index) => steamAppID}
                        renderItem={({ item }) => (
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleFont}>{item.title}</Text>
                            </View>
                        )}
                    />
                    <FlatList
                        data={validSale}
                        keyExtractor={({ storeID }, index) => storeID}
                        renderItem={({  item }) =>(
                            <View style={{paddingBottom:10}}>
                                <View style={styles.cardContainer}>
                                    <TouchableOpacity 
                                        style={styles.buttonPress}
                                        onPress={() => {
                                            Linking.openURL(item.dealID);
                                        }}>

                                        <Text style={[styles.fontStyle, {color: 'red'} ]}>Sale Price: ${item.price}</Text>
                                        <Text style={styles.fontStyle}>Saving: ${item.savings}</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />                 
                </View>

            )}
            
        </View>
    )
    
}

const styles = StyleSheet.create({
    buttonPress: {
        backgroundColor: "#ececf9" 
    },
    container: {
        backgroundColor: "#8c8cd9",
        flex:6,
    },
    cardContainer: {
        justifyContent: "center",
        backgroundColor: "#c6c6ec",
        borderWidth: 1,
        borderColor: "grey"
    },
    fontStyle: {
        textAlign:"center",
        fontWeight:"bold",
        fontSize: 15,
    },
    titleContainer: {
        flex: 1,
        backgroundColor: "#5353c6",
    },
    titleFont: {
        textAlign: "center",
        fontSize: 20,
        color: "white",
    },
})
