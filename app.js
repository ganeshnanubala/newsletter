const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");



app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));


client.setConfig({
    apiKey: "0d13dc1ebd2a26af831b7c5ef3fd00b8-us21",
    server: "us21",
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const sub = {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname
    }
    console.log(sub);
    async function run() {
        try {
            const response = await client.lists.addListMember("b02cf696f8", {
                email_address: sub.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: sub.fname,
                    LNAME: sub.lname
                }
            });
            res.sendFile(__dirname + '/success.html');
            console.log(response);
        }
        catch(err) {
            console.log(err.status);
            res.sendFile(__dirname + '/failure.html');
        }
        // if (response.status === "subscribed") {

        //     res.sendFile(__dirname + '/success.html');
        // } else {
        //     res.sendFile(__dirname + '/failure.html');
        // }
    }
    run();
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})
app.post("/success", function (req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Port Started");
})

//0d13dc1ebd2a26af831b7c5ef3fd00b8-us21
//b02cf696f8