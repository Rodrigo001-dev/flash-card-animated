import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/*
  o useAnimationState é um recurso do moti que é possível criar quais são os
  estados possíveis da animação.
  no reanimated utilizando o useSharedValue só é possível colocar um valor mais
  simples como por exemplo 0 e 1
*/
import { useAnimationState, MotiView } from 'moti';

import { styles } from './styles';
import { COLORS } from '../../global/theme';

type Props = PressableProps & {
  size?: 'small' | 'large';
  color?: 'primary' | 'secondary';
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function Button({
  size = 'small',
  color = 'primary',
  icon,
  ...rest
}: Props) {
  const buttonAnimated = useAnimationState({
    pressIn: {
      transform: [{ scale: 0.8 }], // deminuir 20% do tamanho do pressable
    },
    pressOut: {
      transform: [{ scale: 1 }], // voltanto para o tamanho original
    },
  });

  // dentro do state eu tenho que definir os nomes iguais aos que eu defini no
  // buttonAnimated 
  function handleAnimatedScale(state: 'pressIn' | 'pressOut') {
    // o transitionTo é para pegar o meu estado atual e levar ele para outro
    // estado
    buttonAnimated.transitionTo(state);
  };

  return (
    /*
      no Pressable temos 2 possibilidades, o onPressIn quando o usuário
      pressiona o button
      e o onPressOut quando o usuário solta o button
      quando o usuário pressionar(onPressIn) o button(Pressable) vai fazer a 
      animação do Pressable afundar e quando o usuário soltar(onPressOut) o
      pressble ele vai voltar pro tamanho original
    */
    <Pressable
      {...rest}
      onPressIn={() => handleAnimatedScale('pressIn')}
      onPressOut={() => handleAnimatedScale('pressOut')}
    >
      {/* uma View comum não tem suporte para animação */}
      <MotiView 
        style={[styles.container, styles[size], styles[color]]}
        state={buttonAnimated}
      >
        <MaterialIcons
          name={icon}
          size={size === 'small' ? 32 : 44}
          color={color === 'primary' ? COLORS.VIOLET : COLORS.WHITE}
        />
      </MotiView>
    </Pressable>
  );
}