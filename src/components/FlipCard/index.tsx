import React from 'react';
import { Pressable } from 'react-native';

/* 
  o useSharedValue é um valor que vai ser armazenado e compartilhado com a
  animação. Ele é parecido com o useState
  o useAnimatedStyle é um recurso do reanimated para criar estilizações que vão
  responder as animações, ou seja, a estilização animada
*/
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Card } from '../Card';
import { styles } from './styles';

type Props = {
  data: {
    id: string;
    front: string;
    back: string;
  }
}

export function FlipCard({ data }: Props) {
  // o flipPositionAnimated vai ser usado para armazenar uma informação 0 e 1
  // eu vou usar essa estratégia porque eu quero saber se o card que está visível
  // é o da frente ou de trás, se tiver o 0 é o da frente, se tiver 1 significa
  // que é o card de trás que esta visível
  const flipPositionAnimated = useSharedValue(0);

  const frontCardAnimated = useAnimatedStyle(() => {
    return {
      transform: [{
        rotateY: ''
      }],
    }
  });
  
  return (
    <Pressable onPress={() => { }}>
      <Card label={data.front} />
      <Card label={data.back} style={styles.back} />
    </Pressable>
  );
}