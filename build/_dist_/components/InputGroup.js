import React from "../../web_modules/react.js";
import Icon2 from "../../web_modules/@material-ui/core/Icon.js";
import {StyledInput as StyledInput2} from "../styles/StyledInput.js";
import {StyledInputGroup as StyledInputGroup2} from "../styles/StyledInputGroup.js";
import {StyledTextarea as StyledTextarea2} from "../styles/StyledTextarea.js";
import {InputWrapper as InputWrapper2} from "../styles/InputWrapper.js";
const NormalInput = (props) => /* @__PURE__ */ React.createElement(StyledInput2, {
  ...props,
  disabled: props.disabled ? true : false
});
const MultilineInput = (props) => /* @__PURE__ */ React.createElement(StyledTextarea2, {
  rows: props.rows ? props.rows : 4,
  cols: props.cols ? props.cols : 30
});
const InputGroup = (props) => {
  return /* @__PURE__ */ React.createElement(StyledInputGroup2, {
    ...props,
    type: props.disabled ? "disabled" : props.type ? props.type : null,
    fullWidth: props.fullWidth ? "fullWidth" : null
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: props.id
  }, props.label), /* @__PURE__ */ React.createElement(InputWrapper2, null, props.startIcon ? /* @__PURE__ */ React.createElement(Icon2, {
    style: {marginRight: "0.5rem"},
    fontSize: "medium"
  }, props.startIcon) : null, props.multiline ? /* @__PURE__ */ React.createElement(MultilineInput, {
    ...props
  }) : /* @__PURE__ */ React.createElement(NormalInput, {
    ...props
  }), props.endIcon ? /* @__PURE__ */ React.createElement(Icon2, {
    style: {marginLeft: "0.5rem"},
    fontSize: "medium"
  }, props.endIcon) : null), props.helperText ? /* @__PURE__ */ React.createElement("span", {
    className: "helperText"
  }, props.helperText) : null);
};
export default InputGroup;
