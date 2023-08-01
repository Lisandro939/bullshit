import { View, FlatList, Animated } from 'react-native'
import React, {useState, useRef} from 'react'
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import slides from '../slides.js'
import RuleItem from './components/RuleItem.js';
import Paginator from './components/Paginator.js';
import NextButton from './components/NextButton.js';

export default function rules() {

    const router = useRouter()

    const text = "text-[#fff]"

    const [currentIndex, setCurrentIndex] = useState(0)

    const scrollX = useRef(new Animated.Value(0)).current
    const slidesRef = useRef(null)

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

    const scrollTo = () => {
        if(currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({index: currentIndex + 1})
        } else {
            router.push('/main')
        }
    }

  return (
    <>
        <StatusBar style='light' />
        <View className="mt-[40px] h-[110vh] py-14 flex flex-col gap-4 bg-primary">
            <View style={{ flex: 3}}>
                <FlatList 
                data={slides} 
                renderItem={({item}) => <RuleItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], 
                    {useNativeDriver: false})}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton currentIndex={currentIndex} scrollTo={scrollTo}/>
        </View>
    </>
  )
}