import * as React from 'react'

import { Mention, Trigger, CaretPosition } from '../src'

type AppState = {
  atPopupPos?: CaretPosition
  hashPopupPos?: CaretPosition
  slashPopupPos?: CaretPosition
}

export class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props)
    this.state = {}
  }

  triggerAt = (pos?: CaretPosition) => {
    this.setState({
      atPopupPos: pos
    })
  }

  triggerHash = (pos?: CaretPosition) => {
    this.setState({
      hashPopupPos: pos
    })
  }

  triggerSlash = (pos?: CaretPosition) => {
    this.setState({
      slashPopupPos: pos
    })
  }

  renderAtPopup() {
    return this.state.atPopupPos && this.renderPopup(this.state.atPopupPos)
  }

  renderHashPopup() {
    return this.state.hashPopupPos && this.renderPopup(this.state.hashPopupPos)
  }

  renderSlashPopup() {
    return this.state.slashPopupPos && this.renderPopup(this.state.slashPopupPos)
  }

  renderPopup(pos: CaretPosition) {
    const { top, left } = pos
    const style: React.CSSProperties = {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      width: '200px',
      height: '400px',
      border: '1px solid red'
    }
    return (
      <div style={ style } />
    )
  }

  render() {
    return (
      <div>
        <h1>React Mention</h1>
        <section style={ {position: 'relative', height: '300px', width: '600px'} }>
          <Mention>
            <Trigger
              value='@'
              action={ this.triggerAt }
            />
            <Trigger
              value='#'
              action={ this.triggerHash }
            />
            <Trigger
              value='/'
              action={ this.triggerSlash }
            />
          </Mention>
          { this.renderAtPopup() }
          { this.renderHashPopup() }
          { this.renderSlashPopup() }
        </section>
      </div>
    )
  }

}
