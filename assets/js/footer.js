/* Footer script*/

class MainFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<footer class="social-footer">
		      <a href="https://instagram.com/theroundercircle" aria-label="Instagram"
		      target="_blank"
		      rel="noopener noreferrer">
		      <i class="fab fa-instagram"></i>
		    </a>
		      <a href="https://www.tiktok.com/@theroundercircle" aria-label="TikTok"
			target="_blank"
			rel="noopener noreferrer">
			<i class="fab fa-tiktok"></i>
		    </a>
		      <a href="https://music.apple.com/us/artist/the-rounder-circle/1869651207" aria-label="Apple Music"
		        target="_blank"
			rel="noopener noreferrer">
			<i class="fab fa-itunes"></i>
		    </a>
		      <a href="https://open.spotify.com/artist/5ahm3pykpH08nU4nfKUt9E" aria-label="Spotify"
		        target="_blank"
			rel="noopener noreferrer">
			<i class="fab fa-spotify"></i>
		    </a>
		      <a href="https://www.youtube.com/@TheRounderCircle" aria-label="YouTube"
                       target = "_blank"
		       rel="noopener noreferrer">
		      <i class="fab fa-youtube"></i>
		    </a>

			<!-- California poppies graphic -->
		    <img
		      src="assets/images/calpoppies.png"
		      alt="Illustration of California poppies"
		      class="footer-graphic"
		    />
		    <p>&copy; 2025 The Rounder Circle</p>
		</footer>`;	
	}
}
  
customElements.define('main-footer', MainFooter);

