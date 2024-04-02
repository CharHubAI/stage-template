import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // You can uncomment these if you want to follow the
  //    'always render twice in dev mode' convention,
  //     which is common enough to be worth leaving in
  //     commented-out code, but because of the nature
  //     of extensions it's disabled by default here.
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
