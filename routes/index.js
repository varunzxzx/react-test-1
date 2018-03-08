const router = require('express').Router();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '476710',
  key: 'fab90205c31a00dadad5',
  secret: '3f7bb590665b3189bd24',
  cluster: 'ap2',
  encrypted: true
});

const users = {};

router.use(function (req, res, next) {
  try {
      req.body = JSON.parse(Object.keys(req.body)[0]);
  } catch (err) {
      req.body = req.body;
  }
  next();
});

router.get('/get_id',(req,res) => {
    const {username} = req.query;
    if(username === "null" || username === "undefined") return res.status(400).send({success: false});
    const user_id = Date.now().toString();
    users[username] = user_id;
    return res.status(200).json({user_id});
})

router.post('/send',(req,res) => {
  const {username, toUser, message} = req.body;
  const channel = users[toUser];
  pusher.trigger(channel,'new-message',{message, toUser, username})
  return res.status(200).send({success: true})
})

router.get('/listusers',(req, res) => {
  let userslist = [];
  for(key in users) {
    userslist.push(key)
  }
  console.log(userslist)
  return res.status(200).json({userslist});
})

module.exports = router;