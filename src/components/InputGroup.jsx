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

  const { label, id, type, helperText, startIcon, endIcon, disabled, fullWidth, multiline, ...others } = props;

  return (
    <StyledInputGroup
      type={disabled ? 'disabled' : type ? type : null}
      fullWidth={fullWidth ? 'fullWidth' : null}
    >
      <label htmlFor={id}>{label}</label>

      <InputWrapper>
        {
          startIcon ?
            <Icon style={{ marginRight: '0.5rem' }} fontSize="default">{startIcon}</Icon> :
            null
        }
        {multiline ? <MultilineInput {...others} /> : <NormalInput {...others} />}
        {
          endIcon ?
            <Icon style={{ marginLeft: '0.5rem' }} fontSize="default">{endIcon}</Icon> :
            null
        }
      </InputWrapper>

      {helperText ? <span className="helperText">{helperText}</span> : null}
    </StyledInputGroup>
  )
}

export default InputGroup
