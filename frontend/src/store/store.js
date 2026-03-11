import { configureStore } from "redux/configureStore";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
