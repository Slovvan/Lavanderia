import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import constants from "./constants"
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { services, garments } = constants;
export default function CreateOrder(){
    const navigation = useNavigation()
    const route = useRoute();
    const {client} = route.params

    useEffect(() => {
        getUserId()
    }, []);
    
    const defaultGarment = {
    type: "Camisa",
    description: "",
    observations: "",
    services: [ { ...services[0] } ]
  };

    const [order, setOrder] = useState({
        client_id: client.id,
        user_id:  1,
        state:"recibido",
        estimated_delivery_date: "",
        total: 0,
        pagado: false,
        garments:[defaultGarment]
    })


    const getTotal = ()=> {
        let subtotal = 0
        const data = order
        for (const garment of data.garments){
            for(const service of garment.services){
                subtotal += service.unitPrice * service.quantity
            }
        }
        data.total = subtotal
        setOrder({...data})

    }

     const addGarment = () => {
        const data = { ...order };
        data.garments.push({ ...defaultGarment });
        setOrder(data);
    }

    const deleteGarment = (ig) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments = data.garments.filter((_, i) => i != ig)
        }
        setOrder({ ...data })
        getTotal()
    }

    const onChangeGarment = (key, value, ig) => {
        const keys = ["description", "observations", "type"]

        if(!keys.includes(key)){
            console.log("llave no validda")
            return
        }
        const data = order;
        if (data.garments) {
            data.garments[ig][key] = value
        }
        setOrder({ ...data })
        getTotal()
    }

     const onChangeService = (value, ig, is) => {
    const data = { ...order };
    const newService = services.find((s) => s.name === value);
    if (data.garments && data.garments[ig] && newService) {
      data.garments[ig].services[is] = newService;
      setOrder(data);
      onChangeServiceFields("name", value, ig, is)
      getTotal()
    }
  }

    const addServiceToGarment = (ig) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services.push({ ...services[0] })
        }
        setOrder({ ...data })
        getTotal()
    }

    const deleteServiceToGarment = (ig, is) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services = data.garments[ig].services.filter((_, i) => i != is)
        }
        setOrder({ ...data })
        getTotal()
    }

    const onChangeServiceFields = (key, value, ig, is) => {
    const keys = ["name", "quantity", "unitPrice"];
    if (!keys.includes(key)) {
        console.log("llave no valida");
        return;
    }
    const data = { ...order };
    if (data.garments) {
        if (key === "name") {
            data.garments[ig].services[is][key] = value;
        } else {
            data.garments[ig].services[is][key] = parseFloat(value);
        }
        setOrder(data)
        getTotal()
    }
    }

    const sendOrder = async () =>{
        try {
            await axios.post("https://vxx28nqw-5000.usw3.devtunnels.ms/orders/create", order)
            console.log(order)
            navigation.navigate("client")
        } catch (error) {
            console.error("Error al crear orden", error);
        }
    }

    const onchange = (target, value) => {
        const nOrder = order
        nOrder[target] = value
        setOrder(nOrder)
    }

    const getUserId = async () => {
        const nOrder = order
        nOrder[user_id] = await AsyncStorage.getItem("token")
        setOrder(nOrder)
    }
      
    return(
        <ScrollView style={styles.container}>
              <View style={styles.card}>
                <Text style={styles.title}>Creación de Orden</Text>
        
                <TouchableOpacity onPress={addGarment} style={styles.button}>
                  <Text style={styles.buttonText}>Agregar Prenda</Text>
                </TouchableOpacity>
                <Text style={styles.subtitle}>Fecha de Entrega Aproximada:</Text>
                  <TextInput onChangeText={(text)=>{onchange("estimated_delivery_date", text)}} style={styles.input} placeholder='YYYY-MM-DD'></TextInput>
                                 
                <Text style={styles.subtitle}>Prendas:</Text>
        
                {order.garments?.map((garment, i) => (
                  <View key={i} style={styles.garment}>
                    {i > 0 && (
                      <TouchableOpacity
                        onPress={() => deleteGarment(i)}
                        style={styles.deleteButton}
                      >
                        <Text style={styles.deleteButtonText}>
                          Eliminar prenda #{i + 1}
                        </Text>
                      </TouchableOpacity>
                    )}
        
                    <Text style={styles.label}>Tipo de prenda:</Text>
                    <Picker
                      selectedValue={garment.type}
                      onValueChange={(value) =>
                        onChangeGarment("type", value, i)
                      }
                      style={styles.picker}
                    >
                      {garments.map((g) => (
                        <Picker.Item label={g} value={g} key={g} />
                      ))}
                    </Picker>
        
                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput
                      value={garment.description}
                      onChangeText={(text) =>
                        onChangeGarment("description", text, i)
                      }
                      style={styles.input}
                    />
        
                    <Text style={styles.label}>Observaciones:</Text>
                    <TextInput
                      value={garment.observations}
                      onChangeText={(text) =>
                        onChangeGarment("observations", text, i)
                      }
                      style={styles.input}
                    />
        
                    <Text style={styles.subtitle}>Servicios:</Text>
                    {garment.services.map((service, is) => (
                      <View key={is} style={styles.service}>
                        {is > 0 && (
                          <TouchableOpacity
                            onPress={() => deleteServiceToGarment(i, is)}
                          >
                            <Text style={styles.deleteText}>Eliminar Servicio</Text>
                          </TouchableOpacity>
                        )}
        
                        <Picker
                          selectedValue={service.name}
                          onValueChange={(value) =>
                            onChangeService(value, i, is)
                          }
                          style={styles.picker}
                        >
                          {services.map((s) => (
                            <Picker.Item
                              label={s.name}
                              value={s.name}
                              key={s.name}
                            />
                          ))}
                        </Picker>
        
                        <Text style={styles.label}>Nombre: {service.name}</Text>
        
                        <Text style={styles.label}>Cantidad:</Text>
                        <TextInput
                          value={
                            service.quantity
                              ? String(service.quantity)
                              : ""
                          }
                          onChangeText={(text) =>
                            onChangeServiceFields("quantity", text, i, is)
                          }
                          keyboardType="numeric"
                          style={styles.input}
                        />
        
                        <Text style={styles.label}>Precio:</Text>
                        <TextInput
                          value={
                            service.unitPrice
                              ? String(service.unitPrice)
                              : ""
                          }
                          onChangeText={(text) =>
                            onChangeServiceFields("unitPrice", text, i, is)
                          }
                          keyboardType="numeric"
                          style={styles.input}
                        />
                      </View>
                    ))}
        
                    <TouchableOpacity
                      onPress={() => addServiceToGarment(i)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Agregar Servicio</Text>
                    </TouchableOpacity>
                  </View>
                ))}
        
                <Text style={styles.subtitle}>Resumen</Text>
                 {order.garments?.map((garment, i) => (
                    <View key={i}>
                        <Text style={styles.total}>
                       {garment.type}
                        </Text>

                        {garment.services?.map((service, j) => (
                        <Text key={j} style={styles.total}>
                            ----- {service.name} - {service.quantity} x ${service.unitPrice} -----
                        </Text>
                        ))}
                    </View>
                    ))}
                <Text style={styles.total}>Total: {order.total}</Text>
        
                <TouchableOpacity
                  onPress={sendOrder}
                  style={styles.summaryButton}
                >
                  <Text style={styles.summaryButtonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
 container: {
    padding: 16,
    backgroundColor: "#3b0a55",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6A1B9A",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CE93D8",
    paddingBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginVertical: 6,

  },
  picker: {
    backgroundColor: "#CE93D8",
    borderRadius: 10,
    marginVertical: 6,
    padding: 10,

  },
  button: {
    backgroundColor: "#6A1B9A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteText: {
    color: "#D32F2F",
    textAlign: "right",
    marginVertical: 4,
    fontWeight: "600",
  },
  service: {
    backgroundColor: "#f3e5f5",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  summaryButton: {
    backgroundColor: "#8E24AA",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  summaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
