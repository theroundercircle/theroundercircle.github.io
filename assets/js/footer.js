/* Footer script*/

class MainFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<footer class="social-footer">
		    <a href="https://instagram.com/theroundercircle" aria-label="Instagram">
		      <i class="fab fa-instagram"></i>
		    </a>
			<a href="https://soundcloud.com/the-rounder-circle" aria-label="SoundCloud">
		      <i class="fab fa-soundcloud"></i>
		    </a>
		    <a href="https://www.youtube.com/@TheRounderCircle" aria-label="YouTube">
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

