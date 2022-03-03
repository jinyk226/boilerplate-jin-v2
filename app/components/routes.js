import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Filler from './filler.js'

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


export default app