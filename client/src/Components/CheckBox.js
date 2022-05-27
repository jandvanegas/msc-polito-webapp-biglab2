import { Form } from 'react-bootstrap';

function CheckBox(props) {
	return (
		<Form>
			<Form.Check
				type="checkbox"
				id="default-checkbox"
				checked={props.favorite}
				readOnly
			/>
		</Form>
	);
}

export { CheckBox };
