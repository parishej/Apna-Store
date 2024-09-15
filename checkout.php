<?php

$dsn = 'mysql:host=localhost;dbname=apnastore';  
$username = 'root'; 
$password = '';   

try {
    $pdo = new PDO('mysql:host=localhost;dbname=apnastore',$username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        $name = $_POST['name'];
        $address = $_POST['address'];
        $phone = $_POST['phone'];

         
        $cartProducts = json_decode($_POST['cartProducts'], true);  

         
        $totalItems = 0;
        $totalPrice = 0.0;

        foreach ($cartProducts as $product) {
            $totalItems += $product['quantity'];
            $totalPrice += $product['price'] * $product['quantity'];
        }

         
        $pdo->beginTransaction();

         
        $stmt = $pdo->prepare("INSERT INTO customers (name, address, phone) VALUES (:name, :address, :phone)");
        $stmt->execute([
            ':name' => $name,
            ':address' => $address,
            ':phone' => $phone
        ]);
        $customerId = $pdo->lastInsertId();  

        
        $stmt = $pdo->prepare("INSERT INTO orders (customer_id, total_items, total_price) VALUES (:customer_id, :total_items, :total_price)");
        $stmt->execute([
            ':customer_id' => $customerId,
            ':total_items' => $totalItems,
            ':total_price' => $totalPrice
        ]);
        $orderId = $pdo->lastInsertId();  

         
        $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (:order_id, :product_name, :quantity, :price)");
        foreach ($cartProducts as $product) {
            $stmt->execute([
                ':order_id' => $orderId,
                ':product_name' => $product['name'],
                ':quantity' => $product['quantity'],
                ':price' => $product['price']
            ]);
        }

        
        $pdo->commit();

        echo "Order placed successfully!";
    }
} catch (PDOException $e) {
    
    $pdo->rollBack();
    echo "Error: " . $e->getMessage();
}
?>
