import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function ( {navigation} ) {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <Text>Replace with logo</Text>
            <TextInput 
                style={styles.textbox}
                placeholder="Enter Game Name"
                onChangeText={text => setText(text)}
                onEndEditing={() => navigation.navigate('Results', {
                    name: text,
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8c8cd9",
        justifyContent: "center",
        alignItems: "center",
    },
    textbox: {
        width: '80%',
        height: 30,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        textAlign: 'center',
    }
})
