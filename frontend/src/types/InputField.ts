/**
 * Define expected shape for form input fields.
 * @packageDocumentation
 */
export interface InputField {
  name: string;
  onBlur: () => void;
  onChange: () => void;
  value: string;
}

export default InputField;
