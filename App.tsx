/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {CaretLeft, CaretRight} from 'phosphor-react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

import Input from './src/components/Input';
import Button from './src/components/Button';

import ThemeColors from './src/styles/themeColors';
import styles from './App.style';

const MMKV = new MMKVLoader().initialize();
const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [bottleSize, setBottleSize] = useMMKVStorage('bottleSize', MMKV, '');
  const [weight, setWeight] = useMMKVStorage('weight', MMKV, '');
  const [bottleQuantity, setBottleQuantity] = useMMKVStorage(
    'bottleQuantity',
    MMKV,
    0,
  );
  const [isQuantityCalculated, setIsQuantityCalculated] = useMMKVStorage(
    'isQuantityCalculated',
    MMKV,
    false,
  );
  const [amountOfTakenBottles, setAmountOfTakenBottles] = useMMKVStorage(
    'amountOfTakenBottles',
    MMKV,
    0,
  );
  const [actualCountingTimestamp, setActualCountingTimestamp] = useMMKVStorage(
    'actualCountingTimestamp',
    MMKV,
    '',
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible === 'active') {
      if (actualCountingTimestamp) {
        const actualCountingDate = new Date(+actualCountingTimestamp);
        const currentDate = new Date();
        const isSameDate =
          actualCountingDate.getDate() === currentDate.getDate() &&
          actualCountingDate.getMonth() === currentDate.getMonth() &&
          actualCountingDate.getFullYear() === currentDate.getFullYear();

        if (!isSameDate) {
          const tookItAll = amountOfTakenBottles >= bottleQuantity;
          const title = tookItAll
            ? 'Parabéns, campeão!'
            : 'Parece que você não conseguiu :(';
          const message = tookItAll
            ? 'Você conseguiu beber todas as garrafas, preparado para mais um dia incrível?'
            : 'Você não conseguiu beber todas as garrafas, dessa forma você não vai conseguir alcançar as suas metas. Dessa vez você vai conseguir, certo?';
          Alert.alert(
            title,
            message,
            [
              {
                text: 'Sim!',
                onPress: () => {
                  setAmountOfTakenBottles(0);
                  setActualCountingTimestamp(new Date().getTime().toString());
                },
              },
            ],
            {cancelable: false},
          );
        }
      }
    }
  }, [appStateVisible]);

  const handleDefineBottlesQuantity = () => {
    if (bottleSize && weight) {
      const quantityOfWaterByWeight = 50;
      const bottlesQuantity = Math.floor(
        (+weight * quantityOfWaterByWeight) / +bottleSize,
      );
      setBottleQuantity(bottlesQuantity);
      setIsQuantityCalculated(true);
      setActualCountingTimestamp(new Date().getTime().toString());
    } else {
      Alert.alert(
        'Você não esqueceu nada?',
        'Por favor, preencha todos os campos :3',
      );
    }
  };

  const handleChangeBottleSize = (value: string) => {
    setBottleSize(value);
  };

  const handleChangeWeight = (value: string) => {
    setWeight(value);
  };

  const handleReset = () => {
    setBottleSize('');
    setWeight('');
    setBottleQuantity(0);
    setIsQuantityCalculated(false);
    setAmountOfTakenBottles(0);
    setActualCountingTimestamp('');
  };

  const handleReturnBottle = () => {
    if (amountOfTakenBottles > 0) {
      setAmountOfTakenBottles(amountOfTakenBottles - 1);
    } else {
      Alert.alert(
        'Você não pode voltar mais!',
        'Você já retirou todas as garrafas!',
      );
    }
  };

  const handleTakeBottle = () => {
    setAmountOfTakenBottles(amountOfTakenBottles + 1);

    if (amountOfTakenBottles === bottleQuantity - 1) {
      Alert.alert(
        'Parabéns!',
        'Você conseguiu tomar todas as garrafas de água!',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Gerenciador de Quantidade de Água/Dia</Text>
        <View style={styles.inputsContainer}>
          <Input
            keyboardType="number-pad"
            label="Tamanho da Garrafa (ml)"
            value={bottleSize}
            onChangeText={handleChangeBottleSize}
            textAlign="center"
            editable={!isQuantityCalculated}
          />
          <Input
            keyboardType="number-pad"
            label="Peso (kg)"
            value={weight}
            onChangeText={handleChangeWeight}
            textAlign="center"
            editable={!isQuantityCalculated}
          />
        </View>
        {!isQuantityCalculated && (
          <Button title="Iniciar" onPress={handleDefineBottlesQuantity} />
        )}

        {isQuantityCalculated && (
          <View style={styles.dashboardContainer}>
            <View style={styles.dashboard}>
              <Text
                style={
                  styles.amountOfBottlesText
                }>{`${amountOfTakenBottles}/${bottleQuantity}`}</Text>
              <Text>Quantidade de garrafas tomadas hoje</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleReturnBottle}>
                <CaretLeft
                  size={40}
                  color={ThemeColors.Teal}
                  weight="duotone"
                />
              </TouchableOpacity>
              <Button title="Reiniciar" onPress={handleReset} />
              <TouchableOpacity onPress={handleTakeBottle}>
                <CaretRight
                  size={40}
                  color={ThemeColors.Teal}
                  weight="duotone"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
