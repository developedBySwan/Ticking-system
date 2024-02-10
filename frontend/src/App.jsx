import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import { Error404, Layout, Login, Register } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}

export default App