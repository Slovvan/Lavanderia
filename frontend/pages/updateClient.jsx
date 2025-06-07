import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';

export default function UpdateClient (){
    const route = useRoute();
    const navigation = useNavigation();
    const {client} = route.params

    const [data, setData] = useState({})


    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }


    const updateClient = async () => {
        try {
            await axios.put(`https://vxx28nqw-5000.usw3.devtunnels.ms/clients/update/${client.id}`, data)

            navigation.navigate("client")
        } catch (error) {
            console.log("Error al actualizar cliente ", error)
        }
    }


    return (
            <View style={style.container}>
                    <View style={style.form}>
                        <Text style={style.title}>Actualizar Cliente</Text>

                        <Text style={style.name}>Nombre:</Text>
                        <TextInput onChangeText={(text)=>{onchange("name", text)}} style={style.input} placeholder={client.name}></TextInput>
                        <Text style={style.name}>Telefono:</Text>
                        <TextInput onChangeText={(text)=>{onchange("phone_number", text)}} style={style.input} placeholder={client.phone_number}></TextInput>
                        <Text style={style.name}>Dirección:</Text>
                        <TextInput onChangeText={(text)=>{onchange("address", text)}} style={style.input} placeholder={client.address}></TextInput>
                        
                        <TouchableOpacity onPress={()=>{updateClient()}} style={style.button}>
                            <Text style={style.button.textButton}>Actualizar</Text>
                        </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{navigation.navigate("client")}}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b0a55"
    },

    form: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 60, 
        borderRadius: "10%",
        
    },

    title:{
        fontSize: 38,
        fontWeight: "bold",
  },

    name: {
    
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 2
    },

    button: {
        backgroundColor: "purple",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        textButton:{
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        }
  },

    input:{
        borderRadius: 5,
        fontSize: 15,
        borderColor: "black",
        borderWidth: 1,
        textAlign: "center",
        width: "100%",
        height: "auto"
  },

})