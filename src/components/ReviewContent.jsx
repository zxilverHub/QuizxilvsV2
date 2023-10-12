import "./reviewContent.css"

import { useSelector, useDispatch } from "react-redux"
import { handleBack, handleStart } from "../features/AppSlice"

function ReviewContent() {
    const dispatch = useDispatch()
    const about = useSelector(state => state.about)

    // get one chapter
    const data = useSelector(state => state.data[about.course][about.chapter])
    const topicKeys = Object.keys(data)

    function getTopics(topic) {
        return data[topic]
    }

  return (
    <div className='review-content'>
        <button className="back" 
            onClick={()=>dispatch(handleBack("review"))}>
            Back
        </button>

        <div className="review-topics">
            { topicKeys.map((topic, i) => (
                <div className="keyword-container" key={i}>
                    <p className="title">{topic.replaceAll("_", " ")}</p>
                    {getTopics(topic).questions.map((question, j) => (
                            <h2 className="keyword" key={j}>{question.answer[0]} <span className="meaning"> - {question.question}</span></h2>
                    ))}
                </div>
            )) }

            <button className="start-now" 
                onClick={()=>dispatch(handleStart("quiz"))}>
                Start now
            </button>
        </div>

        

    </div>
  )
}

export default ReviewContent
