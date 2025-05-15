document.addEventListener('DOMContentLoaded', () => {
  const eintraegeContainer = document.querySelector('section.eintraege');
  eintraegeContainer.innerHTML = '';

  const iconMap = {
    1: 'assets/Ausrufezeichen.png',
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

        const slotZeiten = [
          { label: '09:00', stunde: 9 },
          { label: '12:00', stunde: 12 },
          { label: '15:00', stunde: 15 },
          { label: '19:00', stunde: 19 }
        ];

        const slotMap = {
          '09:00': null,
          '12:00': null,
          '15:00': null,
          '19:00': null
        };

        eintraege.forEach(item => {
          if (!item.wert || !iconMap[item.wert] || !item.zeit) return;

          const zeitObj = new Date(item.zeit);
          const stunde = zeitObj.getHours();

          const slot = slotZeiten.find(s => s.stunde === stunde);
          if (!slot) return;

          slotMap[slot.label] = { wert: item.wert, zeit: zeitObj };
        });

        slotZeiten.forEach(slot => {
          const eintrag = slotMap[slot.label];

          let imgSrc, imgAlt, zeitText;

          if (eintrag) {
            imgSrc = iconMap[eintrag.wert];
            imgAlt = `Wert ${eintrag.wert}`;
            zeitText = eintrag.zeit.toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit'
            });
          } else {
            imgSrc = 'assets/Fragezeichen.png';
            imgAlt = 'Noch kein Eintrag';
            zeitText = slot.label;
          }

          const img = document.createElement('img');
          img.classList.add('icon');
          img.src = imgSrc;
          img.alt = imgAlt;

          const p = document.createElement('p');
          p.classList.add('zeit');
          p.textContent = zeitText;

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
