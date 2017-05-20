import * as React from 'react'

import { Mention } from '../src'

export class App extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <h1>React Mention</h1>
        <Mention />
      </div>
    )
  }

}
