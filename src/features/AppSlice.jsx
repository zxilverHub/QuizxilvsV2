import { createSlice } from "@reduxjs/toolkit"
import data from "../data.json"

function userAnswer(payload) {
    let correct = false

    payload.main.answer.forEach(ans => {
        if(String(ans).toLocaleLowerCase().trim() == String(payload.answer).toLowerCase().trim()) {
            correct = true
        }
    })

    return {
        question: payload.main.question,
        correctAnswer: payload.main.answer,
        id: payload.main.id,
        userAnswered: payload.answer,
        isCorrect: correct
    }
}

function setEnumerate(topic) {
    return {
        question: topic.question,
        answers: topic.answers,
        id: topic.id,
        userAnswers: [],
        size: topic.answers.length
    }
}

export const appSlice = createSlice({
    name: "quiz",
    initialState: {
        data: data,

        about: {
            course: null,
            chapter: null
        },

        app: {
            currentPage: "home",
            quizType: "Multiple choice"
        },

        quiz: {
            toQuiz: null,
            userAnswers: []
        },

        enum: {
            originalState: null,
            userAnswers: []
        }
    },

    reducers: {
        handleCourse: (state, action) => {
            state.about.course = action.payload.course
            state.app.currentPage = action.payload.page
        },

        handleChapter: (state, action) => {
            state.about.chapter = action.payload.chapter
            state.app.currentPage = action.payload.page

            if(state.app.quizType == "Enumeration") {
                const datas = state.data[state.about.course][action.payload.chapter]
                const quizes = Object.keys(datas)
                let enumerate = []

                quizes.forEach(quiz => {
                    enumerate.push(setEnumerate(datas[quiz]["enumeration"]))
                })

                state.enum.originalState = enumerate
            }
        },

        handleBack: (state, action) => {
            state.app.currentPage = action.payload
        },

        handleStart: (state, action) => {
            state.app.currentPage = action.payload
        },

        handleType: (state, action) => {
            state.app.quizType = action.payload
        },

        handleAnswer: (state, action) => {
            let answers = state.quiz.userAnswers;

            if(!answers.some(answer => answer.id === action.payload.main.id)) {
                answers.push(userAnswer(action.payload))
            } else {
                answers.forEach(ans => {
                    if(ans.id == action.payload.main.id) {
                        ans.userAnswered = action.payload.answer
                        
                        let isCorrect = false
                        ans.correctAnswer.forEach(cans => {
                            if(String(cans).toLowerCase().trim() == String(action.payload.answer).toLowerCase().trim()) {
                                isCorrect = true
                            }
                        })

                        ans.isCorrect = isCorrect
                    }
                })
            }

            state.quiz.userAnswers = answers
        },

        resetAnswers: (state) => {
            state.quiz.userAnswers = []
        },

        handleAddAnswer: (state, action) => {
            let enumState = state.enum.originalState

            enumState.forEach(en => {
                if(en.id == action.payload.id) {
                    en.userAnswers.push(action.payload.answer.trim())
                }
            })

            state.enum.originalState = enumState
        },

        handleDeleteAnswered: (state, action) => {
            let prevState = state.enum.originalState

            prevState.forEach(prev => {
                if(prev.id == action.payload.id) {
                    let newAns = prev.userAnswers.filter(ans =>  {
                       return ans!=action.payload.delete})
                    prev.userAnswers = newAns
                }
            })

            state.enum.originalState = prevState
        }
    }
})

export const { handleCourse, handleChapter, handleBack, handleStart, handleType, handleAnswer, resetAnswers, handleAddAnswer, handleDeleteAnswered } = appSlice.actions
export default appSlice.reducer