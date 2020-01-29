import React from 'react';

import DesktopContainer from './DesktopContainer';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      {/* <Footer /> */}
    </div>
  );
}
