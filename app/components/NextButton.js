import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

export default function NextButton({currentIndex, scrollTo}) {

  return (
    <View className="flex items-center justify-center">
      <TouchableOpacity onPress={scrollTo} className="flex flex-row items-center justify-center bg-lightblue px-4 py-2 rounded-md">
        {
          currentIndex < 5 ? (
            <Text style={{ fontFamily: 'Nunito-Medium'}} className="text-secondary text-lg mr-2">
                SIGUIENTE
            </Text>
          ) : (
            <Text style={{ fontFamily: 'Nunito-Medium'}} className="text-secondary text-lg mr-2">
                EMPEZAR
            </Text>
          )
        }
        <AntDesign name="right" size={16} color="#210A40" />
      </TouchableOpacity>
    </View>
  )
}