import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons'

export default function game() {

    const router = useRouter()

    const [players, setPlayers] = useState([]);

    const [playerChallenged, setPlayerChallenged] = useState('');
    const [playerChallenger, setPlayerChallenger] = useState('');
    const [number, setNumber] = useState(0);

    useEffect(() => {
        // ARREGLAR ESTO
        AsyncStorage.getItem('players').then((players) => {
            if (JSON.parse(players).length < 2) {
                AsyncStorage.getItem('players2').then((players) => {
                    setPlayers(JSON.parse(players))
                    AsyncStorage.setItem('players', players)
                })
            }
            setPlayers(JSON.parse(players))
        })
        setPlayerChallenged('');
        setPlayerChallenger('');
        setNumber(0); 
    }, [])

    function savePlayers () {
        if (playerChallenged === '' || playerChallenger === '' || parseInt(number) === 0) return;
        AsyncStorage.setItem('playerChallenged', playerChallenged);
        AsyncStorage.setItem('playerChallenger', playerChallenger);
        AsyncStorage.setItem('number', number.toString());
        router.push('/clock')
    }

  return (
    <>
      <StatusBar style='light' />
      <View className="h-[106vh] bg-primary flex flex-col items-center justify-start pt-[15vh]">
            <View className="flex flex-row absolute top-14 w-screen items-between justify-between px-4">
                <TouchableOpacity 
                    onPress={() => router.push('/main')} 
                    className="bg-lightblue px-4 py-2 rounded-md">
                        <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-black font-semibold">Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => router.push('/rules')}
                className="bg-[#707070] rounded-full px-4 py-1 ">
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="font-bold text-primary text-lg">
                        i
                    </Text>
                </TouchableOpacity>
            </View>
          <View className="flex flex-row h-2/5 mt-4">
              <SafeAreaView
              className="h-full flex flex-col gap-2 items-center justify-center mr-8">
                  <Text 
                  style={{ fontFamily: 'Nunito-Medium'}}
                  className="text-[#fff] text-xl font-semibold">
                      Retador
                  </Text>
                  <ScrollView 
                  showsVerticalScrollIndicator={false} 
                  className="flex flex-col">
                  {
                  players.map((player, index) => {
                      if (player === playerChallenged) return (<></>)
                      return (
                      <TouchableOpacity 
                          onPress={() => {
                              setPlayerChallenger(player)
                          }}
                          key={index + 100} 
                          className="bg-purple flex flex-row py-2 items-center justify-center w-32 border border-black rounded-lg mb-2">
                              <Text 
                              style={{ fontFamily: 'Nunito-Bold'}}
                              className="text-black font-semibold">
                              {player}
                              </Text>
                      </TouchableOpacity>
                      )
                  })
                  }
                  </ScrollView>
              </SafeAreaView>
              <SafeAreaView className="h-full flex flex-col gap-2 items-center justify-center">
                  <Text 
                  style={{ fontFamily: 'Nunito-Medium'}}
                  className="text-[#fff] text-xl font-semibold">
                      Retado
                  </Text>
                  <ScrollView 
                  showsVerticalScrollIndicator={false} 
                  className="flex flex-col">
                  {
                  players.map((player, index) => {
                      if (player === playerChallenger) return (<></>)
                      return (
                      <TouchableOpacity 
                          onPress={() => {
                              setPlayerChallenged(player)
                          }}
                          key={index + 2} 
                          className="bg-purple flex flex-row py-2 items-center justify-center w-32 border border-black rounded-lg mb-2">
                          <Text 
                          style={{ fontFamily: 'Nunito-Bold'}}
                          className="text-black font-semibold">
                          {player}
                          </Text>
                      </TouchableOpacity>
                      )
                  })
                  }
                  </ScrollView>
              </SafeAreaView>
          </View>
          <View className="flex flex-row gap-2 items-center mb-8 mt-4">
              <TouchableOpacity onPress={() => setPlayerChallenger('')}>
                  <Text style={{ fontFamily: 'Nunito-Light'}} className="w-32 h-10 py-1 text-center text-[#fff] text-lg bg-secondary rounded-lg">
                      {playerChallenger}
                  </Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#BBB] text-md text-end">
                  le dijo "Bullshit" a
              </Text>
              <TouchableOpacity onPress={() => setPlayerChallenged('')}>
                  <Text style={{ fontFamily: 'Nunito-Light'}} className="w-32 h-10 py-1 bg-secondary rounded-lg text-center text-[#fff] text-lg">
                      {playerChallenged}
                  </Text>
              </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center mb-4">
              <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#fff] mr-4 text-2xl">
                  Cantidad
              </Text>
              <TextInput
              keyboardType='numeric'
              onChangeText={setNumber}
              value={number}
              className="border border-purple rounded-md px-2 py-2 w-14 bg-secondary text-[#fff] text-center text-2xl"
              style={{ fontFamily: 'Nunito-Light'}}
              selectionColor={'white'}
              />
          </View>
          <TouchableOpacity
          onPress={() => {
              savePlayers()
          }}
          className="bg-[#96b3ff] w-60 mt-24 px-4 py-2 rounded-md flex items-center justify-center">
              <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-black font-semibold">
                  Continuar
              </Text>
          </TouchableOpacity>
      </View>
    </>
  )
}