const express = require('express');
const router = express.Router();
const db = require('../db_conns').db_conn.DB_CONNECT;
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true }));
const table = "node_vid_test_db";

/* GET users listing. */
router.get('/api/users', function(req, res) {
  res.send('this is the users resource');
});

module.exports = router;

// working quick db test connection which shows current data in shell
/*
console.log(db.query('SELECT * FROM node_vid_test_db', (err, res) => {
  console.log(err,res);
  db.end();
}
));
*/
// rest method to search for a user
router.post("/api/users/search", async function(rq, rs) {
  if(!rq.body.userId) {
    return rs.status(400).send({
      success: 'false',
      message: 'You have not specified a userId'
    });
  } else {
    const user_id = rq.body.userId;
    const query_str = "SELECT * FROM " + table + " WHERE userid like '%" + user_id + "%';";
    const userId_query = db.query(query_str, (err, res) => {
      if (err) {
        return rs.status(400).send({
          success: 'false',
          message: 'userId not known'
        });
      } else if (res) {
        return rs.status(200).send({
          success: 'true',
          message: res.rows
        });
      }
    });
  }
});

// rest method to create a new user
router.post("/api/users/create", async function(rq, rs) {
  if(!rq.body.firstName || !rq.body.lastName || !rq.body.email || !rq.body.dofb )  {
    return rs.status(400).send({
      success: 'false',
      message: 'You must fill in all of the information required.'
    });
  } else {;
    const first_name = rq.body.firstName;
    const surname = rq.body.lastName;
    const email = rq.body.email;
    const date_birth = rq.body.dofb;
    const username = first_name.slice(0,1) + surname.slice(0,3) + Math.floor(Math.random() * 100) + 1;
    const insert_str = "INSERT INTO " + table + "(email, first_name, second_name, dob, email_true, connections, userid) \
    VALUES('" + email + "', '" + first_name + "', '" + surname + "', '" + date_birth + "', '" + false + "', '" + '{"None"}' + "', '" + username + "');";
    console.log(insert_str);
    const user_creation = db.query(insert_str, (err, res) => {
      if (err) {
        console.log(err);
        return rs.status(500).send({
          success: 'false',
          message: 'user not created'
        });
      } else if (res) {
        return rs.status(200).send({
          success: 'true',
          message: { "outcome": username + " has been created.",
                      "userId" : username }
        });
      }
    });
  }
});