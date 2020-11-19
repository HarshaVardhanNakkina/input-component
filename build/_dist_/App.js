import React, {useState} from "../web_modules/react.js";
import InputGroup2 from "./components/InputGroup.js";
import "./index.css.proxy.js";
import {Wrapper as Wrapper2} from "./styles/Wrapper.js";
const App = () => {
  const [text, setText] = useState("text");
  const onInputChange = (e) => {
    setText(e.target.value);
  };
  return /* @__PURE__ */ React.createElement(Wrapper2, null, /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Default Input",
    placeholder: "placeholder",
    id: "default-input"
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Default Input",
    placeholder: "placeholder",
    id: "error-input",
    type: "error"
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Disabled Input",
    placeholder: "placeholder",
    id: "disabled-input",
    disabled: true
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Helper Text Input",
    placeholder: "placeholder",
    id: "helper-text-input",
    helperText: "Some hlper text."
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Helper Text Error Input",
    placeholder: "placeholder",
    id: "helper-text-error-input",
    type: "error",
    helperText: "Some went wrong."
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Start Icon Input",
    placeholder: "placeholder",
    id: "start-icon-input",
    startIcon: "phone"
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "End Icon Error Input",
    placeholder: "placeholder",
    type: "error",
    id: "end-icon-error-input",
    endIcon: "lock"
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Text Input",
    placeholder: "placeholder",
    id: "text-input",
    value: text,
    onChange: onInputChange
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Small Input",
    placeholder: "placeholder",
    id: "small-input",
    size: "sm"
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Medium Input",
    placeholder: "placeholder",
    id: "medium-input",
    size: "md"
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "FullWidth Input",
    placeholder: "placeholder",
    id: "full-width-input",
    fullWidth: true
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Multiline Input",
    placeholder: "placeholder",
    id: "multiline-input",
    multiline: true
  }), /* @__PURE__ */ React.createElement(InputGroup2, {
    label: "Multiline Error Input",
    placeholder: "placeholder",
    id: "multiline-error-input",
    type: "error",
    multiline: true
  }));
};
export default App;
