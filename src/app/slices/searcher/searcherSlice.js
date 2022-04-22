import { createSlice } from "@reduxjs/toolkit";

export const searcherSlice = createSlice({
    name: "searchTerm",
    initialState: {
        searchTerm: "",
        loading:false,
        error:null,
    },
    reducers: {
        addSearchTerm: (state, action) => {
            const searchTerm = action.payload.searchTerm;
            console.log(searchTerm)
            state.searchTerm = searchTerm;
        },
        deleteSearchTerm: (state, action) => {
            state.searchTerm = "";
        },
    },
});

export const { addSearchTerm, deleteSearchTerm } = searcherSlice.actions;

export default searcherSlice.reducer;
