import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function Login() {
    const navigation = useNavigation()
    const [data, setData] = useState({})
 
    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }

    const onSubmit = async ()=>{
        try {
            console.log(data)
            const res = await axios.post("https://vxx28nqw-5000.usw3.devtunnels.ms/users/login", data)
          /*   const token = res.access_token

            await AsyncStorage.setItem("token", token) */
       
            navigation.navigate("client")
        } catch (error) {
            console.error("Error al Iniciar sesión", error);
        }
    }

    return (
            <View style={style.container}>
                <View style={style.form}>
                <Text style={style.title}>Inicio de Sesión</Text>

                    <Text style={style.name}>Correo Electronico:</Text>
                    <TextInput style={style.input} onChangeText={(text)=>{onchange("email", text)}} placeholder='Escribe tu correo electronico'></TextInput>

                    <Text style={style.name}>Contraseña:</Text>
                    <TextInput style={style.input} onChangeText={(text)=>{onchange("password", text)}} placeholder='Escribe tu contraseña' secureTextEntry></TextInput>

                    <TouchableOpacity style={style.button} onPress={()=>{onSubmit()}}>
                        <Text style={style.button.textButton} >Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate("register")}}>
                        <Text style={style.extra}>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={style.extra}>¿Olvidaste tu contraseña?</Text>
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
        borderRadius: "10%"
    },

    title:{
        fontSize: 38,
        fontWeight: "bold",
  },

    name: {
        alignItems: "flex-start",
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