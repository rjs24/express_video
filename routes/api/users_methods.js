const express = require('express');
const router = express.Router();
const db = require('../db_conns').db_conn.DB_CONNECT;
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true }));

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
router.post("/api/users/search", async function(rq, rs) {
  if(!rq.body.userId) {
    return rs.status(400).send({
      success: 'false',
      message: 'You have not specified a userId'
    });
  } else {
    const table = 'node_vid_test_db';
    const user_id = rq.body.userId;
    console.log(table, user_id);
    const query_str = "SELECT * FROM " + table + " WHERE userid like '%" + user_id + "%';";
    const userId_query = db.query(query_str, (err, res) => {
      console.log(res);
      if (err) {
        return rs.status(400).send({
          success: 'false',
          message: 'userId not known'
        });
      } else if (res) {
        return rs.status(200).send({
          succees: 'true',
          message: res.rows
        });
      }
    });
  }
});