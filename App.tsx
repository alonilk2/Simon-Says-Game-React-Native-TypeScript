/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const currentColor = useSelector(
    (state: RootState) => state.simonSequence.currentColor,
  );
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isActive, sequence, next] = useRandomSequence({maxNumber: 4});

  // useEffect(() => {
  //   let i = 0;
  //   for (i; i < 5; i++) next();
  // }, []);

  const handleClick = (number: number) => {
    dispatch(appendElement(number));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title="1"
            color={currentColor === 1 ? '#f54263' : '#ffd9e0'}
            onPress={() => handleClick(1)}
          />
          <Button
            title="2"
            color={currentColor === 2 ? '#f54263' : '#ffd9e0'}
            onPress={() => handleClick(2)}
          />
          <Button
            title="3"
            color={currentColor === 3 ? '#f54263' : '#ffd9e0'}
            onPress={() => handleClick(3)}
          />
          <Button
            title="4"
            color={currentColor === 4 ? '#f54263' : '#ffd9e0'}
            onPress={() => handleClick(4)}
          />
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
});

export default AppWrapper;
