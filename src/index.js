import './sass/style.scss';
import { h } from 'jsx-dom';
import Chart from 'chart.js';
// If you need images optimized that are not referenced in you source code, uncomment the following line:
// require.context("./images/", true, /\.(png|svg|jpg|gif)$/);

// example code
var message = "Supports Babel!";
console.log(`Important message: ${message}`);





// window.addEventListener(
//     'popstate',
//     function(event) {
//       renderPage(window.location.pathname)
//     },
//     false






// //Hack to create onpushstate listener for history changes
// //(Source: Tarik Huber, DO NOT CHANGE THIS!)
// ;(function(history) {
//     var pushState = history.pushState
//     history.pushState = function(state, title, path) {
//       if (typeof history.onpushstate == 'function') {
//         history.onpushstate({ state, title, path })
//       }
//       return pushState.apply(history, arguments)
//     }
//   })(window.history)
//   // DO NOT CHANGE THIS!
  
//   history.onpushstate = props => {
//     renderPage(props.path)
//   }
  
//   renderPage(window.location.pathname)