import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function game() {

    const router = useRouter()

    const [players, setPlayers] = useState([]);

    const [playerChallenged, setPlayerChallenged] = useState('');
    const [playerChallenger, setPlayerChallenger] = useState('');
    const [number, setNumber] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('players').then((players) => {
            setPlayers(JSON.parse(players))
        })
        setPlayerChallenged('');
        setPlayerChallenger('');
        setNumber(0); 
    }, [])

    useEffect(() => {
        if (players.length === 1) {
          router.push('/endgame')
        }
      }, [players]);

    function savePlayers () {
        AsyncStorage.setItem('playerChallenged', playerChallenged);
        AsyncStorage.setItem('playerChallenger', playerChallenger);
        AsyncStorage.setItem('number', number.toString());
        router.push('/clock')
    }

  return (
    <>
      <StatusBar style='light' />
      <View className="h-[110vh] bg-[#00003d] flex flex-col items-center justify-start pt-[10vh]">
          <TouchableOpacity 
            onPress={() => router.push('/initgame')} 
            className="bg-[#96b3ff] px-4 py-2 rounded-md absolute top-14 left-4">
                <Text className="text-black font-semibold">Volver</Text>
          </TouchableOpacity>
          <View className="flex flex-row h-3/5 gap-4 mt-4">
              <SafeAreaView className="h-full flex flex-col gap-2 items-center justify-center">
                  <Text className="text-white text-xl font-semibold">
                      Retador
                  </Text>
                  <ScrollView className="flex flex-col gap-2">
                  {
                  players.map((player, index) => {
                      if (player === playerChallenged) return (<></>)
                      return (
                      <TouchableOpacity 
                          onPress={() => {
                              setPlayerChallenger(player)
                          }}
                          key={index + 1} 
                          className="bg-[#5b7dcf] flex flex-row py-2 items-center justify-center w-32 border border-black rounded-lg">
                              <Text className="text-white font-semibold">
                              {player}
                              </Text>
                      </TouchableOpacity>
                      )
                  })
                  }
                  </ScrollView>
              </SafeAreaView>
              <SafeAreaView className="h-full flex flex-col gap-2 items-center justify-center">
                  <Text className="text-white text-xl font-semibold">
                      Retado
                  </Text>
                  <ScrollView className="flex flex-col gap-2">
                  {
                  players.map((player, index) => {
                      if (player === playerChallenger) return (<></>)
                      return (
                      <TouchableOpacity 
                          onPress={() => {
                              setPlayerChallenged(player)
                          }}
                          key={index + 2} 
                          className="bg-[#5b7dcf] flex flex-row py-2 items-center justify-center w-32 border border-black rounded-lg">
                          <Text className="text-white font-semibold">
                          {player}
                          </Text>
                      </TouchableOpacity>
                      )
                  })
                  }
                  </ScrollView>
              </SafeAreaView>
          </View>
          <View className="flex flex-row gap-2 items-center mb-8">
              <TouchableOpacity onPress={() => setPlayerChallenger('')}>
                  <Text className="w-28 border-b border-white text-center text-white text-lg">
                      {playerChallenger}
                  </Text>
              </TouchableOpacity>
              <Text className="text-white text-lg">
                  le dijo "Bullshit" a
              </Text>
              <TouchableOpacity onPress={() => setPlayerChallenged('')}>
                  <Text className="w-28 border-b border-white text-center text-white text-lg">
                      {playerChallenged}
                  </Text>
              </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center mb-4">
              <Text className="text-white mr-4 text-2xl">
                  Cantidad:
              </Text>
              <TextInput
              keyboardType='numeric'
              onChangeText={setNumber}
              value={number}
              placeholder="Cantidad"
              className="border-2 border-[#5b7dcf] rounded-md px-4 py-2 w-24 bg-[#00276c] text-white"
              />
          </View>
          <TouchableOpacity
          onPress={() => {
              savePlayers()
          }}
          className="bg-[#96b3ff] px-4 py-2 rounded-md flex items-center justify-center">
              <Text className="text-black font-semibold">
                  Continuar
              </Text>
          </TouchableOpacity>
      </View>
    </>
  )
}