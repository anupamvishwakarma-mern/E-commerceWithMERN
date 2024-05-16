const UserSchema = require('../Model/useModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AddSchema = require('../Model/useModel');


const create = (req, res, next) => {

  if (UserSchema.findOne({ email: req.body.email }).length > 0) {
    return res.json({ message: 'User already exist!' })
  } else {

    bcrypt.hash(req.body.password, 10, (err, hashPass) => {
      if (err) {
        return res.json({ error: err })
      } else {
        const user = new UserSchema({
          name: req.body.name,
          email: req.body.email,
          password: hashPass
        })

        const token = jwt.sign({ username: user.name }, 'secret_access_token', { expiresIn: '7d' })

        user.save().then((response) => {
          UserSchema.findOne({ email: req.body.email }).then((result) => {
            return res.json({ result, token, message: 'Registration Success', });
          })
        }).catch(err => {
          console.log(err);
        })
      }
    })
  }
}


const loginUser = (req, res, next) => {
  UserSchema.findOne({ email: req.body.email }).then(result => {
    if (result) {
      bcrypt.compare(req.body.password, result.password, (error, user) => {
        if (error) res.json({ message: 'Error in password verification' })
        if (user) {
          let token = jwt.sign({ username: result.name }, 'secret_access_token', { expiresIn: '7d' })
          return res.json({
            message: 'Login Success',
            token,
            result
          })
        } else {
          return res.json({ message: 'Password does not match' })
        }
      })
    } else {
      res.json({ message: 'Admin is not exist' })
    }
  })
}






const addNewAddress = async (req, res) => {
  try {
    if (req.body.default === true) {
      await AddSchema.updateMany({ u_id: req.body.u_id, default: true }, { $set: { default: false } });
    }

    const address = new AddSchema({
      u_id: req.body.u_id,
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address,
      landmark: req.body.landmark,
      city: req.body.city,
      state: req.body.state,
      pin: req.body.pin,
      save_as: req.body.save_as,
      default: req.body.default
    });

    const result = await address.save();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const getAddress = (req, res) => {
  const u_id = req.params.u_id;

  AddSchema.find({ u_id }).sort({ createdAt: -1 }).then(result => {
    if (!result) {
      return res.json({ message: 'No address found' })
    }
    return res.json(result);
  }).catch(error => {
    return res.json({ error: error })
  })
}


const removeAdd = async (req, res) => {
  const id = req.params.id;
  const u_id = req.params.u_id;

  try {
    const result = await AddSchema.findByIdAndDelete(id);
    if (result) {
      if (result.default === true) {
        const nextAddress = await AddSchema.findOneAndUpdate(
          { u_id: u_id, _id: { $ne: id } },
          { default: true },
          { new: true }
        );
      }

      const data = await AddSchema.find({ u_id }).sort({ createdAt: -1 });
      return res.json(data);
    } else {
      return res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const updateAddress = (req, res) => {
  const ad_id = req.params.ad_id;

  const updateData = {
    u_id: req.body.u_id,
    name: req.body.name,
    mobile: req.body.mobile,
    address: req.body.address,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    pin: req.body.pin,
    save_as: req.body.save_as,
    default: req.body.default
  };

  if (req.body.default) {
    AddSchema.updateMany({}, { $set: { default: false } })
      .then(() => {
        AddSchema.findOneAndUpdate({ _id: ad_id }, updateData, { new: true, useFindAndModify: false })
          .then(updatedAddress => {
            if (!updatedAddress) {
              return res.status(404).json({ message: 'Address not found' });
            }
            AddSchema.find({u_id}).sort({ createdAt: -1 }).then(allAddresses => {
              if (!allAddresses) {
                return res.json({ message: 'No Address Available' });
              }
              return res.json(allAddresses);
            }).catch(error => {
              return res.status(500).json({ message: 'Internal server error' });
            });
          })
          .catch(error => {
            return res.status(500).json({ message: 'Internal server error' });
          });
      })
      .catch(error => {
        return res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    AddSchema.findOneAndUpdate({ _id: ad_id }, updateData, { new: true, useFindAndModify: false })
      .then(updatedAddress => {
        if (!updatedAddress) {
          return res.status(404).json({ message: 'Address not found' });
        }
        AddSchema.find({u_id}).sort({ createdAt: -1 }).then(allAddresses => {
          if (!allAddresses) {
            return res.json({ message: 'No Address Available' });
          }
          return res.json(allAddresses);
        }).catch(error => {
          return res.status(500).json({ message: 'Internal server error' });
        });
      })
      .catch(error => {
        return res.status(500).json({ message: 'Internal server error' });
      });
  }
}




module.exports = { create, loginUser, addNewAddress, getAddress, removeAdd, updateAddress };