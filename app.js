//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const lodash = require("lodash"); // example: shalon-dangol (for connecting two words)

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


const posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://anishbista9235:mL2PTYz0wLevW3bG@cluster0.ybcpojj.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, })


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  }

});

const Post = mongoose.model("Post", blogSchema);


app.get("/", (req, res) => {
  Post.find().then((posts) => {
    res.render("home", { homeContent: homeStartingContent, post: posts });
  })

});


app.get("/about", (req, res) => {
  res.render("about", { about: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contact: contactContent });
  console.log(req.params.name);
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/post/:postId", (req, res) => {
  // let postName = lodash.lowerCase(req.params.postName);
  let PostId = req.params.postId;
  // posts.forEach((post) => {
  //   // console.log(post.title);
  //   if (postName == lodash.lowerCase(post.title)) {
  //     console.log("match found!");
  //     res.render("post", { postTitle: post.title, postContent: post.post });
  //   } else {
  //     console.log("not found!");
  //   }
  // });
  Post.findOne({ _id: PostId }).then((post) => {
    res.render("post", { postTitle: post.title, postContent: post.post });

  })
    .catch((err) => {
      console.log(err);
    })

});

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.title,
    post: req.body.post,
  });
  // posts.push(post);
  post.save();
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
