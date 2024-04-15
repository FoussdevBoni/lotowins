import React from 'react';

export function getUrlSegment(index) {
  const paths = window.location.pathname.split('/')
  return paths[index]

}

