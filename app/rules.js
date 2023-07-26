import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function rules() {

  const router = useRouter()

  const text = "text-white"

  return (
    <>
        <StatusBar style='light' />
        <View className="mt-[40px] h-[110vh] w-[104vw] px-6 py-14 flex flex-col gap-4 bg-[#00003d]">
        <TouchableOpacity 
            onPress={() => router.back()} 
            className="bg-[#96b3ff] w-20 px-4 py-2 rounded-md flex items-center justify-center">
            <Text className="text-black text-md font-semibold">Volver</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-white">
            ¿Cómo se juega?
        </Text>
        <View className="flex flex-col">
            <Text className={text}>
            El jugador que inicie la ronda elige un tema y comienza dándole un valor como lo puede ser de la 
            siguiente forma: "Conozco 3 marcas de autos".
            </Text>
            <Text className={text}>
            De esa misma forma y siguiente lo temática, los jugadores en ronda deberán aumentar la cantidad
            de dicha temática (pudiendo incluso mentir). En caso de desconfiar de alguien los jugadores de los
            costados inmediatos pueden decir "Bullshit".
            </Text>
            <Text className={text}>
            En ese momento el jugador juzgado deberá demostrar que sabe dicha cantidad. Entre palabra y palabra
            tendrá un lapso de 10 segundos para volver a mencionar una palabra de la temática.
            </Text>
            <Text className={text}>
            En caso de que sepa la cantidad que mencionó, el jugador que dijo "Bullshit" quedará descalificado.
            En caso de que no sepa la cantidad que mencionó, será él el que quedé descalificado y el jugador que 
            dijo "Bullshit" ganará la ronda.
            </Text>
            <Text className={text}>
            Luego de esto, se reinicia la ronda y el jugador que ganó la ronda anterior elige el tema y comienza
            la ronda.
            </Text>
        </View>
        <Text className="text-2xl font-semibold text-white">
            Reglas
        </Text>
        <View className="flex flex-col">
            <Text className={text}>
            1. Siempre se debe decir un numero superior al anterior.
            </Text>
            <Text className={text}>
            2. Solo los jugadores de los costados inmediatos pueden decir "Bullshit".
            </Text>
            <Text className={text}>
            3. El que gana dice el tema de la siguiente ronda, y por ende, empieza la ronda.
            </Text>
            <Text className={text}>
            4. Se pueden decir categorías con cantidades limitadas o ilimitadas.
            </Text>
        </View>
        </View>
    </>
  )
}