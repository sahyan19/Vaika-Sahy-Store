<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_ POST['username'];
    $password = $_ POST['password'];
    
    // Vérification des crédits
    if ($username == 'admin' && $password == 'qwerty') {
        echo json_encode(['authenticated' => true]);
        return;
    }
    
    echo json_encode(['authenticated' => false]);
}
?>