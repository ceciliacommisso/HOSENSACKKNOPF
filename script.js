document.addEventListener('DOMContentLoaded', () => {
  const eintraegeContainer = document.querySelector('section.eintraege');
  eintraegeContainer.innerHTML = '';

  const iconMap = {
    1: 'assets/ROT_Ausrufezeichen.png',
    2: 'assets/GRUEN_Kreis.png',
    3: 'assets/BLAU_Viereck.png',
    4: 'assets/ORANGE_Dreieck.png',
    5: 'assets/GELB_Sonne.png'
  };

  fetch('https://hosensackknopf.kruselkopf.ch/unload.php')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(json => {
      const tage = json.tage;

      console.log(json);

      tage.forEach(eintraege => {
        if (eintraege.length === 0) return;

        const datum = eintraege[0].zeit ? new Date(eintraege[0].zeit) : new Date();
        const titleDate = datum.toLocaleDateString('de-DE', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });

        const section = document.createElement('section');
        section.classList.add('eintrag');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titel');
        const h2 = document.createElement('h2');
        h2.textContent = titleDate;
        titleDiv.appendChild(h2);
        section.appendChild(titleDiv);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('inhalt');

        eintraege.forEach(item => {
          // ❗ Nur anzeigen, wenn ein gültiger Wert vorhanden ist
          if (!item.wert || !iconMap[item.wert]) return;

          const wert = item.wert;
          const zeit = item.zeit ? new Date(item.zeit).toLocaleTimeString('de-DE', {
            hour: '2-digit', minute: '2-digit'
          }) : '';

          const img = document.createElement('img');
          img.classList.add('icon');
          img.src = iconMap[wert];
          img.alt = `Wert ${wert}`;

          const p = document.createElement('p');
          p.classList.add('zeit');
          p.textContent = zeit;

          const wrapper = document.createElement('div');
          wrapper.classList.add('icon-wrapper');
          wrapper.appendChild(img);
          wrapper.appendChild(p);

          contentDiv.appendChild(wrapper);
        });

        section.appendChild(contentDiv);
        eintraegeContainer.appendChild(section);
      });
    })
    .catch(err => {
      console.error('Fehler beim Laden der Daten:', err);
      eintraegeContainer.textContent = 'Daten konnten nicht geladen werden.';
    });
});
