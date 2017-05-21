import * as React from 'react'
import * as PropTypes from 'prop-types'

import { CaretPosition } from './Mention'

export type TriggerProps = {
  value: string
  action: (pos?: CaretPosition) => void
}

export class Trigger extends React.PureComponent<TriggerProps, {}> {

  static propTypes = {
    value: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }

  render() {
    return (
      <div></div>
    )
  }

}
