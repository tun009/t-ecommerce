import { categoriesRouter } from "./categories"
import { itemRouter } from "./item"
import { myPageRouter } from "./myPage"
import { orderRouter } from "./order"
import { searchRouter } from "./search"
import { exhibitionRouter } from "./exhibition"
import { mainRouter } from './main'
import { cartRouter } from './cart'

export const privateRouter = [
  ...orderRouter,
  ...myPageRouter,
  ...itemRouter,
  ...categoriesRouter,
  ...searchRouter,
  ...exhibitionRouter,
  ...mainRouter,
  ...cartRouter
]
