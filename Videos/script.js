((d, w, c) => {

  d.querySelector('body').setAttribute('oncontextmenu', 'return false;');
  d.querySelector('body').setAttribute('onselectstart', 'return false;');
  d.querySelector('body').setAttribute('oncopy', 'return false;');

})(document, window, console.log);
