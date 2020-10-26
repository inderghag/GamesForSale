import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native'

export default function ResultScreen({navigation}) {
    let searchUrl = 'https://www.cheapshark.com/api/1.0/games?title=' + navigation.getParam('name');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(searchUrl)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    keyExtractor={({ gameID }, index) => gameID}
                    renderItem={({  item }) =>(

                        <View style={{paddingBottom: 5}}>
                            <View
                             style={styles.listCard}
                             onTouchEnd={() => navigation.navigate('Details', {
                                data: item.gameID,
                             })}
                            >
                                <Image 
                                style={{ height:50, width:165,}}
                                source={{ uri: item.thumb }}
                                />
                                <Text style={styles.fontStyle}>{item.external}</Text>
                            </View>
                        </View>

                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8c8cd9",
        alignItems: "center"
    },
    listCard: {
        backgroundColor: "#5353c6",
        borderColor: 'grey',
        borderWidth: 1,
        flex: 6,
        width: 200,
        padding: 15,
    },
    fontStyle: {
        textAlign: "center",
        fontSize: 15,
    }
});
