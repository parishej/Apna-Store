<?php

include("config.php");

if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {
     
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    try {
         
        $query = $conn->prepare("INSERT INTO contact(name, email, message) VALUES(:name, :email, :message)");

        
        $query->bindParam(':name', $name);
        $query->bindParam(':email', $email);
        $query->bindParam(':message', $message);

        
        if ($query->execute()) {
            
            header("Location: contact.html?status=success");
        } else {
            
            header("Location: contact.html?status=error");
        }
    } catch (PDOException $e) {
        
        header("Location: contact.html?status=error");
        error_log($e->getMessage()); 
    }
} else {
     
    header("Location: contact.html?status=error");
}

$conn = null; 
exit();
?>
