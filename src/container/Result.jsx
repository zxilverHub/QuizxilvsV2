import "./result.css"

import { useSelector, useDispatch } from "react-redux"
import { handleBack, handleType, resetAnswers } from "../features/AppSlice"

function Result() {
    const dispatch = useDispatch()
    const type = useSelector(state => state.app.quizType)
    const results = (type=="Enumeration"? useSelector(state => state.enum.originalState) : useSelector(state => state.quiz.userAnswers))

    function getScore(result) {
        let score = 0, size = result.length;
        result.forEach(res => {
            if(res.isCorrect) {
                score++;
            }
        })

        return `${score}/${size}`
    }

    function getGoted(result) {
        let score = 0, siz = result.answers.length
        result.answers.forEach(ans=> {
            result.userAnswers.forEach(uans => {
                if(String(uans).toLocaleLowerCase() == String(ans).toLocaleLowerCase()) {
                    score++;
                }
            })
        })

        return `${score}/${siz}`
    }

    function isHave(cor, ans) {
        let have = false
        cor.forEach(c => {
            if(String(c).toLocaleLowerCase() == String(ans).toLocaleLowerCase()) {
                have = true
            }
        })

        return have
    }

  return (
    <div className="result">
        <div className="score-div">
            <button className="back" 
                    onClick={()=>{
                        dispatch(handleBack("quiz"));
                        dispatch(handleType("Multiple choice"));
                        dispatch(resetAnswers())
                    }}>
                    Back
            </button>
            {type!="Enumeration" && <p className="score">{getScore(results)}</p> }
        </div>

        {type!="Enumeration"?
        <div className="result-container">
            {results.map((result, i) => (
                <div className="result-card" key={i}>
                    <p className="question">{result.question}</p>

                    <p className={`correct-answer ${result.isCorrect? "": "wrong"}`}>
                        Your answer: {result.userAnswered}
                        {!result.isCorrect && <span>Correct answer: {result.correctAnswer[0]}</span>}
                    </p>
                </div>
            ))}
        </div>:

        <div className="result-container">
            {results.map((result, i) => (
                <div className="result-card" key={i}>
                    <p className="question">
                        {result.question} ({getGoted(result)})
                    </p>
                    <div className="your-answers">
                        {result.userAnswers.map(ans => (
                            <p className={`${isHave(result.answers, ans)? "anwered": "wrong-en"}`}>{ans}</p>
                        ))}
                    </div>
                    <div className="correct-answers">
                        {result.answers.map((cor, c) => (
                            <p className="anwered cor" key={c}>{cor}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        }
    </div>
  )
}

export default Result