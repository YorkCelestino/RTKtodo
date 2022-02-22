import React, { useState } from "react";
import {
	Button,
	Checkbox,
	Col,
	Collapse,
	Row,
	Space,
	Tooltip,
	Typography,
} from "antd";
import { CloseOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Search from "antd/lib/input/Search";
import ListFormModal from "./ListFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	MainListType,
	updateListValue,
	deleteListValue,
} from "./mainListSlice";

const { Panel } = Collapse;
const { Text } = Typography;

const MainList = (): React.ReactElement => {
	// dispatch hook
	const dispath = useAppDispatch();

	// useState hook
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [valueSearch, setValueSearch] = useState<string>("");

	// useSelector hook
	const tasks = useAppSelector((state) => state.mainList.tasks);
	const [dataForEdit, setDataForEdit] = useState<MainListType>();

	// show modal function
	const showModal = (dataForEdit?: MainListType) => {
		setIsModalVisible(!isModalVisible);
		setDataForEdit(dataForEdit);
	};

	// on submit function
	const onSubmit = (id: number, isCheked: boolean) => {
		const newData = {
			...tasks.filter((task) => task.id === id)[0],
			isDone: isCheked,
		};
		dispath(updateListValue(newData));
	};

	// Actions buttton function
	const genExtra = (id: number) => {
		return (
			<Row>
				<Space>
					<Tooltip title='Delete'>
						<CloseOutlined
							onClick={(event) => {
								event.stopPropagation();
								dispath(deleteListValue(id));
							}}
						/>
					</Tooltip>
					<Tooltip title='Edit'>
						<EditOutlined
							onClick={(event) => {
								showModal(tasks.filter((task) => task.id === id)[0]);
								event.stopPropagation();
							}}
						/>
					</Tooltip>
					<Tooltip title='Completed'>
						<Checkbox
							onChange={(event) => {
								onSubmit(id, event.target.checked);
							}}
							onClick={(event) => {
								event.stopPropagation();
							}}
						/>
					</Tooltip>
				</Space>
			</Row>
		);
	};

	// Header function
	const header = () => {
		return (
			<Row gutter={[8, 0]}>
				<Col md={7}>
					<Title level={2}>To do List</Title>
				</Col>
				<Col md={10}></Col>
				<Col md={6}>
					<Search
						placeholder={"Search task"}
						onChange={(e) => setValueSearch(e.target.value)}
					/>
				</Col>
				<Col xs={2} xl={1}>
					<Tooltip title={"Agregar"}>
						<Button
							type={"primary"}
							shape={"circle"}
							size={"middle"}
							icon={<PlusOutlined />}
							onClick={() => showModal()}
						/>
					</Tooltip>
				</Col>
			</Row>
		);
	};

	// search data function
	const TaskSearched = () => {
		if (tasks.length === 0) return [];

		return tasks.filter(
			(task: MainListType) =>
				task.name && task.name.toUpperCase().includes(valueSearch.toUpperCase())
		);
	};

	return (
		<>
			{header()}
			<Collapse expandIconPosition={"right"}>
				{TaskSearched().map((task) => {
					return (
						<Panel
							header={<Text delete={task.isDone}>{task.name}</Text>}
							key={task.id}
							extra={genExtra(task.id)}
						>
							<Text delete={task.isDone}>
								{task.description} {task.isDone}
							</Text>
						</Panel>
					);
				})}
			</Collapse>
			<ListFormModal
				hideModal={showModal}
				isModalVisible={isModalVisible}
				dataForEdit={dataForEdit}
			/>
		</>
	);
};

export default MainList;
