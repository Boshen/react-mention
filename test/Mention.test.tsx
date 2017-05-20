import * as React from 'react'
const renderer = require('react-test-renderer')

import { Mention } from '../src/Mention'

describe('Mention Snapshot', () => {

  it('renders correctly', () => {
    const component = (
      <Mention />
    )
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
