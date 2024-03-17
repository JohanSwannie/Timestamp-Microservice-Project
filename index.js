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

app.get("/api/:date?", (req, res) => {
  let inputDate = req.params.date;
  let isDateEmpty = inputDate == "" || inputDate == null;
  let isValidDate = Date.parse(inputDate);
  let isUnixValid = /^[0-9]+$/.test(inputDate);
  let displayUnix = 0;
  let displayUtc = "";

  if (isValidDate) {
    displayUnix = new Date(inputDate);
    displayUtc = displayUnix.toUTCString();
    return res.json({ unix: displayUnix.valueOf(), utc: displayUtc });
  } else if (isNaN(isValidDate) && isUnixValid) {
    displayUnix = new Date(parseInt(inputDate));
    displayUtc = displayUnix.toUTCString();
    return res.json({ unix: displayUnix.valueOf(), utc: displayUtc });
  } else if (isDateEmpty) {
    displayUnix = new Date();
    displayUtc = displayUnix.toUTCString();
    return res.json({ unix: displayUnix.valueOf(), utc: displayUtc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/:timestamp?", (req, res) => {
  console.log("test Timestamp");
  const timestamp = req.params.timestamp;
  if (!isNaN(Number(timestamp)) && timestamp.length === 13) {
    return res.json({
      unix: timestamp,
      utc: new Date(Number(timestamp)).toUTCString(),
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
