var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Gardner01",
    database: "bamazon"
});

function showProducts() {
    connection.query("select item_id,product_name,price from products", function(err, res) {
        if (err) throw err;
        console.log(res);
        choseProduct();
    });
}

function choseProduct() {
    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "which ID would you like to make a purchase from: "
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase"
        }
    ]).then(function(answer) {
        connection.query("select price,stock_quantity from products where item_id=" + answer.id, function(err, res) {
            console.log(res);
            var currentStock = res[0].stock_quantity;
            var price = res[0].price;
            var newStock = currentStock - answer.quantity;

            if (currentStock >= answer.quantity) {
                var total = answer.quantity * price;
                connection.query("update products set stock_quantity=" + newStock + " where item_id=" + answer.id);
                console.log("The total for your items will be: $" + total);
            } else {
                console.log("Insufficient quantity to complete your order.");
            }
        });

    })
}

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showProducts();
});