import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import { showModal } from '../Features/modalSlice';
import {resetUserSequence} from '../Features/sequenceSlice';
import {triggerColor} from '../Features/simonSlice';

interface Props {
  maxNumber: number;
}

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type ReturnedTypes = {
    isActive: boolean,
    score: number,
    next: () => void,
    restartGame: () => void,
    simonSpeaks: boolean
}

const useRandomSequence = ({
  maxNumber,
}: Props): ReturnedTypes => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [simonSpeaks, setSimonSpeaks] = useState(false);

  const _maxNum = maxNumber;
  const initialRender = useRef(true);
  const enteredSequence = useSelector(
    (state: RootState) => state.userSequence.sequence,
  );
  const dispatch = useDispatch();
  var score = sequence.length - 1;

  const next = async () => {
    dispatch(resetUserSequence());
    let nextElement = randomInteger(1, _maxNum);
    setSequence(sequence => [...sequence, nextElement]);
  };

  const abortGame = () => {
    setIsActive(false);
    dispatch(showModal())
  };

  const restartGame = () => {
    setSequence([]);
    initialRender.current = true;
    setIsActive(true);
  }

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
  }, [initialRender.current]);

  useEffect(() => {
    isActive && triggerColorsInSequence();
  }, [sequence, isActive]);

  const triggerColorsInSequence = async () => {
    let i;
    await new Promise(resolve => setTimeout(resolve, 500));
    for (i = 0; i < sequence.length; i++) {
        setSimonSpeaks(true)
        dispatch(triggerColor(-1))
        await new Promise(resolve => setTimeout(resolve, 300));
        dispatch(triggerColor(sequence[i]));
        await new Promise(resolve => setTimeout(resolve, 300));
        setSimonSpeaks(false)
    }
    dispatch(triggerColor(-1));

  };
  return {isActive, score, next, restartGame, simonSpeaks};
};
export default useRandomSequence;
