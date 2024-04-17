import FormRadioButtons from './form-components/FormRadioButtons';
import FormSelect from './form-components/FormSelect';
import FormSwitch from './form-components/FormSwitch';
import FormTextInput from './form-components/FormTextInput';
import FormGroup from './FormGroup';

export function Form() {}

Form.Group = FormGroup;
Form.TextInput = FormTextInput;
Form.Switch = FormSwitch;
Form.Select = FormSelect;

/**
 * A form control that uses segmented control on iOS and radio buttons on other platforms, as a drop-in replacement for `Select`.
 *
 * Recommended for controls with 3 or less options.
 */
Form.RadioButtons = FormRadioButtons;

export default Form;
