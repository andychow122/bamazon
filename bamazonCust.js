var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("WELCOME TO CHOW'S CORNER SHOP!!" + "\nWE HAVE THE MOST RANDOM THINGS BUT THEY ARE GREAT!!");
  buyPrompt();
});

function buyPrompt() { //WHAT WOULD USER LIKE TO DO??
  inquirer
    .prompt(
    {
      type: "input",
      name: "action",
      message: "Would you like to purchase something? (y/n)"
    })
    .then(function(answer){
      if (answer.action === 'y') {
      showGoods();
    } else if (answer.action === 'n') {
      console.log("Maybe next time! HAVE A GOOD DAY");
      process.exit();
    } else {
      console.log("Failure to follow instructions.");
      buyPrompt();
    }
    })
}
function showGoods() { //DISPLAY WHAT IS IN DATABASE

   connection.query("SELECT * FROM products", function(err, res){
    
    for (var i = 0; i < res.length; i++){
      console.log("ITEM ID: " + res[i].item_id);
      console.log("Item name: " + res[i].product_name);
      console.log("Item price: $" + Number(res[i].price).toFixed(2));
      console.log("Product department: " + res[i].department_name);
      console.log("-------------------------------");
    }
     runPrompt();
  })
 };
function runPrompt() { //IF USER WANTS TO BUY SOMETHING, ASK WHAT DO THEY WANT

  inquirer
    .prompt([
    {
      name: "item_id",
      type: "input",
      message: "What is the ID of the product you wish to purchase?",
    },
    {
      name: "quantity",
      type: "input",
      message: "How much would you like to purchase?"
    }])
    .then(function(answer) {
      var item_id = answer.item_id;
      var quantity = answer.quantity;

      connection.query("SELECT product_name, price, stock_quantity FROM products WHERE ?", {item_id: item_id}, function(err, res){
        //LOGIC       
        if (res.length === 0) {
          console.log("Item does not exist, sorry homes");
          runPrompt();
        }
        else if (res[0].stock_quantity === 0) {
          console.log("I'm sorry, but we are currently out of " + res[0].product_name)
          runPrompt();
        }
        else if (quantity > res[0].stock_quantity) {
          console.log("We do not have enough of " + res[0].product_name + "!" + 
            "\nWe only have " + res[0].stock_quantity + " left in supply.");
          runPrompt();
        }
        else {
          var newStockQuantity = res[0].stock_quantity - quantity;
          var checkoutPrice = res[0].price * quantity;
          console.log("OK, you bought " + res[0].product_name + " and your total was: $" + Number(checkoutPrice).toFixed(2) + "\nThank you for your time!");
          connection.query("UPDATE products SET stock_quantity = " + newStockQuantity + " WHERE item_id = " + item_id, function() {
            return;
            connection.end();
          })
          inquirer
            .prompt({
              name: "more",
              type: "input",
              message: "Would you like to buy something else? (y/n)"
            })
            .then(function(answer) {
              if (answer.more === 'y') {
              showGoods();
              } else if (answer.more === 'n') {
                console.log("Maybe next time! HAVE A GOOD DAY");
                process.exit();
              } else {
                console.log("Failure to follow instructions.");
                buyPrompt();
              }
            })

        }
      })
    });
};


