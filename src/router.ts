import { Router } from 'express'
import { body } from 'express-validator'
import { CreateProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { handleInputErrors } from './modules/middleware'


const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product',  body('name').isString(), handleInputErrors, CreateProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Update
 */

 router.get('/update', getUpdates)
 router.get('/update/:id', getOneUpdate)
 router.put('/update/:id', 
    body('title').optional(), 
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(), 
    updateUpdate
 )
 router.post('/update',
    body('title').isString(), 
    body('body').isString(), 
    body('productId').exists().isString(),
    createUpdate
 )
 router.delete('/update/:id', deleteUpdate)

 /**
 * Update Point
 */

  router.get('/updatepoint', () => {})
  router.get('/updatepoint/:id', () => {})
  router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => {}
  )
  router.post('/updatepoint', 
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => {}
  )
  router.delete('/updatepoint/:id', () => {})

//
// router.use((err,req,res,next) => {
//     res.json({message: "error in router module : " + err.message})
// })

export default router