import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MainListType, setListsValue, updateListValue } from "./mainListSlice";

type Props = {
	isModalVisible: boolean;
	hideModal: () => void;
	dataForEdit?: MainListType;
};

const ListFormModal = ({
	isModalVisible,
	hideModal,
	dataForEdit,
}: Props): React.ReactElement => {
	const [form] = Form.useForm();
	const { Item } = Form;

	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.mainList.tasks);

	// When de modal open if dataForEdit has data set the form values.
	useEffect(() => {
		if (dataForEdit?.id) {
			form.setFieldsValue({
				...dataForEdit,
			});
		}
	}, [dataForEdit, form]);

	// on submit function
	const onSubmit = async () => {
		const data = await form.validateFields();

		if (dataForEdit?.id) {
			// update
			dispatch(updateListValue({ ...dataForEdit, ...data }));
			onCloseModal();
		} else {
			// create
			const newData = {
				...data,
				id: tasks.length + 1,
				isDone: false,
			};
			dispatch(setListsValue(newData));
			onCloseModal();
		}
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
			md: { span: 4 },
			lg: { span: 8 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 24 },
		},
	};

	// close modal function
	const onCloseModal = () => {
		form.resetFields();
		hideModal();
	};

	return (
		<Modal
			title={dataForEdit?.id ? "Edit data" : "Register data"}
			visible={isModalVisible}
			onOk={onSubmit}
			onCancel={onCloseModal}
		>
			<Form form={form} {...formItemLayout}>
				<Item label='Task name' name='name'>
					<Input />
				</Item>
				<Item label='Task description' name='description'>
					<Input />
				</Item>
			</Form>
		</Modal>
	);
};

export default ListFormModal;
