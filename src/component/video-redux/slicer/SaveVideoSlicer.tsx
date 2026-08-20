import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface Video {
      VideoId: number,
      Description: string,
      Url: string,
      Title: string,
      CategoryId: number,
}

interface LibraryState{
    MyVideoLibrary:Video[];
    VideoCount:number;
}


const initialState:LibraryState ={
    MyVideoLibrary : [],
    VideoCount :0
}

const SaveListSlicer = createSlice({
  name : "MyLibrary",
  initialState,
  reducers :{
    addToLibrary(state,action : PayloadAction<Video>){
        state.MyVideoLibrary.push(action.payload);
        state.VideoCount=state.MyVideoLibrary.length;
    }
  }
});

export const {addToLibrary}=SaveListSlicer.actions;
export default SaveListSlicer.reducer;

