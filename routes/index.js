const router = require('express').Router();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '476710',
  key: 'fab90205c31a00dadad5',
  secret: '3f7bb590665b3189bd24',
  cluster: 'ap2',
  encrypted: true
});

router.get('/get_id',(req,res) => {
     return res.status(200).json({user_id: Date.now()});
})

module.exports = router;