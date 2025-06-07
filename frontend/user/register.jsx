import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function Register() {
    const navigation = useNavigation()
    const [data, setData] = useState({})
 
    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }

    const onSubmit = async ()=>{
        try {
            await axios.post("https://vxx28nqw-5000.usw3.devtunnels.ms/users/register", data)
       
            navigation.navigate("login")
        } catch (error) {
            console.error("Error al registrar usuario", error);
        }
    }

    return (
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.title}>Registro</Text>

                    <Text style={style.name}>Nombre:</Text>
                    <TextInput onChangeText={(text)=>{onchange("name", text)}} style={style.input} placeholder='Escribe tu nombre'></TextInput>

                    <Text style={style.name}>Correo Electronico:</Text>
                    <TextInput onChangeText={(text)=>{onchange("email", text)}} style={style.input} placeholder='Escribe tu correo electronico'></TextInput>

                    <Text style={style.name}>Contraseña:</Text>
                    <TextInput onChangeText={(text)=>{onchange("password", text)}} style={style.input} placeholder='Escribe tu contraseña'></TextInput>

                    <TouchableOpacity style={style.button} onPress={()=>{onSubmit()}}>
                        <Text style={style.button.textButton}>Registrarse</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate("login")}}>
                        <Text style={style.extra}>Cancelar</Text>
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