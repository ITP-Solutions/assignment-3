import React from 'react';
import './Loader.css';

/**
 * Loader component
 * 
 * @param props.active - true to display, false otherwise
 */
export default function Loader({ active }) {
  return <div id="loading-details" className="loader" hidden={!active}>Loading...</div>
}