import { configureStore } from "@reduxjs/toolkit";
import soapSlice from "../features/soapSlice";
import patientsSlice from "../features/patientsSlice";
import colorSlice from "../features/colorSlice";

export default configureStore({
    reducer: {
        soap: soapSlice,
        patients: patientsSlice,
        color: colorSlice,
    },
})
