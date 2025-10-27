import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Load the global project stylesheet after the app index styles so its rules take
// precedence in dev (Vite injects CSS at runtime). This keeps dev ordering
// consistent with the built/static output.
import '../styles.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <App/>
    
  </StrictMode>,
)
