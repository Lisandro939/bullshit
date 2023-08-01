import { View, Text, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RuleItem({item}) {

  const router = useRouter()

  const text = "text-[#fff]"

  const { width } = useWindowDimensions()

  return (
    <View style={{ flex:1,width}} className="flex flex-col px-4 items-center justify-start pt-32">
        <Image className="w-52 h-52 mb-8" source={item.image} />
        <View>
            <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#fff] text-md text-justify">
                {item.text}
            </Text>
        </View>
    </View>
  )
}