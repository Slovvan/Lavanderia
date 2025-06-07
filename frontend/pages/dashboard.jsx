import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';

export default function Client (){
    const navigation = useNavigation();

    const [data, setData] = useState([])
    
    const [search, setSearch] = useState("name")
    const [info, setInfo] = useState({
        name: "",
        phone: ""
    })
    
    useEffect(() => {
        getClientByName()
    }, []);

    const onchange = (target, value) => {
        const nInfo = info
        nInfo[target] = value
        setInfo(nInfo)
    }
    
    const getClientByName = async () => {
        try {
            const res = await axios.get("https://vxx28nqw-5000.usw3.devtunnels.ms/clients/search/name", {params: {name: info.name}})
            const client = res.data

            setData(client)
        } catch (error) {
            console.log("Error al buscar por nombre ", error)
        }
    }

    const getClientByPhone = async () => {
        try {
            const res = await axios.get("https://vxx28nqw-5000.usw3.devtunnels.ms/clients/search/phone", {params: {phone: info.phone}})
            const client = res.data

            setData([client])
        } catch (error) {
            console.log("Error al buscar por telefono ", error)
        }
    }

    const deleteClient = async (id) => {
        try {
            await axios.delete(`https://vxx28nqw-5000.usw3.devtunnels.ms/clients/delete/${id}`)
            if (search == "name"){
                getClientByName()
            } else{
                data.pop()
            }
        } catch (error) {
            console.log("Error al buscar por telefono ", error)
        }
    }


    return (
            <View style={style.container}>
                <Text style={style.title}>Clientes</Text>
                <TouchableOpacity  onPress={()=>{navigation.navigate("createClient")}}>
                        <Text style={style.createButton}>➕</Text>
                </TouchableOpacity>

                <View style={style.search}>
                    <TextInput style={style.searchBar} placeholder=' Buscar Cliente' onChangeText={(text)=>{onchange(search, text)}}></TextInput>
                    <TouchableOpacity style={style.searchButton} onPress={()=>{search == "phone" ? getClientByPhone() : getClientByName()}}>
                        <Text>🔎</Text>
                    </TouchableOpacity>
                     <Picker
                        selectedValue={search}
                        onValueChange={(itemValue) => setSearch(itemValue)}
                        style={style.select}
                        >
                        <Picker.Item label="Nombre" value="name" />
                        <Picker.Item label="Teléfono" value="phone" />
                        </Picker>
                </View>

               <ScrollView style={style.table}>
                <Grid>
                    <Row style={style.rowHeader}>
                    <Col><Text style={style.headerText}>ID</Text></Col>
                    <Col><Text style={style.headerText}>Nombre</Text></Col>
                    <Col><Text style={style.headerText}>Teléfono</Text></Col>
                    <Col><Text style={style.headerText}>Dirección</Text></Col>
                    <Col><Text style={style.headerText}>Fecha</Text></Col>
                    <Col><Text style={style.headerText}>Acciones</Text></Col>
                    </Row>

                    {data.map((client, i) => (
                    <Row
                        key={client.id}
                        style={[style.row, i % 2 === 0 && style.zebraRow]}
                    >
                        <Col><Text style={style.colText}>{client.id}</Text></Col>
                        <Col><Text style={style.colText}>{client.name}</Text></Col>
                        <Col><Text style={style.colText}>{client.phone_number}</Text></Col>
                        <Col><Text style={style.colText}>{client.address}</Text></Col>
                        <Col><Text style={style.colText}>{client.created_at}</Text></Col>
                        <Col>
                        <TouchableOpacity
                            style={style.update}
                            onPress={() => navigation.navigate("updateClient", { client })}
                        >
                            <Text style={{ color: "white", fontSize: 12 }}>Actualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.delete}
                            onPress={() => deleteClient(client.id)}
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

    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5,
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
