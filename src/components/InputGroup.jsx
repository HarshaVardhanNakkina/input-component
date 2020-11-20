import React from 'react'
import Icon from '@material-ui/core/Icon'

// STYLES
import { StyledInput } from '../styles/StyledInput'
import { StyledInputGroup } from '../styles/StyledInputGroup'
import { StyledTextarea } from '../styles/StyledTextarea'
import { InputWrapper } from '../styles/InputWrapper'

const NormalInput = props => (
  <StyledInput {...props} />)

const MultilineInput = ({ rows = 4, cols = 30, ...others }) => (
  <StyledTextarea rows={rows} cols={cols} {...others}></StyledTextarea>

)

const getDefaultValue = defaultValue => defaultValue ? defaultValue : ''

const InputGroup = props => {

  const { label, id, type, size = null, helperText, startIcon, endIcon, fullWidth, multiline, value: defaultValue = '', ...others } = props;

  return (
    <StyledInputGroup
      type={props.disabled ? 'disabled' : type ? type : null}
      fullWidth={fullWidth ? 'fullWidth' : null}
      size={size}
    >
      <label htmlFor={id}>{label}</label>

      <InputWrapper>
        {
          startIcon ?
            <Icon style={{ marginRight: '0.5rem' }}>{startIcon}</Icon> :
            null
        }

        {
          multiline ?
            <MultilineInput {...others} defaultValue={defaultValue} /> :
            <NormalInput defaultValue={defaultValue}  {...others} />
        }

        {
          endIcon ?
            <Icon style={{ marginLeft: '0.5rem' }}>{endIcon}</Icon> :
            null
        }
      </InputWrapper>

      {helperText ? <span className="helperText">{helperText}</span> : null}
    </StyledInputGroup>
  )
}

export default InputGroup
