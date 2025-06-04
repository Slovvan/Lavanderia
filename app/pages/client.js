import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function client (){

    const [data, setData] = useState({})


    return (
        <View>
            <View style={style.container}>
                <Text style={style.title}>Clientes</Text>
                <View style={style.form}>                    
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({

})