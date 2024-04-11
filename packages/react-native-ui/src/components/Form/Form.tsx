import FormRadioButtons from './components/FormRadioButtons';
import FormSelect from './components/FormSelect';
import FormSwitch from './components/FormSwitch';
import FormTextInput from './components/FormTextInput';
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
