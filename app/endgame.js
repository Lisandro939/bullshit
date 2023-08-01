import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function EndGame() {

    const router = useRouter()

    const [playerWinner, setPlayerWinner] = useState('')

    useEffect(() => {
        const getWinner = async () => {
            const winner = await AsyncStorage.getItem('players');
            setPlayerWinner(JSON.parse(winner));
        }
        getWinner();
    }, [])

  return (
    <>
        <StatusBar style='light' />
        <View className="h-[110vh] w-[100vw] flex flex-col items-center justify-center bg-primary">
        <Text style={{ fontFamily: 'Nunito-Light'}} className="text-3xl mb-6 text-[#fff]">
            {playerWinner} ganó la partida
        </Text>
        <TouchableOpacity
            onPress={() => router.push('/main')}
            className="bg-[#96b3ff] px-4 py-2 rounded-md flex items-center justify-center mb-6"
        >
            <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-black text-2xl font-semibold">
                Volver a jugar
            </Text>
        </TouchableOpacity>
        </View>
    </>
  )
}