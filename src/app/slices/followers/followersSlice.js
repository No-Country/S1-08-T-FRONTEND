import { createSlice } from "@reduxjs/toolkit";
import { followersApi } from "../../services/followers";

const initialState = {
    usersFollowing: {
        data: null,
        loading: false,
        error: null,
    },
    usersFollowers: {
        data: null,
        loading: false,
        error: null,
    }
};

const followerSlice = createSlice({
    name: "followers",
    initialState,
    reducers: {
        setUsersFollowing: (state, action) => {
            state.usersFollowing.data = action.payload;
        },
        setUsersFollowers: (state, action) => {
            state.usersFollowers.data = action.payload;
        },
        setLoading: (state, action) => {
            state.usersFollowing.loading = action.payload;
            state.usersFollowers.loading = action.payload;
        },
        setError: (state, action) => {
            state.usersFollowing.error = action.payload;
            state.usersFollowers.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(followersApi.endpoints.getFollowingState.matchPending, (state, actions) => {
                state.usersFollowing.loading = true;
            })
            .addMatcher(followersApi.endpoints.getFollowingState.matchFulfilled, (state, action) => {
                const response = action.payload;
                state.usersFollowing.data = response;
                state.usersFollowing.loading = false;
            })
            .addMatcher(followersApi.endpoints.getFollowingState.matchRejected, (state, action) => {
                state.usersFollowing.error = action;
            });
        builder
            .addMatcher(followersApi.endpoints.getFollowersState.matchPending, (state, actions) => {
                state.usersFollowers.loading = true;
            })
            .addMatcher(followersApi.endpoints.getFollowersState.matchFulfilled, (state, action) => {
                const response = action.payload;
                state.usersFollowers.data = response;
                state.usersFollowers.loading = false;
            })
            .addMatcher(followersApi.endpoints.getFollowersState.matchRejected, (state, action) => {
                state.usersFollowers.error = action;
            });
    },

});

export const { setUsersFollowing, setUsersFollowers,setLoading } = followerSlice.actions;

export default followerSlice.reducer;

// export const getFollowingState = (userId) => async (dispatch) => {
//     console.log(userId)
//     try {
//         dispatch(getFollowingStateState({ loading: true }));
//         const response = await followersApi.endpoints.getFollowingState(userId);
//         dispatch(getFollowingStateState({ data: response.data }));
//     } catch (error) {
//         dispatch(getFollowingStateState({ error }));
//     }
// };

// export const getFollowersState = (userId) => async (dispatch) => {
//     try {
//         dispatch(getFollowersStateState({ loading: true }));
//         const response = await followersApi.endpoints.getFollowersState(userId);
//         dispatch(getFollowersStateState({ usersFollowers: response.data }));
//     } catch (error) {
//         dispatch(getFollowersStateState({ error }));
//     }
// };



