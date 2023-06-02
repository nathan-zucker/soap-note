import { configureStore } from "@reduxjs/toolkit";
import soapSlice from "../features/soapSlice";
import patientsSlice from "../features/patientsSlice";

export default configureStore({
    reducer: {
        soap: soapSlice,
        patients: patientsSlice,
    },
})
