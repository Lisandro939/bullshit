import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function InitGame() {

    const router = useRouter()

    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState('');

    function setPlayersIn(player) {
      setPlayers([...players, player]);
    }

    function setNumberOfPlayersInAsyncStorage() {
      if (players.length < 2) return;
      AsyncStorage.setItem('players', JSON.stringify(players));
      router.push('/game')
    }
    return (
      <>
        <StatusBar style='light' />
        <View className={`h-[110vh] bg-[#00003d] flex items-center justify-center relative py-[15vh]`}>
          <TouchableOpacity 
          onPress={() => router.back()} 
          className="bg-[#96b3ff] px-4 py-2 rounded-md absolute top-14 left-4">
              <Text className="text-black font-semibold">Volver</Text>
          </TouchableOpacity>
          <Text className="text-3xl text-white">
            Ingrese los jugadores
          </Text>
          <View className="flex flex-col gap-4 items-center justify-center">
            <TextInput
              onChangeText={setPlayer}
              value={player}
              placeholder="Jugador"
              className="border-2 border-[#5b7dcf] rounded-md px-4 py-2 w-56 bg-[#00276c] text-white"
            />
            <TouchableOpacity
              onPress={() => {
                setPlayer('')
                setPlayersIn(player)
              }}
              className="bg-[#96b3ff] w-56 py-2 rounded-md">
              <Text className="text-black font-semibold text-center">
                Agregar
              </Text>
            </TouchableOpacity>
            <SafeAreaView className="h-2/3">
              <ScrollView className="flex flex-col gap-2">
              {
                players.map((player, index) => {
                  return (
                    <View key={index} className="flex flex-row items-center justify-between w-56">
                      <Text className="w-36 overflow-hidden text-white text-lg">
                        {player}
                      </Text>
                      <TouchableOpacity 
                      onPress={() => {
                        setPlayers(players.filter((p) => p !== player))
                      }} 
                      className="bg-red-500 p-2 rounded-md">
                        <Icon name="trash" size={20} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
              </ScrollView>
            </SafeAreaView>
          </View>
            <TouchableOpacity 
            onPress={() => setNumberOfPlayersInAsyncStorage()} 
            className="bg-[#96b3ff] px-8 py-2 rounded-md flex items-center justify-center">
              <Text className="font-semibold">
                Continuar
              </Text>
            </TouchableOpacity>
        </View>
      </>
    );
}