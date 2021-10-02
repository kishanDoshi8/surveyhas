import './App.css';
import AnswerBox from './components/AnswerBox';
import QuestionBox from './components/QuestionBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Controlls from './components/Controlls';

function App() {

  const [qa, setQA] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    setQA({});
    getQA();
  }, [currentQuestion]);

  const getQA = () => {
    axios.get('/questions/' + currentQuestion)
      .then(res => {
        setQA(res.data);
      })
  }

  return (
    <div className="App">
      <QuestionBox question={qa.question} currentQuestion={qa.currentQuestion} />
      <AnswerBox responses={qa.responses} />
      <Controlls currentQuestion={qa.currentQuestion} totalQuestions={qa.totalQuestions} changeQuestion={setCurrentQuestion}/>
    </div>
  );
}

export default App;
