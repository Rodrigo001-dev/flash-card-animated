import React, { useRef, useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';

import { Scoreboard } from '../../components/Scoreboard';
import { Highlight } from '../../components/Highlight';
import { FlipCard } from '../../components/FlipCard';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/Button';

import { CARDS } from '../../utils/cards';
import { styles } from './styles';

export function Home() {
  const [currentCard, setCurrentCard] = useState(0);
  const cardListRef = useRef<FlatList>(null);

  const totalOfCards = CARDS.length - 1;//total de cards 3(array inicia no 0) - 1

  async function handleScore() {
    await new Promise((resolve) => {
      Alert.alert(
        "Parabéns!",
        "Como foi responder essa questão agora?",
        [
          {
            text: "Fácil",
            onPress: () => {
              resolve('YES');
            },
          },
          {
            text: "Difícil",
            onPress: () => {
              resolve('YES');
            },
          },
        ]
      );
    });
  };

  async function handleCorrect() {
    if (currentCard < totalOfCards) {
      await handleScore();

      cardListRef.current?.scrollToIndex({
        index: currentCard + 1,//o currentCard for 0, adicionando + 1 vai para o proximo
        animated: true,
      });
    };

    setCurrentCard(prevState => prevState + 1); // atualizando o index no estado
  }

  return (
    <View style={styles.container}>
      <Highlight />
      <Scoreboard reviewed={currentCard} />

      <FlatList
        ref={cardListRef}
        data={CARDS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FlipCard data={item} />}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentCard}
      />

      <Text style={styles.tip}>Toque no cartão para inverter</Text>

      <Progress totalOfCards={totalOfCards} currentCard={currentCard} />

      <View style={styles.footer}>
        <Button icon="dns" />

        <Button
          icon="thumb-up-alt"
          color="secondary"
          size="large"
          onPress={handleCorrect}
        />

        <Button icon="push-pin" />
      </View>
    </View>
  );
}