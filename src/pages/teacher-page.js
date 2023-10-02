'use client'
import React, { useState } from 'react';
import axios from 'axios';


function QuizForm() {
  const [quizName, setQuizName] = useState('');
  const [questionCount, setQuestionCount] = useState(1); // Default to 1 question
  const [questions, setQuestions] = useState([{ question: '', answer: false }]);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value);
    setQuestionCount(count);
    // Initialize questions array with the specified number of questions
    const initialQuestions = Array(count).fill({ question: '', answer: false });
    setQuestions(initialQuestions);
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  
  const handleAnswerChange = (questionIndex, answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = answer;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: false }]);
    setQuestionCount(questionCount + 1);
  };

  const removeQuestion = () => {
    if (questionCount > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.pop();
      setQuestions(updatedQuestions);
      setQuestionCount(questionCount - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      quiz_name : quizName,
      quiz_question : questions,
    };
    const res  =  await axios.post('/api/create-quiz',quizData)
    console.log(quizData); // You can send this data to the backend for saving
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Name:</label>
          <input type="text" value={quizName} onChange={handleQuizNameChange} required />
        </div>
        <div>
          <label>Number of Questions:</label>
          <input
            type="number"
            value={questionCount}
            onChange={handleQuestionCountChange}
            min="1"
          />
        </div>
        {questions.map((question, index) => (
          <div key={index}>
            <label>Question {index + 1}:</label>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />
            <br />
            <label>
            True
            <input
                type="radio"
                name={`question-${index}`}
                value="true"
                defaultChecked
                onChange={() => handleAnswerChange(index, true)}
            />
            </label>
            <label>
            False
            <input
                type="radio"
                name={`question-${index}`}
                value="false"
                onChange={() => handleAnswerChange(index, false)}
            /> 
            </label>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="button" onClick={removeQuestion}>
          Remove Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}

export default QuizForm;