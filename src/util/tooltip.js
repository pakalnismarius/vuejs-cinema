import { addClass, removeClass } from './helpers.js';

let mouseOverHandler = function (event) {
  let span = event.target.parentNode.getElementsByTagName("SPAN")[0];
  addClass(span, 'tooltip-show');
};

let mouseOutHandler = function (event) {
  let span = event.target.parentNode.getElementsByTagName("SPAN")[0];
  removeClass(span, 'tooltip-show');
};

export default {
  install(Vue) {
    Vue.directive('tooltip', {
      bind(el, bindings) {
        let span = document.createElement('SPAN');
        let text = document.createTextNode(`Seats aveilable: ${bindings.value.seats}`);
        addClass(span, 'tooltip');
        span.appendChild(text);
        el.appendChild(span);
        let div = el.getElementsByTagName('DIV')[0];
        div.addEventListener('mouseover', mouseOverHandler);
        div.addEventListener('mouseout', mouseOutHandler);
        div.addEventListener('touchstart', mouseOverHandler);
        div.addEventListener('touchend', mouseOutHandler);
      },
      unbind(el) {
        let div = el.getElementsByTagName('DIV')[0];
        div.removeEventListener('mouseover', mouseOverHandler);
        div.removeEventListener('mouseout', mouseOutHandler);
        div.removeEventListener('touchstart', mouseOverHandler);
        div.removeEventListener('touchend', mouseOutHandler);
      }
    })
  }
}
