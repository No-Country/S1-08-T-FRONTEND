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
    },
});

export const { addSearchTerm } = searcherSlice.actions;

export default searcherSlice.reducer;
