import * as React from 'react'
import * as ReactDOM from 'react-dom'

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>React Mention</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
