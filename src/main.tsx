import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import { appTheme } from './config/themeConfig'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={appTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
