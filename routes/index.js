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

router.get('/get_id',(req,res) => {
    const {username} = req.params;
    const user_id = Date.now().toString();
    users[username] = user_id;
    return res.status(200).json({user_id});
})

router.post('/send',(req,res) => {
  const {username, toUser, message} = req.body;
  const channel = users[toUser];
  pusher.trigger(channel,'new-message',{message, toUser})
  return res.status(200).send({success: true})
});

module.exports = router;