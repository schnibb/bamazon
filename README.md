# bamazon

This application uses MySQL and NodeJS to display and manipulate date from our database to simulate an amazon like application.  This application contains two different JS files, bamazonCustomer.js and bamazonManager.js.  Below more detail will be given as to how these application function.

# bamazonCustomer.js

This application would be the customer facing portion of the app.  Once the app is launched the all available products will be displayed.  Once all items are displayed the the user will then select which product they would like to purchase by entering the item_id and the the quantity they would like to purchase.  

The application then retrieves from the database the specific item and checks to see that there is sufficient quantity to fill the order.  If there is enough the user will be presented with the total for the purchase and the database will be updated to reduce the in stock quantity for that particular product.  If there is not enough product, the user will be presented a message stating that there is not enough product to fill their order, no database changes will be made at this time.

#bamazonManager.js

This application will be for the manager to utilitize to do more manipulation of the database.  The manager will be presented with 4 options (view all inventory, view low quantity inventory, add quantity to existing product, and add a new product to the database).

view all inventory:
Once selected the manager will be presented will all products listed in the database with all their information.

view low quantity inventory:
When this option is selected the manager will be present with a list of products thats inventory is below 5.  If there are currently no items below a quantity of 5, the manager will be informed that there are no items currently low.

add quantity to existing product;
When the manager selects this option, all products will be presented to the manager.  The manager will then select the item_id they would like to update, followed by the quantity to add to the current quantity.  The app will then update the specified item's quantity and then redisplay the updated item for the manager to verify.

add a new product:
When the manager selects this option they will be presented with prompts to input the information to enter into the database.  The data will then be submitted to the database and added to the table.  Once completed the information will be displayed back to the manager for verification.