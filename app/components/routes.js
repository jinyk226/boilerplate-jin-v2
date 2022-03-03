import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

const app = () => {
    return (
    <div>
        <Router>
            <Routes>
            <Route path='/' element={<Filler />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    </div>
  )
}

const Filler = () => {
    return (
        <div>
            This is a filler div
        </div>
    )
}


export default app