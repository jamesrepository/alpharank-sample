var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AlphaRank' });
  //res.send('ok');
  //res.sendFile(path.join(__dirname, '../pages', '/index.html'));
});

router.post('/', function(req, res) {
  console.log(req.body.email);
  console.log(req.body.name);

  var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest();
  request.body = {
    "personalizations": [
      {
        "to": [
          {
            "email": process.env.EMAIL
          }
        ],
        "subject": "Contact Form"
      }
    ],
    "from": {
      "email": req.body.email
    },
    "content": [
      {
        "type": "text/plain",
        "value": 'From: ' + req.body.name + '\n\n' + 'Phone: ' + req.body.phone + '\n\n' + 'Compnay: ' + req.body.company + '\n\n' + 'Message: ' + req.body.message
      }
    ]
  };
  request.method = 'POST';
  request.path = '/v3/mail/send';
  sg.API(request, function (response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });

});


module.exports = router;
