import React, { useState } from 'react'
import InputGroup from './components/InputGroup'

// STYLES
import './index.css'
import { Wrapper } from './styles/Wrapper'

const App = () => {
  const [text, setText] = useState('text')
  const onInputChange = e => {
    setText(e.target.value)
  }
  return (
    <Wrapper>
      <InputGroup label='Default Input' placeholder='placeholder' id='default-input' />
      <InputGroup
        label='Default Input'
        placeholder='placeholder'
        id='error-input'
        type='error'
      />
      <InputGroup
        label='Disabled Input'
        placeholder='placeholder'
        id='disabled-input'
        disabled
      />
      <InputGroup
        label='Helper Text Input'
        placeholder='placeholder'
        id='helper-text-input'
        helperText='Some hlper text.'
      />
      <InputGroup
        label='Helper Text Error Input'
        placeholder='placeholder'
        id='helper-text-error-input'
        type='error'
        helperText='Some went wrong.'
      />
      <InputGroup
        label='Start Icon Input'
        placeholder='placeholder'
        id='start-icon-input'
        startIcon='phone'
      />
      <InputGroup
        label='End Icon Error Input'
        placeholder='placeholder'
        type="error"
        id='end-icon-error-input'
        endIcon='lock'
      />
      <InputGroup
        label='Text Input'
        placeholder='placeholder'
        id='text-input'
        value={text}
        onChange={onInputChange}
      />

      <InputGroup
        label='Small Input'
        placeholder='placeholder'
        id='small-input'
        size="sm"
      />

      <InputGroup
        label='Medium Input'
        placeholder='placeholder'
        id='medium-input'
        size="md"
      />

      <InputGroup
        label='FullWidth Input'
        placeholder='placeholder'
        id='full-width-input'
        fullWidth
      />
      <InputGroup
        label='Multiline Input'
        placeholder='placeholder'
        id='multiline-input'
        multiline
      />
      <InputGroup
        label='Multiline Error Input'
        placeholder='placeholder'
        id='multiline-error-input'
        type="error"
        multiline
      />
    </Wrapper>
  )
}

export default App
