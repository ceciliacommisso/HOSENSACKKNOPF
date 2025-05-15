// === Warte bis das DOM geladen ist ===
document.addEventListener('DOMContentLoaded', () => {
  const eintraegeContainer = document.querySelector('section.eintraege');
  eintraegeContainer.innerHTML = '';

  // === Icon-Zuordnung je nach Wert (1–5) ===
  const iconMap = {
    1: 'assets/Ausrufezeichen.png',
    2: 'assets/GRUEN_Kreis.png',
    3: 'assets/BLAU_Viereck.png',
    4: 'assets/ORANGE_Dreieck.png',
    5: 'assets/GELB_Sonne.png'
  };

  // === Hole die Daten von der API ===
  fetch('https://hosensackknopf.kruselkopf.ch/unload.php')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(json => {
      const tage = json.tage;

      // === Für jeden Tag neue Sektion erzeugen ===
      tage.forEach(eintraege => {
        if (eintraege.length === 0) return;

        const datum = eintraege[0].zeit ? new Date(eintraege[0].zeit) : new Date();
        const titleDate = datum.toLocaleDateString('de-DE', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        // === Neue Sektion für den Tag ===
        const section = document.createElement('section');
        section.classList.add('eintrag');

        // === Titelbereich mit Datum ===
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titel');

        const h3 = document.createElement('h3'); // Jetzt H3 statt H2
        h3.textContent = titleDate;
        titleDiv.appendChild(h3);
        section.appendChild(titleDiv);

        // === Container für die Icons und Zeiten ===
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('inhalt');

        // === Definierte Uhrzeit-Slots ===
        const slotZeiten = [
          { label: '09:00', stunde: 9 },
          { label: '12:00', stunde: 12 },
          { label: '15:00', stunde: 15 },
          { label: '19:00', stunde: 19 }
        ];

        // === Initialisiere Map für Slot-Einträge ===
        const slotMap = {
          '09:00': null,
          '12:00': null,
          '15:00': null,
          '19:00': null
        };

        // === Weist die Einträge dem richtigen Slot zu ===
        eintraege.forEach(item => {
          if (!item.wert || !iconMap[item.wert] || !item.zeit) return;

          const zeitObj = new Date(item.zeit);
          const stunde = zeitObj.getHours();

          const slot = slotZeiten.find(s => s.stunde === stunde);
          if (!slot) return;

          slotMap[slot.label] = { wert: item.wert, zeit: zeitObj };
        });

        // === Für jeden Zeitslot einen Eintrag erzeugen ===
        slotZeiten.forEach(slot => {
          const eintrag = slotMap[slot.label];

          let imgSrc, imgAlt, zeitText;

          if (eintrag) {
            // Eintrag vorhanden → Icon und echte Zeit
            imgSrc = iconMap[eintrag.wert];
            imgAlt = `Wert ${eintrag.wert}`;
            zeitText = eintrag.zeit.toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit'
            });
          } else {
            // Kein Eintrag → Platzhalter
            imgSrc = 'assets/Fragezeichen.png';
            imgAlt = 'Noch kein Eintrag';
            zeitText = slot.label;
          }

          // === Icon-Element erstellen ===
          const img = document.createElement('img');
          img.classList.add('icon');
          img.src = imgSrc;
          img.alt = imgAlt;

          // === Zeit-Text unter dem Icon ===
          const p = document.createElement('p');
          p.classList.add('zeit');
          p.textContent = zeitText;

          // === Wrapper für Icon + Zeit ===
          const wrapper = document.createElement('div');
          wrapper.classList.add('icon-wrapper');
          wrapper.appendChild(img);
          wrapper.appendChild(p);

          // === Icon-Wrapper zum Inhalt hinzufügen ===
          contentDiv.appendChild(wrapper);
        });

        // === Inhalt zur Tagessektion anhängen ===
        section.appendChild(contentDiv);

        // === Ganze Sektion zur Seite hinzufügen ===
        eintraegeContainer.appendChild(section);
      });
    })
    .catch(err => {
      console.error('Fehler beim Laden der Daten:', err);
      eintraegeContainer.textContent = 'Daten konnten nicht geladen werden.';
    });
});
