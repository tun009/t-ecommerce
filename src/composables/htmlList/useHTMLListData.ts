import uikit from './config/uikit.json'
import auth from './config/auth.json'
import order from './config/order.json'
import main from './config/main.json'
import myPage from './config/myPage.json'
import item from './config/item.json'
import category from './config/category.json'
import search from './config/search.json'
import exhibition from './config/exhibition.json'
import cart from './config/cart.json'
import coupon from './config/coupon.json'

export const useHTMLListData = () => {
  const items = [...uikit, ...auth, ...order, ...main, ...myPage, ...item, ...category, ...search, ...cart, ...coupon, ...exhibition].filter((item) => item.visible)
  items.forEach((item) => {
    item.contents = item.contents.filter((i) => i.visible !== false)
  })
  return {
    items
  }
}
