const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorController = require('./controllers/error')
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

 
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('5f01e16dd987a34e501ef209')
    .then(user => {
      req.user = user;
      next()
    })
    .catch(err => console.log(err))
})

  app.use('/admin', adminRoutes)
 app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect(
    'mongodb+srv://lalitnayyar:3WHw4TgC@cluster0.1hh10.mongodb.net/shop?retryWrites=true&w=majority'
    //3 WALMART HULU walmart 4 TOKYO golf COFFEE 
  )
  .then((result) => {
    // const user = new User({
    //   name: 'Max',
    //   email:'max@test.com',
    //   cart: {
    //     items: []
    //   }
    // });
    // user.save();
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

