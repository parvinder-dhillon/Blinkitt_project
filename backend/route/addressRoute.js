import {Router} from 'express'
import auth from '../middleware/auth.js'
import { addAddressController, deleteAddressController, getAddresController, updateAddressController } from '../controllers/AddressController.js'


const addressRouter = Router()

addressRouter.post('/create', auth, addAddressController)
addressRouter.get('/get',auth, getAddresController)
addressRouter.put('/update',auth, updateAddressController)
addressRouter.delete('/delete',auth,deleteAddressController)

export default addressRouter