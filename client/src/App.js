import './App.css';
import AnswerBox from './components/AnswerBox';
import QuestionBox from './components/QuestionBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Controlls from './components/Controlls';
import ErrorModal from './components/ErrorModal';
import Loading from './components/Loading';

function App() {

  const [qa, setQA] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
    setQA({});
    getQA();
  }, [currentQuestion]);

  const getQA = () => {
    setLoading(true);
    axios.get('/questions/' + currentQuestion)
      .then(res => {
        setQA(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className="App">
      <QuestionBox question={qa.question} currentQuestion={qa.currentQuestion} />
      <AnswerBox responses={qa.responses} />
      <Controlls currentQuestion={qa.currentQuestion} totalQuestions={qa.totalQuestions} changeQuestion={setCurrentQuestion}/>
      {error && <ErrorModal message={error.toString()} removeError={() => setError('')}/>}
      {loading && <Loading loading={loading} />}
    </div>
  );
}

export default App;
