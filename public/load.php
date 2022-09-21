<?php
require 'connection.php';

$sql = $pdo->query("SELECT * FROM status");
if ( $sql->rowCount() > 0 ) {
    foreach ( $sql->fetchAll() as $value ) {
        echo "<h3>PVs</h3>: ".$value['current_hp']."/".$value['max_hp'];
    }
}