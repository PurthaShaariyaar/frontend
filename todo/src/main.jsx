import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TodoV1 from './TodoV1.jsx'
import TodoV2 from './TodoV2.jsx'
import TodoV3 from './TodoV3.jsx'
import TodoV4 from './TodoV4.jsx';
import TodoV5 from './TodoV5.jsx';
import TodoV6 from './TodoV6.jsx'
import TodoV7 from './TodoV7.jsx'
import TodoV8 from './TodoV8.jsx'
import TodoV9 from './TodoV9.jsx'
import TodoV10 from './TodoV10.jsx'
import TodoV11 from './TodoV11.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TodoV11 />
  </StrictMode>,
)
