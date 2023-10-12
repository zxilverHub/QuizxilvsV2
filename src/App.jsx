import React from 'react'
import "./App.css"
import { useSelector } from 'react-redux'

import Home from './container/Home'
import Review from './container/Review'
import ReviewContent from './components/ReviewContent'
import Quiz from './container/Quiz'
import QuizForm from './components/QuizForm'
import Result from './container/Result'

function Page() {
  const page = useSelector(state => state.app.currentPage)

  switch(page) {
    case "home":
      return (
        <Home />
      )
    case "review":
      return (
        <Review />
      )
    case "reviewContent":
      return (
        <ReviewContent />
      )
    case "quiz":
      return (
        <Quiz />
      )
    case "quiz-form":
      return (
        <QuizForm />
      )
    case "result":
      return (
        <Result />
      )
  }
}

function App() {
  return (
    <>
      <Page />
    </>
  )
}

export default App