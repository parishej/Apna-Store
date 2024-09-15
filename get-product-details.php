<?php 

header('Content-type:application/json');

try {
    $host = "localhost";
    $username = "root";
    $password = "";

    $pdo = new PDO("mysql:host=$host;dbname=apnastore;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     
    $category = isset($_GET['category']) ? $_GET['category'] : 'shirts';

     
    if ($category) {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category LIKE '%$category%' OR name LIKE '%$category%';");
    } else {
        $stmt = $pdo->prepare("SELECT * FROM products");
    }

    $stmt->execute();
    $product = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        echo json_encode(['error' => 'No products found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
