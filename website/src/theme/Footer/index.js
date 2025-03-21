// src/theme/Footer/index.js
import React from 'react';
import OffchainLabsLogo from '@site/static/img/logo-white.png';

export default function Footer() {
  return (
    <footer class="nav-footer" id="footer">
        <a href="https://offchainlabs.com/"><img src={OffchainLabsLogo} alt="Offchain Labs" width="150" height="125" class="footerLogo"/></a>
        <section class="copyright">Copyright © 2025 Offchain Labs</section>
    </footer>
  );
}
