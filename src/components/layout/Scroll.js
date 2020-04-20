import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default function Scroll({ children, autoHeight = false }) {
  const handleScroll = (e) => {
    // console.log(e);
  };

  const handleScrollFrame = (e) => {
    e.top >= 0.99 && console.log(e.top);
  };

  const styles = {
    width: '100%',
    height: '100%',
    margin: autoHeight ? '0.7rem 0' : '',
  };

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      onScroll={handleScroll}
      onScrollFrame={handleScrollFrame}
      style={styles}
      autoHeight={autoHeight}
    >
      {children}
    </Scrollbars>
  );
}
