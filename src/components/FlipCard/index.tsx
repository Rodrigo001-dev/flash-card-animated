import React from 'react';
import { Pressable } from 'react-native';

/* 
  o useSharedValue é um valor que vai ser armazenado e compartilhado com a
  animação. Ele é parecido com o useState
  o useAnimatedStyle é um recurso do reanimated para criar estilizações que vão
  responder as animações, ou seja, a estilização animada
  o interpolate vai receber um vetor com as posições da animação e ele vai cuidar
  para deixar a transição suave
*/
import { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate,
  withTiming
} from 'react-native-reanimated';

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
        /*
          o flipPositionAnimated.value é para acessar o valor atual do
          useSharedValue
          o primeiro vetor[] é para colocar quais os valorer possíveis do meu
          estado animado(useSharedValue) => [0, 1]
          o segundo vetor[] eu coloco qual o novo valor que eu quero dar quando
          chegar nesse ponto do estado da animação, se o valor atual do meu
          estado animado é 0 então vai ficar em 0 mesmo, ou seja, o cartão da
          frente, se for 1 então retaciona ele no eixo y em 180deg
        */
        rotateY: `${interpolate(flipPositionAnimated.value, [0, 1], [0, 180])}deg`
      }],
    }
  });

  const backCardAnimated = useAnimatedStyle(() => {
    return {
      transform: [{
        /*
          o flipPositionAnimated.value é para acessar o valor atual do
          useSharedValue
          o primeiro vetor[] é para colocar quais os valorer possíveis do meu
          estado animado(useSharedValue) => [0, 1]
          o segundo vetor[] eu coloco qual o novo valor que eu quero dar quando
          chegar nesse ponto do estado da animação, se o valor atual do meu
          estado animado é 0 então retaciona ele no eixo y em 180deg, e quando
          for 1 vai rotacionar 360deg
        */
        rotateY: `${interpolate(flipPositionAnimated.value, [0, 1], [180, 360])}deg`
      }],
    }
  });

  function handleFlipCard() {
    // se o que estiver dentro do flipPositionAnimated for 0 eu vou trocar para
    // 1 e se for 1 eu vou trocar para 0 
    const newValue = flipPositionAnimated.value === 0 ? 1 : 0;
    // com o withTiming eu estou aplicando o newValue no estado da animação e
    // passando a duração
    flipPositionAnimated.value = withTiming(newValue, { duration: 300 }); // 300ms
  };
  
  return (
    <Pressable onPress={handleFlipCard}>
      <Card label={data.front} style={frontCardAnimated} />
      <Card label={data.back} style={[styles.back, backCardAnimated]} />
    </Pressable>
  );
}