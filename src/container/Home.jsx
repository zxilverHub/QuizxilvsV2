import "./home.css"

import { useSelector, useDispatch } from "react-redux"
import { handleCourse } from "../features/AppSlice"

function Home() {
    const courses = Object.keys(useSelector(state => state.data))
    const dispatch = useDispatch()

    const justifyContent = {
        justifyContent: courses.length%3==0? "space-between" : "start",
        gap: courses.length%3==0? "1rem" : "1.875rem"
    }

  return (
    <div className="home" style={justifyContent}>
        {courses.map((course, i) => (
            <div className="course" key={i}>
                <p className="course-name">{course.replaceAll("_", " ")}</p>
                <button className="review" 
                    onClick={()=>
                        dispatch(handleCourse({course: course, page: "review"}))
                    }> 
                    Review
                </button>

                <button className="start"
                    onClick={()=>dispatch(handleCourse({course: course, page: "quiz"}))}
                    >Start
                </button>
            </div>
        ))}
    </div>
  )
}

export default Home