import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function login (){

    const [data, setData] = useState({})

    const onchange = (target, value) => {
        const nData = data
        nData.target = value
        setData(nData)
    }

    const onSubmit = ()=>{
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <View>
            <View style={style.container}>
                <Text style={style.title}>Inicio de Sesión</Text>
                <View style={style.form}>

                    <Text style={style.name}>Correo Electronico:</Text>
                    <TextInput onChangeText={(text)=>{onchange("email", text)}} style={style.input} placeholder='Escribe tu correo electronico'></TextInput>

                    <Text style={style.name}>Contraseña:</Text>
                    <TextInput onChangeText={(text)=>{onchange("password", text)}} style={style.input} placeholder='Escribe tu contraseña'></TextInput>

                    <TouchableOpacity onPress={()=>{onSubmit()}} style={style.button}>Iniciar Sesión</TouchableOpacity>

                    <TouchableOpacity>Olvidaste tu contraseña?</TouchableOpacity>
                    <TouchableOpacity>Registrarse</TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({

})