/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {RootState, store} from './store';
import {Provider, useDispatch, useSelector} from 'react-redux';

import useRandomSequence from './src/Hooks/useRandomSequence';
import {appendElement} from './src/Features/sequenceSlice';
import Results from './src/Components/NameModal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import Highscores from './src/Components/Highscores';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={App} />
          <Stack.Screen name="Highscores" component={Highscores} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Highscores: {
    restartGame: () => void;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const App = ({ navigation }: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [clickedColor, setClickedColor] = useState<number>();

  const currentColor = useSelector(
    (state: RootState) => state.simonSequence.currentColor,
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const nameModalVisible = useSelector(
    (state: RootState) => state.nameModal.showModal,
  );
  const {isActive, score, restartGame, simonSpeaks} = useRandomSequence({
    maxNumber: 4,
  });

  const handleClick = (number: number) => {
    dispatch(appendElement(number));
  };

  useEffect(()=>{
    navigation.navigate('Highscores' as never, {
      restartGame: restartGame
    } as never)
  },[nameModalVisible])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.score}>Score: {score}</Text>
          {!isActive && <Button title="Start Game" onPress={restartGame} />}
          <View style={styles.colorsContainer}>
            <Pressable
              onPress={() => !simonSpeaks &&  handleClick(1)}
              onPressIn={() => !simonSpeaks &&  setClickedColor(1)}
              onPressOut={() => setClickedColor(-1)}
              style={{
                flex: 1,
                backgroundColor:
                  currentColor === 1 || clickedColor === 1
                    ? 'rgb(0,225,0)'
                    : 'rgb(0,50,0)',
              }}></Pressable>
            <Pressable
              onPress={() => !simonSpeaks && handleClick(2)}
              onPressIn={() => !simonSpeaks && setClickedColor(2)}
              onPressOut={() => setClickedColor(-1)}
              style={{
                flex: 1,
                backgroundColor:
                  currentColor === 2 || clickedColor === 2
                    ? 'rgb(225,0,0)'
                    : 'rgb(50,0,0)',
              }}></Pressable>
          </View>
          <View style={styles.colorsContainer}>
            <Pressable
              onPress={() => !simonSpeaks &&  handleClick(3)}
              onPressIn={() => !simonSpeaks &&  setClickedColor(3)}
              onPressOut={() => setClickedColor(-1)}
              style={{
                flex: 1,

                backgroundColor:
                  currentColor === 3 || clickedColor === 3
                    ? 'rgb(225,225,0)'
                    : 'rgb(50,50,0)',
              }}></Pressable>
            <Pressable
              onPress={() => !simonSpeaks &&  handleClick(4)}
              onPressIn={() => !simonSpeaks &&  setClickedColor(4)}
              onPressOut={() => setClickedColor(-1)}
              style={{
                flex: 1,
                backgroundColor:
                  currentColor === 4 || clickedColor === 4
                    ? 'rgb(0,0,225)'
                    : 'rgb(0,0,50)',
              }}></Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  score: {
    fontSize: 28,
    textAlign: 'center',
    margin: '10%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  colorsContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AppWrapper;
