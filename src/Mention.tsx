import * as React from 'react'
import * as PropTypes from 'prop-types'

import { TriggerProps } from './Trigger'

export type CaretPosition = {
  top: number
  left: number
}

type MirrorProps = {
  value: string,
  selectionStart?: number,
  selectionEnd?: number,
  onUpdateCaret: (caretValue: string, pos: CaretPosition) => void
  onClearCaret: () => void
}

class Mirror extends React.PureComponent<MirrorProps, {}> {

  static propTypes = {
    value: PropTypes.string.isRequired,
    seletionStart: PropTypes.number,
    seletionEnd: PropTypes.number,
    onUpdateCaret: PropTypes.func.isRequired,
    onClearCaret: PropTypes.func.isRequired,
  }

  root: HTMLDivElement
  caret: HTMLSpanElement

  componentDidUpdate() {
    const caret = this.caret
    if (caret) {
      const caretValue = this.props.value[this.props.selectionStart! - 1]
      this.props.onUpdateCaret(caretValue, {
        top: caret.offsetTop,
        left: caret.offsetLeft
      })
    } else {
      this.props.onClearCaret()
    }
  }

  setRoot = (root: HTMLDivElement) => {
    this.root = root
  }

  setCaret = (caret: HTMLSpanElement) => {
    this.caret = caret
  }

  getStyle(): React.CSSProperties {
    return {
      display: 'block',
      position: 'relative',
      top: '0px',
      boxSizing: 'border-box',
      backgroundColor: 'transparent',
      width: 'inherit',
      height: '100%',
      bottom: '0px',
      resize: 'none',
      margin: '0px',
      outline: '0px',
      border: '0px',
      color: 'transparent',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    }
  }

  renderCaret() {
    return (
      <span ref={ this.setCaret } key='caret' style={ { visibility: 'hidden' } } />
    )
  }

  renderString(str: string, key: number) {
    return (
      <span key={ key } >{ str }</span>
    )
  }

  render() {
    const { value, selectionStart, selectionEnd } = this.props
    const components = []
    if (selectionStart !== undefined && selectionStart === selectionEnd) {
      if (selectionStart !== 0) {
        components.push(this.renderString(value.slice(0, selectionStart), 0))
      }
      components.push(this.renderCaret())
      if (selectionStart !== value.length) {
        components.push(this.renderString(value.slice(selectionStart), 2))
      }
    }
    return (
      <div
        ref={ this.setRoot }
        style={ this.getStyle() }
      >
        { components }
      </div>
    )
  }

}

type MentionProps = {
}

type MentionState = {
  value: string
  selectionStart?: number
  selectionEnd?: number
}

export class Mention extends React.PureComponent<MentionProps, MentionState> {

  static propTypes = {
  }

  textarea: HTMLTextAreaElement

  constructor(props: MentionProps) {
    super(props)
    this.state = {
      value: ''
    }
  }

  setTextarea = (textarea: HTMLTextAreaElement) => {
    this.textarea = textarea
  }

  onUpdateCaret = (caretValue: string | null, pos: CaretPosition) => {
    pos.left = pos.left - this.textarea.scrollLeft
    pos.top = pos.top - this.textarea.scrollTop

    React.Children.forEach(this.props.children, (child: React.ReactElement<TriggerProps>) => {
      if (!child) {
        return
      }
      if (child.props.value === caretValue) {
        child.props.action(pos)
      } else {
        child.props.action(undefined)
      }
    })
  }

  onClearCaret = () => {
    React.Children.forEach(this.props.children, (child: React.ReactElement<TriggerProps>) => {
      if (!child) {
        return
      }
      child.props.action(undefined)
    })
  }

  onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const value = textarea.value
    const selectionStart = textarea.selectionStart
    const selectionEnd = textarea.selectionEnd

    this.setState({
      value,
      selectionStart,
      selectionEnd
    })
  }

  onSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const selectionStart = textarea.selectionStart
    const selectionEnd = textarea.selectionEnd
    this.setState({
      selectionStart,
      selectionEnd
    })
  }

  onBlur = () => {
    this.setState({
      selectionStart: undefined,
      selectionEnd: undefined
    })
  }

  getTextareaStyle(): React.CSSProperties {
    return {
      display: 'block',
      position: 'absolute',
      top: '0px',
      boxsizing: 'border-box',
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
      bottom: '0px',
      resize: 'none',
      outline: '0px',
      border: '0px',
      padding: '0px',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
    }
  }

  getStyle(): React.CSSProperties {
    return {
      boxSizing: 'border-box',
      display: 'block',
      position: 'relative',
      height: '100%',
      width: '100%'
    }
  }

  render() {
    return (
      <div className='react-mention' style={ this.getStyle() }>
        <Mirror
          value={ this.state.value }
          selectionStart={ this.state.selectionStart }
          selectionEnd={ this.state.selectionEnd }
          onUpdateCaret={ this.onUpdateCaret }
          onClearCaret={ this.onClearCaret }
        />
        <textarea
          ref= { this.setTextarea }
          style={ this.getTextareaStyle() }
          value={ this.state.value }
          onChange={ this.onChange }
          onSelect={ this.onSelect }
          onBlur={ this.onBlur }
        />
      </div>
    )
  }

}
