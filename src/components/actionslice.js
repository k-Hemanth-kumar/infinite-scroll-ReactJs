import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";


const infiniteSlice=createSlice({
    name:"infiniteScrollContent",
    initialState:{
        data:[],
        noData:false,
    },
    reducers:{
        setNoData(state){
            state.noData=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getData.fulfilled,(state,action)=>{
            
            state.noData=!action.payload.data.docs.length?true:false;
            
            state.data=[...state.data,...action.payload.data.docs];
        })
    }
})

export const getData=createAsyncThunk(
    'infiniteScrollContent/getData',
    async function (payload) {
        const {apiQuery,pageNumber}=payload;
        try {
            const response=await fetch(`https://openlibrary.org/search.json?q=${apiQuery}&page=${pageNumber}`);
            if(!response.ok){
                throw new Error(`Error: HTTP status ${response.status}`);

            }
            const data=await response.json();
            payload.data=data;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
        return payload;
    }
)
export default infiniteSlice.reducer;