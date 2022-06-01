import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';

type scoreObject = {
  name: string;
  score: number;
};
const path = RNFS.DocumentDirectoryPath + '/highscores.txt';
const MAX_LIST_LENGTH = 10

export default function useHighscores() {
  const [fileContent, setFileContent] = useState<Array<scoreObject>>([]);

  const createFile = async () => {
    RNFS.writeFile(path, '').catch(err => {
      console.log(err.message);
    });
  };

  const readFile = async () => {
    return new Promise(async resolve => {
      RNFS.readFile(path)
        .then(content => {
          let scoreArray = content.split('|');
          scoreArray.pop();
          let scoreJSON = scoreArray.map(item => {
            return JSON.parse(item);
          });
          setFileContent(scoreJSON);
          resolve('Done');
        })
        .catch(err => console.log(err.message));
    });
  };

  const saveResult = async (name: string, score: number) => {
    await readFile();
    let newFileContent = sortHighscoreList(name, score);
    setFileContent(newFileContent);
    let str = '';
    newFileContent.forEach(
      item =>
        (str += JSON.stringify({name: item.name, score: item.score}) + '|'),
    );
    RNFS.writeFile(path, str).catch(err => {
      console.log(err.message);
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const sortHighscoreList = (name: string, score: number) => {
    let tempFileContent = [...fileContent];
    tempFileContent.push({name: name, score: score});
    let arrLength = tempFileContent.length || 0;
    for (let i = 0; i < arrLength - 1; i++) {
      for (let j = i + 1; j < arrLength; j++) {
        if (tempFileContent[j].score > tempFileContent[i].score) {
          let temp = tempFileContent[i];
          tempFileContent[i] = tempFileContent[j];
          tempFileContent[j] = temp;
        }
      }
    }
    return tempFileContent;
  };

  async function initialize() {
    try {
      if (!(await RNFS.exists(path))) return createFile();
    } catch (err) {
      console.log(err);
    }
    readFile();
  }

  return {saveResult: saveResult, scoreList: fileContent};
}
