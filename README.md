# Bericht zum Umsetzungsprozess

![IMG_1585](https://github.com/user-attachments/assets/3534fbbd-6e09-4bca-b44e-9137e56ac7a5)


In unserem Projekt haben wir ein einfach zu bedienendes Gerät entwickelt, mit dem Nutzer:innen ihre Stimmung erfassen können. Das Gerät besteht aus fünf Knöpfen und einer LED-Lampe, die zu festgelegten Zeiten am Tag leuchtet. Nutzer:innen können per Knopfdruck angeben, wie sie sich gerade fühlen – von "sehr schlecht" bis "sehr gut". Die Stimmungsdaten werden in einer Datenbank gespeichert und auf einer übersichtlichen Webseite visualisiert.

Das Video zeigt unser Gerät in Aktion: Wie es aufgebaut ist, wie es funktioniert und wie die Stimmungserfassung durch Knopfdruck abläuft. Es gibt einen Einblick in das User Interface der Webseite und vermittelt die Idee, wie das System im Alltag genutzt werden kann.

https://youtu.be/kpYLlLLYOns

## 1. Entwicklungsprozess

Der Projektverlauf gliederte sich in mehrere Phasen:  
Zunächst führten wir eine Recherchephase durch, um Inhalte, Gestaltungskontext und Zielgruppenbedürfnisse zu erfassen. In dieser Zeit entstanden auch zwei Interviews.

Darauf aufbauend folgte die Ideenfindung und Skizzierung erster Ansätze. Unsere initiale Idee – eine Art Diktaphon, das wir Hosensackknopf nannten – mussten wir jedoch wieder verwerfen. Dies weil die technische Umsetzung mit einer eingebauten KI für das IM4-Modul zu komplex als ursprünglich angenommen gewesen wäre. Jan hat uns davon abgeraten hat, weil er nicht wollte, dass wir am Ende mit unserem Projekt überfordert oder enttäuscht sind. 

Da unser gesamter UX-Teil zu diesem Zeitpunkt bereits auf dem "Hosensackknopf" basierte, entschieden wir uns (in Absprache mit Jan), den UX-Teil von der ersten Idee trotzdem abzugeben.

Deshalb entwickelten wir eine zweite und finale Idee:  
Ein Gerät mit fünf Knöpfen, mit dem die Nutzer:innen ihre Stimmung tracken können. Wir nennen es "Wie geht es dir?"
Jeden Tag um 9:00, 12:00, 15:00 und 19:00 Uhr leuchtet eine externe LED-Lampe.  

Wenn die Lampe leuchtet, wählt man per Knopfdruck eine Stimmung aus:  
- Button 1 = sehr schlecht  
- Button 5 = sehr gut  

Die Daten werden in einer Datenbank gespeichert und können über eine Webseite abgerufen werden.  
Die Webseite zeigt einen klaren Überblick über die Stimmung in der vergangenen Zeit.  

Für diese Idee haben wir auch ein Mockup erstellt, um die Programmierung der Webseite zu erleichtern.  
Beim UX-Design haben wir uns bewusst für ein möglichst simples Konzept entschieden.  
Da die Zielgruppe (Ü50) Einfachheit und Verständlichkeit bevorzugt, setzen wir auf:  
- große Icons  
- klare Strukturen  
- verständliches Design  

Inspirationen waren vor allem Kinderspiele und Duolingo.  
Die Applikation soll selbsterklärend und leicht zu bedienen sein.

## 2. Projektstart

Wir haben die Aufgaben vor Beginn der Umsetzung aufgeteilt:  
- Nick: Website und Datenbankverbindung  
- Cecilia: Physical Part und Dokumentation  

Diese Aufteilung hat sehr gut funktioniert und uns ermöglicht effizient zu arbeiten. 

<img width="707" alt="Bildschirmfoto 2025-05-28 um 19 31 20" src="https://github.com/user-attachments/assets/579417f1-a61a-4c15-95ec-9dfc20426e04" />

### 2.1 Website

Nick hat sich für die Website an das dafür erstellte Mockup (Variante 2) gehalten. Dabei hat er Mobile first gearbeitet. Aufgrund des einfachen Aufbaus der Website konnten Flexboxen benutzt werden, um die Inhalte responsive zu gestalten. 
Zuerst hat er die verschiednen Dokumente inkl. Gitignoire erstellt und ein übergreifendes CSS erstellt, wo mit --var und rem Angaben gearbeitet wurde. Das hat geholfen um die Übersicht zu behalten und schnell anpassungen an der Schrifftgrösse zu machen. 

Anschliessend wurden alle Inhalte abgefüllt und die Verbindung zur Datenbank hergestellt. Sobald dies erfolgt ist, hat Nick einige Zeit damit verbracht eine Lösung für die Darstellung der Icons zu finden. Besonders, was wie angezeigt werden sollte, wenn nur 3 von 4 Datensätzen vorhanden waren. 

Am Ende, als die Fuktion und alle Inhalte festgelegt waren, wurde die Ansicht responsive gestaltet und die Schriftgrössen/Flexboxen entsprechend angepasst. 

**Schwierigkeiten**
 - aus unerklärlichen Gründen hat der automatische FTP upload nicht funktioniert. Bis zum Ende des Projektes hat haben wir inkl. Donzenten nicht herausgefunden, was das Problem war.
 - Nick war noch im Austauschsemester und das letzte Mal IM war bereits 1 Jahr her. Der Umgang mit den verschienden Programmiersprachen gestaltete sich anfänglich etwas schwierig.
 - Die Anordnung Icons, welche von der basierend auf den Daten der Datenbank eingefügt wurden, war schwierig. Wenn keine Daten vorhanden waren oder 1x Datensatz an diesem Tag fehlte verschoben sich aufgrund der Flexbox alle Inhalte. 

**Positives**
- Auch wenn der Start und das hineindenken mühsehlig war, hatte Nick am Ende des Projektes wieder Spass am Programmieren und gemerkt, dass er im IM doch einiges gelernt hat. Erfahrungen aus den letzten Projekten haben geholfen, Fehler zu vermeiden (Beispiel generelles CSS) und effizienter zu Arbeiten. 
- Die Verwendung von ChatGPT war enorm hilfreich. Gar nicht besonders um den Code zu schreiben, aber um ihn zu verstehen. Man konnte solange Nachfragen, bis man es verstanden hatte. So hat Nick den gesamten Code selber geschrieben, damit er zu jedem Punkt verständlich bleibt. Im Prozess konnte mittels KI Lösungen gefunden werden, die Nick ohne nicht in den Sinn gekommen wären.
- Die Verbindung der Datenbank war aufgrund der guten Dokumentation und Einführund im Unterricht schnell und einfach. Auch das Interface von Infomaniak war einfach und verständlich. Hier hat der Austausch mit den Dozierenden sehr geholfen.

![IMG_1451](https://github.com/user-attachments/assets/db798ba1-ca91-4d18-8f52-9541f50cccf9)

### 2.2 Physical Part & Dokumentation

Beim Aufbau der Elektronik orientierte Cecilia sich hauptsächlich an Plänen von GitHub.  
Anfängliche Schwierigkeiten waren vor allem auf fehlende Erfahrung mit Physical Computing zurückzuführen, ließen sich aber immer schnell lösen.

Auch beim Programmieren lief es ähnlich:  
Das meiste funktionierte gut und schnell.  Bei Problemen konsultierte Nick die Dozenten, Tutoren oder ChatGPT – das hat super funktioniert.

Der Physical-Computing-Teil war nach zwei Tagen grundsätzlich abgeschlossen.  
Danach erstellte Cecilia die Dokumentation, die größtenteils selbsterklärend war und keine großen Schwierigkeiten bereitete.  
Unser Gadget und unsere Applikation funktionieren genau so, wie wir es geplant haben – es sollten also keine Bugs auftreten.

## 3. Learnings

Der Lerneffekt für beide extrem hoch.  
Cecilia startete IM4 ohne jegliche Vorkenntnisse im Physical Computing – und wir haben es geschafft, in weniger als zwei Wochen ein funktionierendes Gadget zu entwickeln.

Der physische Aspekt des Projekts machte viel mehr Spaß als reines Webprogrammieren.  
Es war toll, zu experimentieren und zu basteln.  
Cecilia versteht nun den Code ein bisschen besser als vorher, auch wenn die Datenbankverbindung noch etwas mysteriös erscheint – aber sie hat eine grobe Vorstellung, wie es funktioniert.

Nick konnte seine Fähigkeiten im HTML/CSS/JavaScribt verbessern und festigen. Der Aufbau und die Verbindung mit der Datenbank war ebenfalls lehrreich. 
Das Problemlösen und Verstehen mit ChatGPT hat Spass gemacht. Wie KI für ein solches Projekt ideal eingesetzt werden kann, wurde vertieft. 
Das vorgängige Überlegen wie und warum genau die Website/Datenbank aufgebaut werden war neu. Der Prozess was manchmal etwas ermürbend, frustrierend aber schlussendlich zufriedenstellend. 


# Schritt für Schritt Anleitung Arduino

**Was du brauchst:**
1x ESP32 C6 WROOM 1 - Board
1x Breadboard
5x Taster (Pushbuttons)
1x LED (rot im Plan)
1x 220-330 Ohm Widerstand
Jumper-Kabel (verschiedene Farben)
USB-Kabel zum Programmieren
Arduino IDE mit ESP32-Unterstützung
WLAN-Zugangsdaten

![Steckschema](https://github.com/user-attachments/assets/41822e74-e97f-4ff7-9be2-a1ff213f87bf)


**Hardware-Aufbau: Verkabelung laut Steckplan**
 
 1. Stromversorgung
Schließe das ESP32 per USB an den PC an.
Auf dem Breadboard:
Verbinde GND vom ESP32 mit der blauen Minus-Leiste des Breadboards.
Verbinde 3V3 (oder 5V) mit der roten Plus-Leiste (je nachdem, ob deine Bauteile mit 3.3V oder 5V laufen).

2. Taster anschließen (Button 1–5)
Jeder Taster hat 4 Pins. Du benutzt diagonal gegenüberliegende Pins (z.B. links oben & rechts unten).
Taster
ESP32 GPIO
Drahtfarbe
Steckbrett-Spalten
1
GPIO 11
Orange
Taster links außen
2
GPIO 1
Rosa
Nächster Taster
3
GPIO 7
Grün
...
4
GPIO 0
Lila
...
5
GPIO 10
Türkis
Taster rechts außen

Für jeden Taster:
Ein Bein geht an GND (über schwarze Jumperkabel oben zur blauen Leiste).
Das andere Bein geht an den jeweiligen GPIO-Pin.
Die Taster verwenden INPUT_PULLDOWN, deshalb ist GND wichtig, nicht 3.3V.

 3. LED anschließen (extern)
Anode (langer Pin) der LED → über gelbes Kabel zu GPIO 2
Kathode (kurzer Pin) → mit Widerstand (220–330 Ohm) → GND-Leiste

![Komponentenplan](https://github.com/user-attachments/assets/3e94c155-11e8-4e92-8e9e-cbfb9ffa66f7)


**Software-Konfiguration**
1. Arduino IDE vorbereiten
ESP32-Plattform installieren (über den Boardverwalter)
Wähle das richtige Board: ESP32 Dev Module
Wähle den richtigen Port
2. Code hochladen
Füge deinen Code in die Arduino IDE ein
Trage deine WLAN-Daten ein:
const char* ssid = "DEIN_SSID";
const char* password = "DEIN_PASSWORT";
Lade den Code hoch

**Funktionsweise beim Betrieb**
Zeitsynchronisierung über WLAN: ESP32 verbindet sich mit dem Internet und lädt die aktuelle Uhrzeit via NTP.
Geplante Zeiten: Bei {9:00, 12:00, 15:00, 19:00} startet ein Durchgang:
Die externe LED geht an.
Jetzt kann genau 1 Taste gedrückt werden.
Diese Eingabe wird per HTTP POST an den Server gesendet.
Danach geht die LED aus, und der Durchgang ist abgeschlossen.
Die interne LED leuchtet immer dann, wenn irgendeine Taste gedrückt wird.

<img width="738" alt="Flussdiagramm" src="https://github.com/user-attachments/assets/6b3b38b4-0ec2-40db-9b9c-7c1cc16cb211" />


**Tests & Tipps**
Verwende den seriellen Monitor (115200 Baud), um zu sehen, ob WLAN verbunden ist und Daten korrekt gesendet werden.
Falls kein WLAN oder kein Server erreichbar ist, zeigt der Monitor entsprechende Fehlermeldungen.



