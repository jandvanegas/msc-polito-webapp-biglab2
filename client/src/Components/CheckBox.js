import { Form } from 'react-bootstrap';

function CheckBox(props) {
	return (
		<Form>
			<Form.Check
                type="checkbox"
                id="default-checkbox"
                label="Favorite"
                value={props.value}
                defaultChecked={props.value}
                disabled={!props.editable}
                onChange={(event) => {
                    props.setValue(event.target.checked);
                }}
			/>
		</Form>
	);
}

export { CheckBox };
