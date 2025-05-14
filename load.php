<?php
/*************************************************************
 * load.php
 * Empfängt JSON mit einem "wert" (1–5) und speichert ihn in die DB.
 *************************************************************/

require_once("db_config.php");

echo "This script receives HTTP POST messages and pushes their content into the database.";

// 1. DB-Verbindung aufbauen
try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    echo "<br>DB Verbindung ist erfolgreich";
} catch (PDOException $e) {
    error_log("DB Error: " . $e->getMessage());
    echo "<br><strong>Fehler:</strong> DB Verbindung fehlgeschlagen";
    exit;
}

// 2. JSON aus HTTP POST einlesen
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// 3. Prüfen ob "wert" vorhanden und gültig ist (1–5)
if (isset($input["wert"]) && in_array($input["wert"], [1, 2, 3, 4, 5])) {
    $wert = $input["wert"];

    // 4. In Datenbank einfügen
    $sql = "INSERT INTO sensordata (wert) VALUES (?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$wert]);

    echo "<br>✅ Wert gespeichert: " . htmlspecialchars($wert);
} else {
    echo "<br>⚠️ Kein gültiger 'wert' (1–5) empfangen – nichts gespeichert.";
}

// 5. Letzte 5 Einträge anzeigen
echo "<br><br><strong>Letzte 5 empfangene Werte:</strong><br>";
$sql = "SELECT * FROM sensordata ORDER BY id DESC LIMIT 5";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$sensordata = $stmt->fetchAll();

echo "<ul>";
foreach ($sensordata as $data) {
    echo "<li>" . (isset($data['wert']) ? htmlspecialchars($data['wert']) : "[leer]") . "</li>";
}
echo "</ul>";

?>
