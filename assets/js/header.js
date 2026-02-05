/* Header script*/

class MainHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<header class="site-header">
		    <div class="brand">
		      <a href="index.html">
			<img src="assets/images/front.png" alt="The Rounder Circle" class="header-logo">
		      </a>
		    </div>
		    <button class="menu-toggle" aria-label="Open menu" onclick="toggleMenu()">
		      <span class="bar"></span>
		      <span class="bar"></span>
		      <span class="bar"></span>
		    </button>
		    <nav class="menu-bar">
		      <ul>
			<li><a href="index.html">Home</a></li>
			<li><a href="about.html">About</a></li>
			<li><a href="contact.html">Contact</a></li>
			<li><a href="shows.html">Shows</a></li>
			<li>
			  <a
			    href="https://the-rounder-circle-shop.fourthwall.com"
			    target="_blank"
			    rel="noopener noreferrer"
			  >
			    Merch
			  </a>
			</li>
			<li><a href="videos.html">Videos</a></li>
			<li><a href="epk.html">EPK</a></li>
		      </ul>
		    </nav>
		  </header>
		  <div class="header-banner">
		    <p> New Music Out Now! <a href="https://ffm.to/californiabound/" target=_blank rel="noopener noreferrer">Listen here!
		  </div>`;
		
		const currentPath = window.location.pathname.split("/").pop() || "index.html";
		const navLinks = this.querySelectorAll('.menu-bar a');

		navLinks.forEach(link => {
			const linkPath = link.getAttribute('href');
			if (linkPath === currentPath) {
				link.classList.add('active');
			}
		});
		
		// Banner timer
		setTimeout(() => {
			const banner = this.querySelector('.header-banner');
			if (banner) {
				banner.style.display = 'none';
			}
		}, 60000);
	}
}
  
customElements.define('main-header', MainHeader);

function toggleMenu() {
	const menu = document.querySelector('.menu-bar');
	menu.classList.toggle('active');
}

