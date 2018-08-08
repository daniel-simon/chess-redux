import { combineReducers } from "redux"
import layout from "./LayoutReducer"
import home from "./HomeReducer"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

const RootReducer = combineReducers({
  layout,
  home,
  router: routerReducer,
  form: formReducer
})

export default RootReducer
