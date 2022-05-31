import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {hideModal} from '../Features/modalSlice';
import {
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import NameModal from './NameModal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Highscores'>;

const Highscores = ({route, navigation}: Props) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');
  const {restartGame} = route.params;

  const handleRestart = () => {
    restartGame();
    dispatch(hideModal());
  };

  const nameModalVisible = useSelector(
    (state: RootState) => state.nameModal.showModal,
  );

  return (
    <View>
      <NameModal />
      {/* <Results restartGame={restartGame} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
export default Highscores;
