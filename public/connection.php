<?php

try {
    $pdo = new PDO("mysql:dbname=espectro;host=localhost", "root", "12Alexsandro34");
} cacth(PDOException $e) {
    echo "Error: ".$e->getMessage();
}
