import "./quizForm.css"

import { useSelector, useDispatch } from "react-redux"
import { handleBack, handleType, handleAnswer, handleAddAnswer, handleDeleteAnswered } from "../features/AppSlice"
import { useRef, useState } from "react"

function QuizForm() {
    const dispatch = useDispatch()
    const quizType = useSelector(state => state.app.quizType)
    const about = useSelector(state => state.about)

    // in chapter(data)
    const data = useSelector(state => state.data[about.course][about.chapter])
    const topicKeys = Object.keys(data)

    function getTopics(topic) {
        const randData = data[topic]["questions"]
        let newData = []

        while(newData.length < randData.length) {
            let rand = Math.floor(Math.random() * randData.length)

            if(!newData.includes(randData[rand])) {
                newData.push(randData[rand])
            }
        }

        return newData
    }

    function getChoices(topic, ans) {
        const topicData = data[topic]["answers"];
        let choices = [], size = topicData.length > 5? 4 : topicData.length
        let randAns = Math.floor(Math.random() * size)

        while(choices.length < size) {
            let randIndex = Math.floor(Math.random() * topicData.length)

            if(choices.length == randAns && !choices.includes(topicData[randIndex])) {
                choices.push(ans)
            }

            if(!choices.includes(topicData[randIndex]) && choices.length < size && topicData[randIndex]!=ans) {
                choices.push(topicData[randIndex])
            }
        }

        return choices
    }

    const enumerationData = useSelector(state => state.enum.originalState)


    const [value, setValue] = useState('')
    const [editingId, setEditingId] = useState('')
    
  return (
    <div className='quiz-form'>
        <button className="back" 
                onClick={()=>{
                    dispatch(handleBack("quiz"));
                    dispatch(handleType("Multiple choice"))
                }}>
                Back
        </button>

        <div className="questions">
            { quizType !== "Enumeration"?
            <>
            { topicKeys.map(key => (
                <>
                { getTopics(key).map((topic, i) => (
                   <div className="question-card" key={i}>
                    { quizType==="Multiple choice"?
                        <>
                            <p className="question">{topic.question}</p>
                            {
                                getChoices(key, topic.answer[0]).map((choice, k) => (
                                    <label htmlFor={choice+topic.id} className="choice-label" key={k} onClick={()=>dispatch(handleAnswer({main: topic, answer: choice}))}>
                                        <input type="radio" id={choice+topic.id} name={topic.question+topic.id} />
                                        <span className="choice">{choice}</span>
                                    </label>
                                ))
                            }
                        </>: quizType === "Identification" &&
                        <>
                            {
                                <>
                                <p className="question">{topic.question}</p>
                                <input type="text" id={topic.id} className="answer-input"
                                    onChange={(e)=>dispatch(handleAnswer({main: topic, answer: e.target.value}))}
                                />
                                </>
                            }
                        </> 
                    }
                   </div>
                ))}
                </> 
            )) }
            </> 
            
            :

            <>
            { enumerationData.map((en, i) => (
                <div className="question-card" key={i}>
                    <p className="question">{en.question}({en.size})</p>
                    <div className="answer-inputs">
                        <input type="text" className="enumerate-answer-input"
                            onChange={(e)=>{
                                setValue(e.target.value)
                            }}
                            value={en.id==editingId? value: ""}
                            onClick={()=>{
                                setEditingId(en.id)
                                setValue('')
                            }}
                        />
                        <button className="add-btn"
                            onClick={()=>{
                                if(value!="") {
                                    dispatch(handleAddAnswer({id: en.id, answer: value}))
                                    setValue('')
                                }
                            }}

                            disabled={en.userAnswers.length>=en.size}
                        >Add</button>
                    </div>
                    
                    { en.userAnswers.length > 0 &&
                    <div className="enumerated">
                        {en.userAnswers.map((ans, a) => (
                            <p className="anwered" key={a}
                                onClick={()=>dispatch(handleDeleteAnswered({id: en.id, delete: ans}))}
                            >{ans}</p>
                        ))}
                    </div>
                    }
                </div>
            )) }
            </>
            }

            <button className="submit"
                onClick={()=>{
                    dispatch(handleBack("result"))
                }}
                >Submit
            </button>
        </div>
    </div>
  )
}

export default QuizForm