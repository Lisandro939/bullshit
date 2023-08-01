import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';

export default function ConfigureTime() {

    const router = useRouter()

    const [numero, setNumero] = useState(10);

    const handleOnPress = () => {
        setNumero(parseInt(numero));
        if (numero > 20 || numero == 0) return;
        AsyncStorage.setItem('time', numero.toString());
        router.push('/main')
    }

    useEffect(() => {
        AsyncStorage.getItem('time').then((time) => {
            if (time) {
                setNumero(parseInt(time))
            }
        })
    }, [])


    return (
        <>
            <StatusBar style='light' />
            <View className={`h-[110vh] bg-primary flex items-center justify-center relative py-[15vh]`}>
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    className="bg-[#96b3ff] px-4 py-2 rounded-md absolute top-14 left-4">
                    <Text style={{ fontFamily: 'Nunito-Bold'}} className="text-black font-semibold">Volver</Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#fff] text-xl">
                    Ingrese el tiempo máximo de segundos
                </Text>
                <Text style={{ fontFamily: 'Nunito-Light'}} className="pb-16 text-[#fff] text-xl">
                    entre palabra y palabra
                </Text>
                <TextInput
                className="border-2 border-secondary pt-10 rounded-md w-48 h-48 bg-secondary text-[#fff] text-9xl text-center"
                value={numero.toString()}
                keyboardType="numeric"
                onChangeText={setNumero}
                style={{ fontFamily: 'Nunito-Light'}}
                selectionColor={'white'}
                />
                {
                    (numero > 20 || numero == 0) ? <Text style={{ fontFamily: 'Nunito-Light'}} className="text-[#ff0000] mt-10 mb-10">El tiempo tiene que ser entre 1 y 20</Text>
                    :
                    <Text style={{ fontFamily: 'Nunito-Light'}} className="text-primary mt-10 mb-10">
                        Nada
                    </Text>
                    
                }
                <TouchableOpacity
                onPress={handleOnPress} 
                className="bg-[#96b3ff] w-60 px-8 py-2 rounded-md flex items-center justify-center mb-6">
                    <Text 
                    style={{ fontFamily: 'Nunito-Bold'}}
                    className="">Aceptar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}