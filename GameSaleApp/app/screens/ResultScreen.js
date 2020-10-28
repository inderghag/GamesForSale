import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function ResultScreen({navigation}) {
    let searchUrl = 'https://www.cheapshark.com/api/1.0/games?title=' + navigation.getParam('name');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let validResults = [];

    useEffect(() => {
        fetch(searchUrl)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    function fillValidResults() {
        let searchStr = navigation.getParam('name').toLowerCase();
        let len = searchStr.length;
        for(let i = 0; i < data.length; i++){
            if(data[i].external.length > len && data[i].external.substring(0,len).toLowerCase() == searchStr){
                validResults.push(data[i]);
            }
        }
    }
    
    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                fillValidResults(),

                <FlatList
                    data={validResults}
                    keyExtractor={({ gameID }, index) => gameID}
                    renderItem={({  item }) =>(

                        <View style={{paddingBottom: 10}}>
                                
                            <TouchableOpacity onPress={() => navigation.navigate('Details', {
                                    data: item.gameID,
                                })}
                            >
                                <View style={styles.listCard}>
                                    <Image 
                                    style={{ height:50, width:165, alignSelf: "center"}}
                                    source={{ uri: item.thumb }}
                                    />
                                    <Text style={styles.fontStyle}>{item.external}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8c8cd9",
    },
    listCard: {
        backgroundColor: "#5353c6",
        borderColor: 'grey',
        borderWidth: 1,
        alignItems:"stretch",
        padding: 10,
    },
    fontStyle: {
        textAlign: "center",
        fontWeight:"bold",
        fontSize: 25,
    }
});
