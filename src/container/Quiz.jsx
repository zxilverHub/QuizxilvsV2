import "./quiz.css"

import { useSelector, useDispatch } from "react-redux"
import { handleBack, handleChapter, handleType } from "../features/AppSlice"
import { useState } from "react"

function Quiz() {
    const dispatch = useDispatch()
    const inCourse = useSelector(state => state.about.course)
    const chapters = useSelector(state => state.data[inCourse])
    const chapterKeys = Object.keys(chapters)

    function getTopics(chapter) {
        return Object.keys(chapters[chapter])
    }

    const types = ["Multiple choice", "Identification", "Enumeration"]
    const [type, setType] = useState(types[0])


    const [isExpand, setIsExpand] = useState(false)
    const expand = { display: isExpand? "flex" : "none" }

  return (
    <div className="quiz">
        <div className="quiz-options">
            <button className="back" 
                onClick={()=>dispatch(handleBack("home"))}>
                Back
            </button>
            
            <div className="quiz-type" onClick={()=>setIsExpand(!isExpand)}>
                <p className="current-type">{type}</p>

                <div className="type-list" style={expand}>
                    { types.map((typ, i) => (
                        <p key={i} className="type-name" 
                            onClick={()=>{
                                setType(typ);
                                dispatch(handleType(typ))
                            }}>
                            {typ}
                        </p>
                    ))}
                </div>
            </div>
        </div>

        <div className="quiz-chapter">
            {chapterKeys.map((keys, i) => (
                <div className="chapter" key={i} onClick={()=>dispatch(handleChapter({chapter: keys, page: "quiz-form"}))}>
                    <p className="chapter-number">{keys.replaceAll("_", " ")}</p>
                    <ul>
                    {
                        getTopics(keys).map((topic, j) => (
                            <li key={j} className="topic">{topic.replaceAll("_", " ")}</li>
                        ))
                    }
                    </ul>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Quiz