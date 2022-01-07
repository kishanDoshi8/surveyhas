import AnswerBox from './AnswerBox';
import QuestionBox from './QuestionBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Controlls from './Controlls';
import ErrorModal from '../ErrorModal';
import Loading from '../Loading';
import ScoreBoard from './ScoreBoard';

function Game() {

  const [qa, setQA] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamSelected, setTeamSelected] = useState(-1);

  useEffect(() => {
    setError('');
    setQA({});
    getQA();
  }, [currentQuestion]);

  const getQA = () => {
    // Reset Team selected
    setTeamSelected(-1);
    setLoading(true);
    axios.get('/api/questions/' + currentQuestion)
      .then(res => {
        setQA(res.data);
        setTotalQuestions(res.data.totalQuestions);
      })
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.msg : err.message;
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div>
      <ScoreBoard teamSelected={teamSelected} setTeamSelected={setTeamSelected} />
      <QuestionBox question={qa.question} currentQuestion={qa.currentQuestion} />
      <AnswerBox responses={qa.responses} teamSelected={teamSelected} setError={setError} />
      <Controlls currentQuestion={qa.currentQuestion} totalQuestions={totalQuestions} changeQuestion={setCurrentQuestion}/>
      {error && <ErrorModal message={error.toString()} removeError={() => setError('')}/>}
      {loading && <Loading />}
    </div>
  );
}

export default Game;
