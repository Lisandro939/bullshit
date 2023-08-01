import { useCallback, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Animated, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function index() {
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Black': require('../assets/fonts/Nunito-Black.ttf'),
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Nunito-ExtraLight': require('../assets/fonts/Nunito-ExtraLight.ttf'),
  });

  const router = useRouter();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      await AsyncStorage.getItem('first-time').then((value) => {
        if (value === null) {
          setTimeout(() => {
            router.push('/modal')
          }, 1500)
        } else {
          setTimeout(() => {
            router.push('/main')
          }, 1500)
        }
    })
  }
  }, [fontsLoaded]);

  useEffect(() => {
    fadeIn()
    move()
  },[])

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(-50)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

    const move = () => {   
        Animated.timing(moveAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
        <StatusBar style='light' />
        <View 
        style={styles.container} 
        className="bg-primary flex flex-col gap-16" 
        onLayout={onLayoutRootView}>
            <Animated.Image 
            style={[{transform: [{translateY: moveAnim}]}, {opacity : fadeAnim}]}
            className="h-40 w-40"
            source={require('../assets/Logo-Img.png')}
            />
            <Animated.Text 
            style={[{ fontFamily: 'Nunito-Light'}, {opacity : fadeAnim}]} 
            className="text-[#fff] text-4xl scale-150">
                BULLSHIT
            </Animated.Text>
            <ActivityIndicator 
            className="scale-150 transition-all duration-500" 
            size="large" 
            color="#96b3ff" />
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Nunito-Light'
  },
});
