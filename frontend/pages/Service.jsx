import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';

export default function Service (){
    const navigation = useNavigation();

    const [services, setServices] = useState([
         {
        name: "Lavado",
        description: "",
        unitPrice:22
        },
        {
        name: "Plachado",
        description: "",
        unitPrice:60
        },
        {
        name: "Tintoreria",
        description: "",
        unitPrice:0
        },
        {
        name: "Especial",
        description: "",
        unitPrice:0
        },
    
    ])

 
    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }

    return (
           <View style={style.container}>
                          <View style={style.form}>
                               <Text style={style.title}>Crear Servicio</Text>
                                  <TextInput onChangeText={(text)=>{onchange("name", text)}} style={style.input} placeholder='Escribe el Nombre '></TextInput>
                                  <TextInput onChangeText={(text)=>{onchange("name", text)}} style={style.input} placeholder='Escribe Descripción '></TextInput>
                                  <TextInput onChangeText={(text)=>{onchange("name", text)}} style={style.input} placeholder='Escribe el Precio'></TextInput>
                                 
                              <TouchableOpacity style={style.button} onPress={()=>{onSubmit()}} >
                                  <Text style={style.button.textButton}>Crear</Text>
                              </TouchableOpacity>
                          </View>
                          
                         <ScrollView style={style.table}>
                          <Grid>
                              <Row style={style.rowHeader}>
                              <Col><Text style={style.headerText}>Servicios</Text></Col>
                              <Col><Text style={style.headerText}>Descripción</Text></Col>
                              <Col><Text style={style.headerText}>Precio</Text></Col>
                              <Col></Col>
                              </Row>
          
                              {services.map((service, i) => (
                              <Row
                                  key={service.id}
                                  style={[style.row, i % 2 === 0 && style.zebraRow]}
                                  >
                                  <Col><Text style={style.colText}>{service.name}</Text></Col>
                                  <Col><Text style={style.colText}>{service.description}</Text></Col>
                                  <Col><Text style={style.colText}>${service.unitPrice}</Text></Col>
                                  <Col>
                                  <TouchableOpacity
                                      style={style.update}
                                      onPress={() => navigation.navigate("updateClient", { service })}
                                  >
                                      <Text style={{ color: "white", fontSize: 12 }}>Actualizar</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                      style={style.delete}
                                      onPress={() => deleteClient(service.id)}
                                  >
                                      <Text style={{ color: "white", fontSize: 12 }}>Eliminar</Text>
                                  </TouchableOpacity>
                                  </Col>
                              </Row>
                              ))}
                          </Grid>
                          </ScrollView>
                  </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        backgroundColor: "#3b0a55"
    },

    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },

    createButton: {
        backgroundColor: "#ffffff",
        color: "#3b0a55",
        borderRadius: 50,
        fontSize: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 20,
        elevation: 3,
        textAlign: "center",
    },

    search: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 10,
        width: "95%",
        gap: 10
    },

    searchBar: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        elevation: 2,
    },

    searchButton: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 8,
        elevation: 2,
    },

    select: {
        backgroundColor: "#ffffff",
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc"
    }, 

    button: {
        backgroundColor: "#5e0acc",
        width: "100%",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    input: {
        borderRadius: 5,
        fontSize: 15,
        borderColor: "#aaa",
        borderWidth: 1,
        textAlign: "center",
        backgroundColor: "white",
        width: "100%",
        padding: 10,
    },
    
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
    elevation: 3,
  },

  rowHeader: {
    backgroundColor: "#5e0acc",
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },

  zebraRow: {
    backgroundColor: "#f9f9f9",
  },

  colText: {
    color: "#333",
    fontSize: 13,
    textAlign: "center",
  },

  headerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },

  update: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginBottom: 4,
    alignItems: "center",
  },

  delete: {
    backgroundColor: "purple",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
});
