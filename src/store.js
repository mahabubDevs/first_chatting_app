import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import activeChatReducer from "./slices/activechat/activeChatSlice";

export default configureStore({
  reducer: {
    loggedUser: userReducer,
    activeChat: activeChatReducer,
  },
});