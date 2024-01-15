import React from 'react';
import styles from './PageNotFound.module.css';

/*

  Creates the page that is displayed when the user has entered an invalid URL.

*/
 
function NotFound(props) {
 return (
    <div className={styles.container}>
      <h1>Page not found :/</h1>
    </div>
 );
}
 
export default NotFound;