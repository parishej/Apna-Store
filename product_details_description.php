<?php
header('Content-Type: application/json');

try {
    
    $host = 'localhost'; 
    $db = 'apnastore';
    $user = 'root';
    $pass = '';

   
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        echo json_encode(['error' => 'Product ID is required']);
        exit;
    }

    $productId = (int)$_GET['id'];

    
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id = :id');
    $stmt->bindParam(':id', $productId, PDO::PARAM_INT);
    $stmt->execute();

    
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        echo json_encode(['error' => 'Product not found']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
