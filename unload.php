<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
require_once("db_config.php");

// Verbindung aufbauen
try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Datenbankverbindung fehlgeschlagen"]);
    exit;
}

try {
    // Hole die letzten 4 Werte von heute, sortiert nach Zeit
    $sql = "SELECT wert, zeit 
            FROM sensordata 
            WHERE DATE(zeit) = CURDATE() 
            ORDER BY zeit ASC 
            LIMIT 4";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $werte = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Falls weniger als 4 vorhanden sind, fülle mit null auf
    while (count($werte) < 4) {
        $werte[] = ["wert" => null, "zeit" => null];
    }

    echo json_encode(["heute" => $werte]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Abfragefehler", "details" => $e->getMessage()]);
}
