import {useState, useEffect, useRef} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {resetUserSequence} from '../Features/sequenceSlice';
import {triggerColor} from '../Features/simonSlice';

interface Props {
  maxNumber: number;
}

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const useRandomSequence = ({
  maxNumber,
}: Props): [boolean, number[], () => void] => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(true);
  const _maxNum = maxNumber;
  const initialRender = useRef(true);
  const enteredSequence = useSelector(
    (state: RootState) => state.userSequence.sequence,
  );
  const dispatch = useDispatch();

  const next = async () => {
    dispatch(resetUserSequence());
    let nextElement = randomInteger(1, _maxNum);
    setSequence(sequence => [...sequence, nextElement]);
  };

  const abortGame = () => {
    setIsActive(false);
    console.log('YOU LOSE');
  };

  const compareSequence = (userSequence: number[]): boolean => {
    let isEqual = false;
    if (sequence.length > 0) {
      sequence.forEach((element, idx) => {
        if (element != userSequence[idx] && userSequence[idx] != undefined)
          return abortGame();
        isEqual = true;
      });
    } else return false;
    return isEqual;
  };

  useEffect(() => {
    if (enteredSequence.length > 0) {
      let isEqual = compareSequence(enteredSequence);
      isEqual === true && enteredSequence.length === sequence.length && next();
    }
  }, [enteredSequence]);

  useEffect(() => {
    initialRender.current === true && next();
    initialRender.current = false;
  }, []);

  useEffect(() => {
    console.log(sequence);
    sequence.forEach(async element => {

    });
    triggerColorsInSequence();
  }, [sequence]);
  const triggerColorsInSequence = async () => {
    let i;
    for (i = 0; i < sequence.length; i++) {
        dispatch(triggerColor(-1))
        await new Promise(resolve => setTimeout(resolve, 200));
        dispatch(triggerColor(sequence[i]));
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    dispatch(triggerColor(-1));

  };
  return [isActive, sequence, next];
};
export default useRandomSequence;
