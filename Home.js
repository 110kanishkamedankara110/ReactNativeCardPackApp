import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, Dimensions, Pressable, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from './card';



export function Home() {
  let cards =([
    {
      id: 1,
      image: require('./assets/Cards/chariot.png'),
    },
    {
      id: 2,
      image: require('./assets/Cards/death.png'),
    },
    {
      id: 3,
      image: require('./assets/Cards/devil.png'),
    },
    {
      id: 4,
      image: require('./assets/Cards/fool.png'),
    },
    {
      id: 5,
      image: require('./assets/Cards/hermit.png'),
    },
    {
      id: 6,
      image: require('./assets/Cards/high-priestess.png'),
    },
    {
      id: 7,
      image: require('./assets/Cards/judegment.png'),
    },
    {
      id: 8,
      image: require('./assets/Cards/justice.png'),
    },
    {
      id: 9,
      image: require('./assets/Cards/lover.png'),
    },
    {
      id: 10,
      image: require('./assets/Cards/moon.png'),
    }, {
      id: 17,
      image: require('./assets/Cards/world.png'),
    },
    {
      id: 11,
      image: require('./assets/Cards/pendu.png'),
    },
    {
      id: 12,
      image: require('./assets/Cards/strength.png'),
    },

    {
      id: 13,
      image: require('./assets/Cards/sun.png'),
    },
    {
      id: 14,
      image: require('./assets/Cards/temperance.png'),
    },
    {
      id: 15,
      image: require('./assets/Cards/tower.png'),
    },
    {
      id: 16,
      image: require('./assets/Cards/wheel.png'),
    },

  ]).sort(() => Math.random() - 0.5)
  const [suffle, setSuffle] = useState(false);
  useEffect(() => {
    if (suffle) {
      cards=cards.sort(() => Math.random() - 0.5);
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

      {cards.map((card, index) => (
        <Card key={index} index={index} suffle={setSuffle} setSuffle={setSuffle} image={card.image} />
      ))}
      {/* <Card index={1} image={require('./assets/Cards/world.png')}/> */}
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#56C5F7",
  }
});
