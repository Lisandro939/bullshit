import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ConfigurePlayers() {

    const router = useRouter()

    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState('');

    useEffect(() => {
      AsyncStorage.getItem('players2').then((players) => {
        if (players) {
          setPlayers(JSON.parse(players))
        }
      })
    }, [])

    function setPlayersIn(player) {
      setPlayers([...players, player]);
    }

    function setNumberOfPlayersInAsyncStorage() {
      if (players.length < 2) return;
      AsyncStorage.setItem('players', JSON.stringify(players));
      AsyncStorage.setItem('players2', JSON.stringify(players));
      router.push('/main')
    }
    return (
      <>
        <StatusBar style='light' />
        <View className={`h-[110vh] bg-primary flex items-center justify-center relative py-[15vh]`}>
          <TouchableOpacity 
          onPress={() => router.back()} 
          className="bg-[#96b3ff] px-4 py-2 rounded-md absolute top-14 left-4">
              <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-black font-semibold">Volver</Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Nunito-Light'}} className="text-3xl text-[#fff]">
            Ingrese los jugadores
          </Text>
          <View className="flex flex-col gap-4 items-center justify-center">
            <TextInput
              onChangeText={setPlayer}
              value={player}
              placeholder="Jugador"
              className="border-1 border-purple rounded-md px-4 py-2 w-56 bg-secondary text-[#fff]"
              style={{ fontFamily: 'Nunito-Light'}}
              selectionColor={'white'}
            />
            <TouchableOpacity
              onPress={() => {
                setPlayer('')
                setPlayersIn(player)
              }}
              className="bg-[#96b3ff] w-56 py-2 rounded-md">
              <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-black font-semibold text-center">
                Agregar
              </Text>
            </TouchableOpacity>
            <SafeAreaView className="h-2/3">
              <ScrollView className="flex flex-col gap-2">
              {
                players.map((player, index) => {
                  return (
                    <View key={index} className="flex flex-row items-center justify-between w-56">
                      <Text style={{ fontFamily: 'Nunito-Light'}} className="w-36 overflow-hidden text-[#fff] text-lg">
                        {player}
                      </Text>
                      <TouchableOpacity 
                      onPress={() => {
                        setPlayers(players.filter((p) => p !== player))
                      }} 
                      className="bg-red-500 p-2 rounded-md">
                        <Icon name="trash" size={20} color="#ff0000" />
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
            className="bg-lightblue w-60 px-8 py-2 rounded-md flex items-center justify-center">
              <Text 
              style={{ fontFamily: 'Nunito-Bold'}}
              className="font-semibold">
                Aceptar
              </Text>
            </TouchableOpacity>
        </View>
      </>
    );
}