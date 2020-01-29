import React from 'react';

import DesktopContainer from './DesktopContainer';

export default function Layout({ children }) {
  return (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
    </div>
  );
}
