// server.js -- main application server file

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var Customer    = require('./models/customer.js');
var User        = require('./models/user.js');
var mongoose    = require('mongoose');
var logger      = require('morgan');

mongoose.connect('mongodb://192.168.150.94:10040/nunumetrics');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var port = process.env.PORT || 8080; // port to run on
var router = express.Router(); // get a new router instance

//router.use(function(req, res, next){
  //console.log('Request incoming..');
  //next();
//})

router.get('/', function(req,res){
  res.json({ message: 'Welcome to /api!' });
})

router.route('/customer').post(function(req,res){
  var customer = new Customer();
  customer.name = req.body.name;
  customer.channel = req.body.channel;
  customer.reseller = req.body.reseller;
  customer.startdate = req.body.startdate;
  customer.enddate = req.body.enddate;
  customer.term = req.body.term;
  customer.autorenew = req.body.autorenew;
  customer.checkscommitted = req.body.checkscommitted;
  customer.browserchecks = req.body.browserchecks;
  customer.urlchecks = req.body.urlchecks;
  customer.contractvalue = req.body.contractvalue;
  customer.monthlyrevenue = req.body.monthlyrevenue;
  customer.daysremaining = req.body.daysremaining;
  customer.comments = req.body.comments;
  customer.sflink = req.body.sflink;
  customer.save(function(err){
    if(err) res.send('Error');
    res.json({ message: 'Customer Created!'});
  })
})
router.route('/user').post(function(req,res){
  var user = new User();
  user.name = req.body.name;
  user.password = new Buffer(req.body.password).toString('base64');
  //user.password = req.body.password;
  user.save(function(err){
    if(err) res.send('Error');
    res.json({ message: 'User Created!'});
  })
})
router.route('/user/authenticate').post(function(req,res){
  User.find( {name: req.body.name, password:req.body.password}, function(err, user){
    if(err) res.send(err);
    if(user.length>0) {
      //success, user found
      res.json({success:'login successful'});
    }else {
      //fail, no user empty set
      res.json({message: 'Login failed, try again!'})
    }
  })
})
router.route('/customer').get(function(req,res){
  Customer.find(function(err, customers){
    if(err) res.send(err)
    res.json(customers);
  })
})
router.route('/user').get(function(req,res){
  User.find(function(err, users){
    if(err) res.send(err)
    res.json(users);
  })
})
router.route('/customer/:id').get(function(req,res){
  Customer.findById(req.params.id, function(err, customer){
    if(err) res.send(err)
    res.json(customer);
  })
})
router.route('/user/:id').get(function(req,res){
  User.findById(req.params.id, function(err, user){
    if(err) res.send(err)
    res.json(user);
  })
})
router.route('/customer/:id').put(function(req,res){
  Customer.findById(req.params.id, function(err, customer){
    if(err) res.send(err)
      customer.name = req.body.name;
      customer.channel = req.body.channel;
      customer.reseller = req.body.reseller;
      customer.startdate = req.body.startdate;
      customer.enddate = req.body.enddate;
      customer.term = req.body.term;
      customer.autorenew = req.body.autorenew;
      customer.checkscommitted = req.body.checkscommitted;
      customer.browserchecks = req.body.browserchecks;
      customer.urlchecks = req.body.urlchecks;
      customer.contractvalue = req.body.contractvalue;
      customer.monthlyrevenue = req.body.monthlyrevenue;
      customer.daysremaining = req.body.daysremaining;
      customer.comments = req.body.comments;
      customer.sflink = req.body.sflink;
    customer.save(function(err){
      if(err) res.send(err)
      res.json({ message: 'Customer updated!' });
    })
  })
})
router.route('/user/:id').put(function(req,res){
  User.findById(req.params.id, function(err, user){
    if(err) res.send(err)
      user.name = req.body.name;
      user.password = req.body.password;
    user.save(function(err){
      if(err) res.send(err)
      res.json({ message: 'User updated!' });
    })
  })
})
router.route('/customer/:id').delete(function(req,res){
  Customer.remove({_id: req.params.id},function(err, customer){
    if(err) res.send(err)
    res.json({ message: 'Customer deleted!' });
  })
})
router.route('/user/:id').delete(function(req,res){
  User.remove({_id: req.params.id},function(err, user){
    if(err) res.send(err)
    res.json({ message: 'User deleted!' });
  })
})
app.use('/api',router); //prefix the router requests with /api for the api requests
app.listen(port);
console.log('Listening on port: '+port);
