var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  console.log("test Date");
  const date = req.params.date;
  res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString(),
  });
});

app.get("/api/:timestamp", (req, res) => {
  console.log("test Timestamp");
  const timestamp = req.params.timestamp;
  if (!isNaN(Number(timestamp)) && timestamp.length === 13) {
    return res.json({
      unix: timestamp,
      utc: new Date(timestamp).toUTCString(),
    });
  }
  if (new Date(timestamp).toUTCString() !== "Invalid Date") {
    return res.json({
      unix: new Date(timestamp).getTime(),
      utc: timestamp,
    });
  }
  return res.json({ error: "Invalid Date" });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
