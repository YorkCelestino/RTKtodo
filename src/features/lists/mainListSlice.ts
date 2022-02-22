import { createSlice } from "@reduxjs/toolkit";

export interface MainListType {
	id: number;
	name: string;
	description: string;
	isDone: boolean;
}
export interface ListState {
	tasks: MainListType[];
}

const initialState: ListState = {
	tasks: new Array<MainListType>(),
};

export const mainListSlice = createSlice({
	name: "mainList",
	initialState,
	reducers: {
		setListsValue: (state, action) => {
			state.tasks = [...state.tasks, action.payload];
		},
		updateListValue: (state, action) => {
			const index = state.tasks.findIndex(
				(task) => task.id === action.payload.id
			);
			state.tasks[index] = action.payload;
		},
		deleteListValue: (state, action) => {
			const index = state.tasks.findIndex(
				(task) => task.id === action.payload.id
			);
			state.tasks.splice(index, 1);
		},
	},
});

export const { setListsValue, updateListValue, deleteListValue } =
	mainListSlice.actions;

export default mainListSlice.reducer;
