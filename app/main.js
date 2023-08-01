import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking'

export default function main() {

    const router = useRouter()

    function handleOnPress () {
        // Get from AsyncStorage players and parse, then if the array is < 2 return
        AsyncStorage.getItem('players2').then((players) => {
            if (JSON.parse(players).length < 2) return;
            router.push('/game')
        }
        )
    }

    function goToIg () {
        Linking.openURL('https://www.instagram.com/lisandro_f1/')
    }


  return (
    <>
        <StatusBar style='light' />
        <View className="h-[110vh] flex flex-col gap-4 items-center justify-start pt-16 bg-primary">
            <View className="w-screen px-4 flex flex-row items-between justify-between">
                <View className="flex flex-row">
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="bg-[#fff] px-2 py-1 font-bold rounded-lg text-lg">ES</Text>
                    <TouchableOpacity onPress={goToIg} className="bg-[#d62976] px-1 py-1 font-bold rounded-lg text-lg ml-2">
                        <MaterialCommunityIcons name="instagram" size={26} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                onPress={() => router.push('/rules')}
                className="bg-[#707070] rounded-full px-4 py-1 ">
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="font-bold text-primary text-lg">
                        i
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="py-16">
                <Text 
                style={{ fontFamily: 'Nunito-Light'}}
                className="text-[#fff] text-2xl">
                    Configure su juego
                </Text>
            </View>
            <View className="h-3/5 flex flex-col items-center justify-between pt-20">
                <View className="flex flex-row gap-1">
                    <TouchableOpacity 
                    onPress={() => router.push('/configure-players')}
                    className="w-40 h-40 rounded-md bg-[#fff]/30 flex flex-col items-center justify-center">
                        <Text 
                        style={{ fontFamily: 'Nunito-Light'}} 
                        className="opacity-100 mb-4 text-[#fff] text-lg">
                            Jugadores
                        </Text>
                        <Icon name="users" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => router.push('/configure-time')}
                    className="w-40 h-40 rounded-md bg-[#fff]/30 flex flex-col items-center justify-center">
                        <Text 
                        style={{ fontFamily: 'Nunito-Light'}} 
                        className="opacity-100 mb-4 text-[#fff] text-lg">
                            Tiempo
                        </Text>
                        <Icon name="clock" size={30} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={handleOnPress} 
                className="bg-[#96b3ff] w-80 px-4 py-2 rounded-md flex items-center justify-center mb-6">
                    <Text 
                    style={{ fontFamily: 'Nunito-Medium'}}
                    className="text-black text-2xl">Jugar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
  );
}

