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
    const [time, setTime] = useState(10); 
    const [seconds, setSeconds] = useState(time);
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
        AsyncStorage.getItem('time').then((time) => {
            setTime(parseInt(time))
            setSeconds(parseInt(time))
        })
        setFinished(false);
        setWon(false);
        setStarted(false);
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
            setSeconds(time);
            setFinished(true);
            setWon(true);
        } 
        if (seconds === 0) {
            setRunning(false);
            setSeconds(time);
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
        setSeconds(time);
    };
    const resetTimerMinus = () => {
        if (counter === 0) return;
        setCounter(counter - 1);
    };
      
    const keepPlaying = async () => {
        await AsyncStorage.getItem('players').then(async (players) => {
            const playersArray = JSON.parse(players)
            // If won === true delete playerChallenged from playersArray
            if (won) {
                const newPlayersArray = playersArray.filter((player) => player !== playerChallenger);
                if (newPlayersArray.length === 1) {
                    router.push('/endgame')
                }
                await AsyncStorage.setItem('players', JSON.stringify(newPlayersArray)).then(() => {
                    router.push('/game')
                })
            } else {
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
        <View className="bg-primary h-[110vh] flex flex-col items-center justify-center">
            <TouchableOpacity 
                onPress={() => router.back()} 
                className="bg-[#96b3ff] px-4 py-2 rounded-md absolute top-14 left-4">
                    <Text 
                    style={{ fontFamily: 'Nunito-Bold'}}
                    className="text-black font-semibold">Volver</Text>
                </TouchableOpacity>
            <Text style={{ fontFamily: 'Nunito-Light'}} className="text-4xl pb-6 text-[#fff] text-center">{playerChallenged}</Text>
            {
                !finished && <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#fff] text-2xl mb-8">Tiene que decir {number}</Text>
            }
            
            {
                !finished && <Text className="text-5xl text-purple mb-8">{counter}</Text>
            }
            {
                !finished && <Text className="text-9xl text-[#fff]">{seconds}s</Text>
            }
            {
                finished && won ?
                <View className="flex flex-col">
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="text-2xl text-center text-[#fff] mb-4">¡Ganó!</Text>
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#fff] text-lg mb-8"> El jugador {playerChallenger} queda eliminado</Text>
                </View>
                :
                finished && !won &&
                <View className="flex flex-col">
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="text-2xl text-center text-[#fff] mb-4">Perdió :(</Text>
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#fff] text-lg mb-8"> El jugador {playerChallenged} queda eliminado</Text>
                </View>
            }
            {
                (!running && !finished && !started) &&
                <TouchableHighlight 
                onPress={startTimer}
                className="bg-[#96b3ff] border border-[#96b3ff] rounded-lg h-16 flex items-center justify-center">
                    <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-center px-4 py-2 text-4xl">Empezar</Text>
                </TouchableHighlight>
            }
            <View className="flex flex-row items-center justify-center gap-4">
                {
                    (!finished && started && running) &&
                    <TouchableOpacity
                    onPress={resetTimerMinus}
                    className="bg-[#ff0000] h-16 w-16 rounded-lg flex items-center justify-center">
                        <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-center px-4 py-4 text-2xl text-black font-semibold">-1</Text>
                    </TouchableOpacity>
                }  
                {
                    (!finished && started && running) &&
                    <TouchableOpacity
                    onPress={resetTimerPlus}
                    className="bg-[#3BB143] rounded-lg h-28 w-28 flex items-center justify-center">
                        <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-center px-4 py-8 text-6xl">+1</Text>
                    </TouchableOpacity>
                }
            </View>
            {
                finished &&
                <TouchableHighlight
                onPress={keepPlaying}
                className="bg-[#96b3ff] border border-[#96b3ff] rounded-lg h-16 flex items-center justify-center mt-6">
                    <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-center px-4 py-2 text-4xl">Siguiente</Text>
                </TouchableHighlight>
            }
        </View>
    </>
  )
}