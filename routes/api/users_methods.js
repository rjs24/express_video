const express = require('express');
const router = express.Router();
const db = require('../db_conns').db_conn.DB_CONNECT;
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true }));
const table = "users";

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
router.get("/api/users/", async function(rq, rs) {
  if(!rq.query.userId) {
    const all_query_str = "SELECT * FROM " + table + ";";
    const all_query = db.query(all_query_str, (err, res) => {
      if(err) {
        return rs.status(400).send({
          success: 'false',
          message: 'user db error'
      }); 
    } else {
        return rs.status(200).send({
        success: 'success',
        message: res.rows
    });
  } });
} else {
    const user_id = rq.query.userId;
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
router.post("/api/users/", async function(rq, rs) {
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
        return rs.status(201).send({
          success: 'true',
          message: { "outcome": username + " has been created.",
                      "userId" : username }
        });
      }
    });
  }
});

// edit a current users details
router.put("/api/users/", async function(rq, rs) {
  if(!rq.body.userid)  {
    return rs.status(400).send({
      success: 'false',
      message: 'You must provide a userid and the attribute you wish to change'
    });
  } else {
    const username = rq.body.userid;
    let body = rq.body;
      for (var property in body) {
        if(property != 'userid' && property != undefined && property != 'connections') {
            let value = body[property]
            console.log(value);
            let update_str = "UPDATE " + table + " SET " + property + " = '" + value + "' WHERE userid = '" + username +"';";
            console.log(update_str);
            const user_edit = db.query(update_str, (err, res) => {
              if (err) {
                console.log(err);
                return rs.status(500).send({
                  success: 'false',
                  message: 'Not able to edit user '+ username
                });
              } else if (res) {
                return rs.status(200).send({
                  success: 'true',
                  message: { "outcome": username + " has been edited.",
                              property : property + " has been updated." },
                  updated: true
                });
              }
            })
          } else {
            continue;
          };
        }
    }
  });

// delete a current users details
router.delete('/api/users/', async function(rq, rs) {
  console.log(rq.body.userid);
  if(!rq.body.userid)  {
    return rs.status(400).send({
      success: 'false',
      message: 'You must supply a user_id for the delete operation.'
    });
  } else {
    const user_id = rq.body.userid;
    const delete_str = "DELETE * FROM " + table + " WHERE userid like '%" + user_id + "%';";
    const user_deletion = db.query(delete_str, (err, res) => {
      if (err) {
        console.log(err);
        return rs.status(500).send({
          success: 'false',
          message: 'user not deleted'
        });
      } else if (res) {
        return rs.status(200).send({
          success: 'true',
          message: { "outcome": username + " deleted." }
        });
      }
    });
  }
});
