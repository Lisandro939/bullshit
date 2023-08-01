import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'

export default function Modal() {

    const router = useRouter()

    const handleOnPress = async () => {
        await AsyncStorage.setItem('first-time', 'false')
        router.push('/main')
    }

  return (
    <>
      <StatusBar style='light' />
      <View className="z-10 absolute top-0 w-[100vw] h-[110vh] flex items-center justify-center bg-primary">
        <View className="h-96 w-80 bg-secondary rounded-lg flex items-center justify-around py-4">
          <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-[#fff] text-2xl">
              ¡Bienvenido!
          </Text>
          <View className="flex flex-col">
              <Text style={{ fontFamily: 'Nunito-Regular'}} className="text-[#fff] text-md mx-2 leading-5">
                  La versión actual de Bullshit está en Beta, por lo que puede contener errores. Si encuentra alguno, por favor reportelo al Instagram de @lisandro_f1.
              </Text>
              <Text style={{ fontFamily: 'Nunito-Regular'}} className="text-[#fff] text-md mt-4 mx-2 leading-5">
                  Se agradece todo tipo de feedback para poder seguir mejorando el juego.
              </Text>
          </View>
          <TouchableOpacity
          onPress={handleOnPress}
          className="bg-lightblue px-4 py-2 rounded-md"
          >
              <Text 
              style={{ fontFamily: 'Nunito-Bold'}}
              className="text-[#000] text-md mx-2 leading-5">
                  Aceptar
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}