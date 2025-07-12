import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Proper bootstrap CSS import

import Form from './Component/EmailForm.jsx';

function App() {

  return (
    <>
      <Form />
    </>
  )
}

export default App
