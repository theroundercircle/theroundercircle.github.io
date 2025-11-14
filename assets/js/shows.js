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
    // If it's past shows, group by venue
    if (!showLinks) {
      const groupedByVenue = {};
      list.forEach(show => {
        if (!groupedByVenue[show.venue]) {
          groupedByVenue[show.venue] = [];
        }
        groupedByVenue[show.venue].push(show);
      });

      container.innerHTML = Object.entries(groupedByVenue).map(([venue, shows]) => {
        const parsedDates = shows.map(show => parseLocalDate(show.date));
        const years = new Set(parsedDates.map(d => d.getFullYear()));
        const sameYear = years.size === 1;

        let datesList;
        if (sameYear) {
          // Group by month within the same year
          const byMonth = {};
          shows.forEach((show, index) => {
            const showDate = parsedDates[index];
            const month = showDate.toLocaleDateString('en-US', { month: 'short' });
            if (!byMonth[month]) byMonth[month] = [];
            byMonth[month].push(showDate.getDate());
          });

          const monthStrs = Object.entries(byMonth).map(([month, days]) => {
            return `${month} ${days.join(', ')}`;
          }).join(', ');

          datesList = monthStrs + ', ' + parsedDates[0].getFullYear();
        } else {
          // If dates span multiple years, group by month/year
          const byMonthYear = {};
          shows.forEach((show, index) => {
            const showDate = parsedDates[index];
            const monthYear = showDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            if (!byMonthYear[monthYear]) byMonthYear[monthYear] = [];
            byMonthYear[monthYear].push(showDate.getDate());
          });

          datesList = Object.entries(byMonthYear).map(([monthYear, days]) => {
            return `${monthYear.split(' ')[0]} ${days.join(', ')}, ${monthYear.split(' ')[1]}`;
          }).join(', ');
        }

        return `
          <li>
            <div class="show-datetime">
              <span class="show-date">${datesList}</span>
            </div>
            <span class="show-venue">${venue}</span>
            <span class="show-location">${shows[0].location}</span>
          </li>
        `;
      }).join('');
    } else {
      // For upcoming shows, render normally
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
  }
  
  
  loadShows();  
