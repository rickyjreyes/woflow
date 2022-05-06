const express = require("express");

const app = express();
const fetch = require("node-fetch");
const PORT = process.env.PORT || 8080;
const rootNode = "089ef556-dfff-4ff2-9733-654645be56fe";

fetch("https://nodes-on-nodes-challenge.herokuapp.com/nodes/" + rootNode)
  .then((response) => response.json())
  .then((data) => {
    var rootId=data[0].id;
    //root node
    console.log(rootId);

    //iterate all children
    getChildren(data[0].child_node_ids);
    
  })
  .catch((err) => {
    console.log("Request Failed");
  });
  var total = 0;
  var set= new Set();
  var list = [];
  function getChildren(childList){
    // var childList = data[0].child_node_ids;
    console.log(childList);

    const lengthNode =childList.length;
    console.log(lengthNode);
    total=lengthNode+total;
    console.log(total);
    childList.forEach((newChild) => {
      list.push(newChild);
      list.sort();
      console.log(list)
      set.add(newChild);
      console.log(set);
      fetch("https://nodes-on-nodes-challenge.herokuapp.com/nodes/" + newChild)
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0].child_node_ids);
          var newChildList = data[0].child_node_ids;
          if(newChildList.length > 0){
            getChildren(newChildList);
          }
          
        });
    });
  }

// app.listen(PORT, function () {
//   console.log(`The server is running on ${PORT} 🚀`);
// });
