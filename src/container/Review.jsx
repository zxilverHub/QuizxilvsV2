import "./review.css"

import { useSelector, useDispatch } from "react-redux"
import { handleChapter, handleBack} from "../features/AppSlice"

function Review() {
    const dispatch = useDispatch()
    const inCourse = useSelector(state => state.about.course)
    const chapters = useSelector(state => state.data[inCourse])
    const chaptersKeys = Object.keys(chapters)


    function getTopics(chapter) {
        return Object.keys(chapters[chapter])
    }

  return (
    <div className="review-container" >
        <button className="back" 
            onClick={()=>dispatch(handleBack("home"))}>
            Back
        </button>

        <div className="review-contents">
            {chaptersKeys.map((chapter, i) => (
                <div className="chapter" key={i} onClick={()=>dispatch(handleChapter({chapter: chapter, page: "reviewContent"}))}>
                    <p className="chapter-number">{chapter.replaceAll("_", " ")}</p>
                    <ul>
                    {
                        getTopics(chapter).map((topic, j) => (
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

export default Review