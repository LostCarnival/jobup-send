import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import allReducers from './reducers'
import App from './App'
import { loadState, saveState } from './local-storage'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const persistedState = loadState()
const store = createStore(allReducers, persistedState)

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()