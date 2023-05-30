import { configureStore } from "@reduxjs/toolkit";
import soapSlice from "../features/soapSlice";

export default configureStore({
    reducer: {
        soap: soapSlice,
    },
})
