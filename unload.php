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
    // Anzahl der Tage, die angezeigt werden sollen
    $tageAnzahl = 5;
    $tage = [];

    for ($i = 0; $i < $tageAnzahl; $i++) {
        $datum = date('Y-m-d', strtotime("-$i days"));
        $sql = "SELECT wert, zeit 
                FROM sensordata 
                WHERE DATE(zeit) = :datum 
                ORDER BY zeit ASC 
                LIMIT 4";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([':datum' => $datum]);
        $werte = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Falls weniger als 4 Einträge vorhanden sind, mit null auffüllen
        while (count($werte) < 4) {
            $werte[] = ["wert" => null, "zeit" => null];
        }

        $tage[] = $werte;
    }

    echo json_encode(["tage" => $tage]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Abfragefehler", "details" => $e->getMessage()]);
}
