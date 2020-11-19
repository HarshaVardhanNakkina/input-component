import React from 'react'
import Icon from '@material-ui/core/Icon'

// STYLES
import { StyledInput } from '../styles/StyledInput'
import { StyledInputGroup } from '../styles/StyledInputGroup'
import { StyledTextarea } from '../styles/StyledTextarea'
import { InputWrapper } from '../styles/InputWrapper'

const NormalInput = props => (
  <StyledInput {...props} disabled={props.disabled ? true : false} />)

const MultilineInput = props => (
  <StyledTextarea rows={props.rows ? props.rows : 4} cols={props.cols ? props.cols : 30}></StyledTextarea>
)

const InputGroup = props => {

  return (
    <StyledInputGroup
      {...props}
      type={props.disabled ? 'disabled' : props.type ? props.type : null}
      fullWidth={props.fullWidth ? 'fullWidth' : null}
    >
      <label htmlFor={props.id}>{props.label}</label>

      <InputWrapper>
        {
          props.startIcon ?
            <Icon style={{ marginRight: '0.5rem' }} fontSize="medium">{props.startIcon}</Icon> :
            null
        }
        {props.multiline ? <MultilineInput {...props} /> : <NormalInput {...props} />}
        {
          props.endIcon ?
            <Icon style={{ marginLeft: '0.5rem' }} fontSize="medium">{props.endIcon}</Icon> :
            null
        }
      </InputWrapper>

      {props.helperText ? <span className="helperText">{props.helperText}</span> : null}
    </StyledInputGroup>
  )
}

export default InputGroup
