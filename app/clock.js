import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Clock() {

    const router = useRouter()

    const [number, setNumber] = useState(0);
    const [playerChallenged, setPlayerChallenged] = useState('');
    const [playerChallenger, setPlayerChallenger] = useState('');
    const [counter, setCounter] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);
    const [won, setWon] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('number').then((number) => {
            setNumber(parseInt(number))
        })
        AsyncStorage.getItem('playerChallenged').then((playerChallenged) => {
            setPlayerChallenged(playerChallenged)
        })
        AsyncStorage.getItem('playerChallenger').then((playerChallenger) => {
            setPlayerChallenger(playerChallenger)
        })
        setFinished(false);
        setWon(false);
        setStarted(false);
        setSeconds(10);
        setRunning(false);
        setCounter(0);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }
        }, 1000);
        if (counter >= number && counter !== 0) {
            setRunning(false);
            setSeconds(10);
            setFinished(true);
            setWon(true);
        } 
        if (seconds === 0) {
            setRunning(false);
            setSeconds(10);
            setFinished(true);
            setWon(false);
        }
        
        return () => clearInterval(interval);
      }, [running,seconds, counter]);

    const startTimer = () => {
        setRunning(true);
        setStarted(true);
    };

    const resetTimerPlus = () => {
        setCounter(counter + 1);
        setSeconds(10);
    };
    const resetTimerMinus = () => {
        setCounter(counter - 1);
    };
      
    const keepPlaying = async () => {
        await AsyncStorage.getItem('players').then(async (players) => {
            const playersArray = JSON.parse(players)
            // If won === true delete playerChallenged from playersArray
            if (won) {
                const newPlayersArray = playersArray.filter((player) => player !== playerChallenger);
                await AsyncStorage.setItem('players', JSON.stringify(newPlayersArray)).then(() => {
                    router.push('/game')
                })
            } else {
                // If won === false delete playerChallenger from playersArray
                const newPlayersArray = playersArray.filter((player) => player !== playerChallenged);
                await AsyncStorage.setItem('players', JSON.stringify(newPlayersArray)).then(() => {
                    router.push('/game')
                })
            }
        })
    }
  return (
    <>
        <StatusBar style='light' />
        <View className="bg-[#00003d] h-[110vh] flex flex-col items-center justify-center">
            <TouchableOpacity 
                onPress={() => router.back()} 
                className="bg-[#96b3ff] px-4 py-2 rounded-md absolute top-14 left-4">
                    <Text className="text-black font-semibold">Volver</Text>
                </TouchableOpacity>
            <Text className="text-6xl pb-6 text-white text-center">{playerChallenged}</Text>
            {
                !finished && <Text className="text-white text-2xl mb-8">Tiene que decir {number}</Text>
            }
            
            {
                !finished && <Text className="text-5xl text-white mb-8">{counter}</Text>
            }
            {
                !finished && <Text className="text-9xl text-white">{seconds}s</Text>
            }
            {
                finished && won ?
                <View className="flex flex-col">
                    <Text className="text-2xl text-center text-white mb-4">¡Ganó!</Text>
                    <Text className="text-white text-lg mb-8"> El jugador {playerChallenger} queda eliminado</Text>
                </View>
                :
                finished && !won &&
                <View className="flex flex-col">
                    <Text className="text-2xl text-center text-white mb-4">Perdió :(</Text>
                    <Text className="text-white text-lg mb-8"> El jugador {playerChallenged} queda eliminado</Text>
                </View>
            }
            {
                (!running && !finished && !started) &&
                <TouchableHighlight 
                onPress={startTimer}
                className="bg-[#96b3ff] border border-[#96b3ff] rounded-lg h-16 flex items-center justify-center">
                    <Text className="text-center px-4 py-2 text-4xl text-black font-semibold">Empezar</Text>
                </TouchableHighlight>
            }
            <View className="flex flex-row items-center justify-center gap-4">
                {
                    (!finished && started && running) &&
                    <TouchableHighlight
                    onPress={resetTimerMinus}
                    className="bg-red-400 border border-red-400 h-16 w-16 rounded-lg flex items-center justify-center">
                        <Text className="text-center px-4 py-4 text-2xl text-black font-semibold">-1</Text>
                    </TouchableHighlight>
                }  
                {
                    (!finished && started && running) &&
                    <TouchableHighlight
                    onPress={resetTimerPlus}
                    className="bg-green-400 border border-green-400 rounded-lg h-28 w-28 flex items-center justify-center">
                        <Text className="text-center px-4 py-4 text-6xl text-black font-semibold">+1</Text>
                    </TouchableHighlight>
                }
            </View>
            {
                finished &&
                <TouchableHighlight
                onPress={keepPlaying}
                className="bg-[#96b3ff] border border-[#96b3ff] rounded-lg h-16 flex items-center justify-center">
                    <Text className="text-center px-4 py-2 text-4xl text-black font-semibold">Siguiente</Text>
                </TouchableHighlight>
            }
        </View>
    </>
  )
}