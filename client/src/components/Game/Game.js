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
  const [teamsInfo, setTeamsInfo] = useState([
    {name: 'Wololo', score: 0, wrongAnswers: 0},
    {name: 'Soul', score: 0, wrongAnswers: 0}
  ]);

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
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div>
      <ScoreBoard teamSelected={teamSelected} setTeamSelected={setTeamSelected} teamsInfo={teamsInfo} setTeamsInfo={setTeamsInfo} />
      <QuestionBox question={qa.question} currentQuestion={qa.currentQuestion} />
      <AnswerBox responses={qa.responses} teamSelected={teamSelected} teamsInfo={teamsInfo} setTeamsInfo={setTeamsInfo} setError={setError} />
      <Controlls currentQuestion={qa.currentQuestion} totalQuestions={totalQuestions} changeQuestion={setCurrentQuestion}/>
      {error && <ErrorModal message={error.toString()} removeError={() => setError('')}/>}
      {loading && <Loading loading={loading} />}
    </div>
  );
}

export default Game;
