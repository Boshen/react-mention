import * as React from 'react'
import * as ReactDOM from 'react-dom'
const { AppContainer } = require('react-hot-loader')

import { App } from './App'

const render = (Component: typeof App) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
