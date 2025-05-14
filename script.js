// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ziel-Container auswählen (füge in index.html id="data" bei <section class="eintraege"> hinzu)
    const eintraegeContainer = document.querySelector('section.eintraege');
    // leere zunächst den statischen Inhalt
    eintraegeContainer.innerHTML = '';
  
    // 2. Icons nach Wert mappen
    const iconMap = {
      1: 'assets/ROT_Ausrufezeichen.png',
      2: 'assets/GRUEN_Kreis.png',
      3: 'assets/BLAU_Viereck.png',
      4: 'assets/ORANGE_Dreieck.png',
      5: 'assets/GELB_Sonne.png'
    };
  
    // 3. Daten vom Server holen
    fetch('https://hosensackknopf.kruselkopf.ch/unload.php')
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => {
        // json.heute ist ein Array mit bis zu 4 Einträgen
        const werte = json.heute;
  
        // Datum für den Titel einmalig aus dem ersten Eintrag ermitteln
        let titleDate = '';
        if (werte[0] && werte[0].zeit) {
          const d = new Date(werte[0].zeit);
          // z.B. "Mittwoch, 14. Mai 2025"
          titleDate = d.toLocaleDateString('de-DE', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          });
        }
  
        // 4. Section für diesen Tag anlegen
        const section = document.createElement('section');
        section.classList.add('eintrag');
  
        // Titel-Block
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titel');
        const h2 = document.createElement('h2');
        h2.textContent = titleDate || 'Heute';
        titleDiv.appendChild(h2);
        section.appendChild(titleDiv);
  
        // Inhalt-Block
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('inhalt');
  
        werte.forEach(item => {
          const wert = item.wert;
          const zeit = item.zeit ? new Date(item.zeit).toLocaleTimeString('de-DE', {
            hour: '2-digit', minute: '2-digit'
          }) : '';
  
          // Icon
          const img = document.createElement('img');
          img.classList.add('icon');
          img.src = iconMap[wert] || '';
          img.alt = `Wert ${wert}`;
  
          // Zeit-Label
          const p = document.createElement('p');
          p.classList.add('zeit');
          p.textContent = zeit;
  
          // Wrapper für Icon+Zeit
          const wrapper = document.createElement('div');
          wrapper.style.display = 'flex';
          wrapper.style.flexDirection = 'column';
          wrapper.style.alignItems = 'center';
          wrapper.style.gap = '0.25rem';
          wrapper.appendChild(img);
          wrapper.appendChild(p);
  
          contentDiv.appendChild(wrapper);
        });
  
        section.appendChild(contentDiv);
        eintraegeContainer.appendChild(section);
      })
      .catch(err => {
        console.error('Fehler beim Laden der Daten:', err);
        eintraegeContainer.textContent = 'Daten konnten nicht geladen werden.';
      });
  });
  