import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
// Antd style reset is included in the components, but we can also import it if needed. 
// With v5, it uses CSS-in-JS, so no css import needed usually, but reset is good.

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
