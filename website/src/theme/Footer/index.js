// src/theme/Footer/index.js
import React from 'react';
import OffchainLabsLogo from '@site/static/img/logo-white.png';

export default function Footer() {
  return (
    <footer class="nav-footer" id="footer">
        <section class="sitemap">
           <div>
            <h5>Docs</h5>
            <a href="getting-started">Developer Quickstart</a>
           </div>
           <div>
            <h5>Community</h5>
            <a href="https://offchainlabs.com/">Offchain Labs</a>
            <a href="https://medium.com/OffchainLabs">Blog</a>
            <a href="https://twitter.com/OffchainLabs">Twitter</a>
           </div>
           <div>
            <h5>More</h5>
            <a href="https://medium.com/OffchainLabs">Blog</a>
            <a href="https://github.com/OffchainLabs">GitHub</a>
            <a href="https://www.iubenda.com/privacy-policy/76750372" class="iubenda-nostyle no-brand iubenda-embed" title="Privacy Policy">Privacy Policy</a>
            <a href="https://www.iubenda.com/privacy-policy/76750372/cookie-policy" class="iubenda-nostyle no-brand iubenda-embed" title="Cookie Policy ">Cookie Policy</a>
           </div>
        </section>
        <a href="https://offchainlabs.com/"><img src={OffchainLabsLogo} alt="Offchain Labs" width="150" height="125" class="footerLogo"/></a>
        <section class="copyright">Copyright © 2025 Offchain Labs</section>
    </footer>
  );
}
