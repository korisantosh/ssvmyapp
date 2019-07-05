var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var TASK_COLLECTIONS = "tasks";

var request = require("request");
var http = require("https");

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Authorization",
    "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
  );
  next();
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/ssvmyapp",
  { useNewUrlParser: true },
  function(err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 4202, function() {
      var port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/jira", function(req, res) {
  var queryObject = {
    jql:
      "assignee in (currentUser()) AND status != Done order by lastViewed DESC",
    fields: "id,key,status,issuetype,summary,priority,timespent"
  };
  var options = {
    method: "GET",
    url: "https://saas-ag.atlassian.net/rest/api/2/search",
    qs: queryObject,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
    }
  };

  request(options, function(error, response, body) {
    if (error) {
      throw new Error(error);
      console.log(
        "Response: " + response.statusCode + " " + response.statusMessage
      );
    }

    // console.log(body);
    jiraRes = JSON.parse(body);
    console.log(jiraRes);
    console.log(jiraRes.issues);
    res.send(jiraRes.issues);
  });
});

function addDevTicket(body) {
  var options = {
    method: "POST",
    hostname: "pragiti.atlassian.net",
    port: null,
    path: "/rest/api/2/issue/SAPO-91/worklog",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}
// add new worklog
app.post("/api/worklogs/:ticketid/worklog", function(req, res) {
  var ticketId = req.params.ticketid;
  // console.log("request ticket " + ticketId);
  // console.log("body " + req.body);
  // console.dir(req.body);
  var reqBody = req.body;
  // var resData;
  var queryObject = {
    notifyUsers: false
  };
  var options = {
    method: "POST",
    url:
      "https://saas-ag.atlassian.net/rest/api/2/issue/" + ticketId + "/worklog",
    qs: queryObject,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
    },
    body: {
      "timeSpentSeconds": 100,
      "comment": "Test Worklog",
      "started": "2019-07-05T10:16:12.691+0000"
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) {
      throw new Error(error);
    } else {
      console.log(body);
      if (body.timeSpent && body.timeSpent != "") {
        console.log("added worklog into main ticket");
        var queryObject = {
          notifyUsers: false
        };
        var options2 = {
          method: "POST",
          url: "https://pragiti.atlassian.net/rest/api/2/issue/SAPO-91/worklog",
          qs: queryObject,
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
          },
          body: {
            "timeSpentSeconds": 100,
            "comment": "Test Worklog",
            "started": "2019-07-05T10:16:12.691+0000"
          },
          json: true
        };

        request(options2, function(error, response, body) {
          if (error) {
            throw new Error(error);
          } else {
            console.log('option2 body' + body);
            if (body.timeSpent && body.timeSpent != "") {
              res.send('Added Worklog on both places');
            } else {
              res.send("Not able to add worklog into dev ticket");
            }
          }
        });
      } else {
        res.send("Not able to add worklog into main ticket");
      }
    }
    // res.send(body);
  });
});
// Returns all worklogs for an issue.
app.get("/api/worklogs/:ticketid", function(req, res) {
  var request = require("request");
  var ticketId = req.params.ticketid;
  console.log("request ticket " + ticketId);
  var options = {
    method: "GET",
    url:
      "https://saas-ag.atlassian.net/rest/api/2/issue/" + ticketId + "/worklog",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
    }
  };

  request(options, function(error, response, body) {
    if (error) {
      throw new Error(error);
      console.log(
        "Response: " + response.statusCode + " " + response.statusMessage
      );
    }

    // console.log(body);
    jiraRes = JSON.parse(body);
    console.log(jiraRes.worklogs);
    res.send(jiraRes.worklogs);
  });
});
// Update specific worklogs

// Returns all worklogs for an issue.
app.put("/api/worklogs/:ticketid/worklog/:worklogid", function(req, res) {
  var ticketId = req.params.ticketid;
  var worklogId = req.params.worklogid;
  console.log("request ticket " + ticketId);
  console.log("request worklogId " + worklogId);
  var options = {
    method: "PUT",
    hostname: "saas-ag.atlassian.net",
    port: null,
    path: "/rest/api/3/issue/" + ticketId + "/worklog/" + worklogId,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
    }
  };

  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(
    JSON.stringify({
      timeSpent: "3h 25m",
      comment: {
        version: 1,
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "Fix confirm password field validation and added translations for change password page"
              }
            ]
          }
        ]
      }
    })
  );
  req.end();
});
// get worklog details
app.get("/api/issue/:ticketid/worklog/:worklogid", function(req, res) {
  var ticketId = req.params.ticketid;
  var worklogId = req.params.worklogid;
  var request = require("request");
  var options = {
    method: "GET",
    url:
      "https://saas-ag.atlassian.net/rest/api/2/issue/" +
      ticketId +
      "/worklog/" +
      worklogId,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic c2FudG9zaGtAcHJhZ2l0aS5jb206WEp2MXJ2YU5WTzFIeEs5R2g3U09EQ0Y0"
    }
  };

  request(options, function(error, response, body) {
    if (error) {
      throw new Error(error);
      console.log(
        "Response: " + response.statusCode + " " + response.statusMessage
      );
    }
    jiraRes = JSON.parse(body);
    console.log(jiraRes);
    res.send(jiraRes);
  });
});
// $$$$$$$$$$$$$$ DB
// GET ALL TASKs
app.get("/api/tasks", function(req, res) {
  db.collection(TASK_COLLECTIONS)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/tasks", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();
  // console.log('inside post with ' + JSON.stringify(req));
  if (!req.body.title) {
    handleError(res, "Invalid user input", "Must provide a title.", 400);
  } else {
    db.collection(TASK_COLLECTIONS).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/task/:id", function(req, res) {
  db.collection(TASK_COLLECTIONS).findOne(
    { _id: new ObjectID(req.params.id) },
    function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get Task");
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

app.put("/api/task/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;
  var newvalues = { $set: updateDoc };
  db.collection(TASK_COLLECTIONS).updateOne(
    { _id: new ObjectID(req.params.id) },
    newvalues,
    function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update contact");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    }
  );
});

app.delete("/api/task/:id", function(req, res) {
  db.collection(TASK_COLLECTIONS).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
});
