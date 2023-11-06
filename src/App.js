import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Result from './pages/Result';
import Quiz from './pages/Quiz';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async(category = "", difficulty = "") => {
      const{data} = await axios.get(`https://opentdb.com/api.php?amount=10${category &&
      `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`);

      setQuestions(data.results);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' exact element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path='/quiz' exact element={<Quiz 
            name={name}
            questions={questions}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}/>} />
          <Route path='/result' exact element={<Result name={name} score={score}/>} />
        </Routes>
      </div>
    </BrowserRouter> 
  );
}

export default App;
