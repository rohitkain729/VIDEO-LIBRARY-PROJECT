import { configureStore } from "@reduxjs/toolkit";
import SaveListSlicer from  "../slicer/SaveVideoSlicer";

export default configureStore({
    reducer:{
        store : SaveListSlicer
    }
})