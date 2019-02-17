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

function viewProducts() {
    connection.query("select item_id,product_name,price,stock_quantity from products", function(err, res) {
        if (err) throw err;
        console.log("results: " + res);
        managerChoice();
    });
}

function viewLowProducts() {
    connection.query("select * from products group by stock_quantity having stock_quantity(*) > 5", function(err, res) {
        if (res == null) {
            console.log("There are no low items at this tiem.")
        } else {
            console.log(res);
        }
        managerChoice();
    });
}

function addInventory() {
    connection.query("select item_id,product_name,stock_quantity from products", function(err, res) {
        console.log(res);
        inquirer.prompt([{
                name: "id",
                type: "input",
                message: "Which product would you like to update(enter item_id): "
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to add to the stock: "
            }
        ]).then(function(answer) {
            connection.query("update products set stock_quantity= stock_quantity+" + answer.quantity + " where item_id=" + answer.id);
            connection.query("select item_id,product_name,stock_quantity from products where item_id=" + answer.id, function(err, res2) {
                console.log(res2);
                managerChoice();
            });
        })
    })
}

function addNewProduct() {
    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "Unique ID: "
        },
        {
            name: "product",
            type: "input",
            message: "Product Name: "
        },
        {
            name: "department",
            type: "input",
            message: "Department Name: "
        },
        {
            name: "price",
            type: "input",
            message: "Price: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Quantity: "
        }
    ]).then(function(answers) {
        console.log(answers.department);
        connection.query("insert into products(item_id, product_name, department_name, price, stock_quantity) values (" + answers.id + ", '" + answers.product + "', '" + answers.department + "', " + answers.price + ", " + answers.quantity + ")");

        connection.query("select * from products", function(err, res) {
            console.log(res);
            managerChoice();
        })
    });
}

function managerChoice() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.choice === "View Products for Sale") {
                viewProducts();
            } else if (answer.choice === "View Low Inventory") {
                viewLowProducts();
            } else if (answer.choice === "Add to Inventory") {
                addInventory();
            } else if (answer.choice === "Add New Product") {
                addNewProduct();
            } else {
                connection.end();
            }
        });
}

managerChoice();