import { View, Text, Animated, useWindowDimensions } from 'react-native'
import React from 'react'

export default function Paginator({data, scrollX}) {

    const { width } = useWindowDimensions()

  return (
    <View className="w-full flex flex-row items-center justify-center h-16">
      {
        data.map((_, i) => {
            const inputRange = [(i-1) * width, i * width, (i+1) * width]

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [10, 20, 10],
                extrapolate: 'clamp'
            })

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
            })

            return (
                <Animated.View style={{width: dotWidth, opacity}} key={i.toString()} className="h-[10] mx-2 my-3 rounded-full bg-[#fff]" />
            )
            })
      }
    </View>
  )
}