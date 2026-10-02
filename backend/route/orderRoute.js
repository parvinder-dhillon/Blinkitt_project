import {Router} from 'express'
import auth from '../middleware/auth.js'
import { CODController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/orderController.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery', auth, CODController)
orderRouter.post('/checkout',auth, paymentController)
orderRouter.post("/webhook", webhookStripe)
orderRouter.get("/order-list",auth,getOrderDetailsController)


export default orderRouter