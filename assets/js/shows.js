// Helper to parse YYYY-MM-DD as a local date
function parseLocalDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // JS months are 0-indexed
  }
  
  async function loadShows() {
    try {
      const response = await fetch('assets/js/shows.json');
      const shows = await response.json();
  
      const today = new Date();
      today.setHours(0, 0, 0, 0); // strip time
  
      // Parse dates as local
      const upcoming = shows.filter(s => parseLocalDate(s.date) >= today);
      const past = shows.filter(s => parseLocalDate(s.date) < today);
  
      // Sort
      upcoming.sort((a, b) => parseLocalDate(a.date) - parseLocalDate(b.date));
      past.sort((a, b) => parseLocalDate(b.date) - parseLocalDate(a.date));
  
      // Render: links only for upcoming shows
      renderShows(upcoming, document.getElementById('upcoming-shows'), true);
      renderShows(past, document.getElementById('past-shows'), false);
    } catch (err) {
      console.error('Error loading shows:', err);
    }
  }
  
  function renderShows(list, container, showLinks) {
    container.innerHTML = list.map(show => {
      const showDate = parseLocalDate(show.date);
      return `
        <li>
          <div class="show-datetime">
            <span class="show-date">${showDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            ${show.time ? `<span class="show-time">· ${show.time}</span>` : ''}
          </div>
          <span class="show-venue">${show.venue}</span>
          ${showLinks && show.link ? `
            <span class="show-event">
              <a href="${show.link}" target="_blank" rel="noopener noreferrer">${show.event || 'Tickets'}</a>
            </span>` : ''}
          <span class="show-location">${show.location}</span>
        </li>
      `;
    }).join('');
  }
  
  
  loadShows();  
