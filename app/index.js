import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';

export default function index() {

    const router = useRouter()

  return (
    <>
        <StatusBar style='light' />
            <View className="h-[110vh] flex flex-col gap-8 items-center justify-start pt-32 bg-[#1B0833]">
            <Text className="text-6xl text-lightblue mb-48">
                BULLSHIT
            </Text>
            <View className="flex flex-col">
                <TouchableOpacity
                onPress={() => router.push('/initgame')} 
                className="bg-[#96b3ff] w-32 px-4 py-2 rounded-md flex items-center justify-center mb-6">
                    <Text className="text-black text-2xl font-semibold">Jugar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => router.push('/rules')} 
                className="bg-[#96b3ff] w-32 px-4 py-2 rounded-md flex items-center justify-center">
                    <Text className="text-black text-2xl font-semibold">Reglas</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
  );
}

