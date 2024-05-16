const CartSchema = require('../Model/cartModel')



const addToCart = async (req, res) => {
  const { u_id, p_id, nop } = req.body;

  try {
    let cart = await CartSchema.findOne({ u_id });

    if (!cart) {
      cart = new CartSchema({ u_id, product: [{ p_id, nop }] });
    } else {
      const existingProductIndex = cart.product.findIndex(item => item.p_id === p_id);

      if (existingProductIndex !== -1) {
        cart.product[existingProductIndex].nop += nop;
      } else {
        cart.product.push({ p_id, nop });
      }
    }

    await cart.save().then(result => {
      return res.json({ success: true, message: 'Product added to cart successfully', result });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const getCart = async (req, res) => {
  const u_id = req.params.u_id;

  try {
    const cart = await CartSchema.findOne({u_id});

    if (!cart) {
      return res.json('User not found')
    }
    else {
      return res.json({ success: true, message: 'Product added to cart successfully', cart })
    }
  } catch (error) {
    console.log(error)
  }
 }

const removeCart = async (req, res) => {
  const u_id = req.params.u_id;
  const p_id = req.params.p_id;

  try {
    let cart = await CartSchema.findOne({ u_id });

    if (!cart) {
      console.log('No user exist!')
    } else {
      const existingProductIndex = cart.product.findIndex(item => item.p_id === p_id);

      if (existingProductIndex !== -1) {
        cart.product.splice(existingProductIndex, 1);
        await cart.save().then(result => {
          return res.json({ success: true, message: 'Product added to cart successfully', result });
        });;
        
      } else {
        console.log('Product not found in cart:', p_id);
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addToCart,
  getCart,
  removeCart
};
