((d, w, c, ls) => {
  const menu = d.getElementById("showmenu"),
    menuContainer = d.getElementById("menu-container"),
    menuAcordeon = d.getElementById('menu-acordeon'),
    text_menu = new Array(
      //['#/','#/'],
      ['#/5','#/6/6'],
      ['#/7','#/8/12'],
      ['#/9','#/11','label-icon-1'],
      ['#/15','#/17/6'],
      ['#/22','#/28'],
      ['#/29','#/31'],
      ['#/32','#/34/11','label-icon-2'],
      ['#/39','#/52'],
      ['#/53','#/55'],
      ['#/55','#/62'],
      ['#/63','#/66','label-icon-3'],
      ['#/69','#/74'],
      ['#/75','#/91'],
      ['#/92','#/95','label-icon-4'],
      ['#/97','#/97','label-icon-5']
    );
    let url_save = [],
    url_obj = {},
    draw_save = [],
    draw_obj={}
    label_save=[],
    label_obj={};


   menu.addEventListener('click', () => {
    menuContainer.classList.toggle('onscreen')
    menu.classList.toggle('closemenu')
    menuAcordeon.classList.toggle('opacidad')
  });

  function totalCurso(){
    const aSuma = d.getElementById('menu-acordeon').querySelectorAll('a').length,
    inpSuma = d.getElementById('menu-acordeon').querySelectorAll('label').length,
    elem = d.getElementById("barra"),
    valor1 = d.querySelectorAll('.ok').length / ( parseInt(aSuma) + parseInt(inpSuma) );
    elem.innerHTML = Math.ceil(valor1*100)+"%";
    elem.style.width = Math.ceil(valor1*100)+"%";
  }


  d.addEventListener('click', (e) => {
    if( e.target.nodeName === "BUTTON" || e.target.nodeName == 'BUTTON') {
      let url = location.href,
      dataObject = [];

      if (ls.getItem('dataObject') && ls.getItem('dataObject').length > 0) {
          dataObject = JSON.parse(ls.getItem('dataObject'));
      }
      c(e.target.className)

      //TODO: nuevo
      if(
        (e.target.className=='navigate-right enabled' || e.target.className == "navigate-right enabled") ||
        (e.target.className=='navigate-right highlight enabled' || e.target.className=="navigate-right highlight enabled") ||
        (e.target.className=='navigate-down enabled' || e.target.className == "navigate-down enabled") ||
        (e.target.className=='navigate-down' || e.target.className=="navigate-down")
      ){
        let present =  d.querySelector('section.present')
        , has_data_id = present.getAttribute('data-id')
        , data_previous_indexv = present.getAttribute('data-previous-indexv')
        , count_previous_indexv = present.querySelectorAll('section');

        let block = false;
        let path = null;
        let _ok = false;
        for(var i in dataObject ) {
          if(dataObject[i].previous == url){
            dataObject[i].previous_view=true;
            _ok = true;
            ls.removeItem("dataObject");
            break;
          }

          if(!dataObject[i].previous_view && !_ok) {
            path = ls.getItem('url');
            block = true;
            break;
          }
        }
        //c(path)

        if(_ok) {
          ls.setItem('dataObject', JSON.stringify(dataObject));
          //c(dataObject)
        }

        if(block && (
          (e.target.className=='navigate-right enabled' || e.target.className == "navigate-right enabled") ||
          (e.target.className=='navigate-right highlight enabled' || e.target.className=="navigate-right highlight enabled")
          )
        ) {
          alert('Flatan visualizar algunas presentaciones!!');
          location.href = path;
          return false;
        }

        let searching_between_url = ( dataObject.find(el => el.url === url) ? true : false);
        if( !searching_between_url && (
          (e.target.className=='navigate-right enabled' || e.target.className == "navigate-right enabled" ) ||
          (e.target.className=='navigate-right highlight enabled' || e.target.className=="navigate-right highlight enabled")
          )
        ) {
          //c("Solo arrowrigth y no existente")
          let replace_url = url;
          let object_local = {
              url: url,
              view: true,
              section_id:has_data_id,
              data_previous:data_previous_indexv,
              previous: (parseInt(count_previous_indexv.length) > 1) ? replace_url+='/'+parseInt(count_previous_indexv.length-1) : 0,
              previous_view: (parseInt(count_previous_indexv.length) > 1) ? false : true
          }

          dataObject.push(object_local);
          ls.setItem('dataObject', JSON.stringify(dataObject));
          //c(dataObject)
        }

        //TODO: obteniendo listado de vistas a nivel general
        if (ls.getItem('url_save') && ls.getItem('url_save').length > 0) {
            url_save = JSON.parse(ls.getItem('url_save'));
        }
        //c(url_save)
        let _switch = false;
        for(var i in url_save) {
          if(url_save[i] == url) {
            _switch = true;
          }
        }

        //c(_switch)

        if(!_switch) {
          url_obj=url;
          url_save.push(url_obj);
          ls.setItem('url_save', JSON.stringify(url_save));
          ls.setItem("url", url);
          draw(url, 'a');
        }
        //c(ls.url)
        //TODO: end obteniendo listado de vistas a nivel general
      }
      //TODO: end nuevo
    }

  });

  d.addEventListener('keyup', (e) => {
    if( e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40' ) {
      let url = location.href,
      dataObject = [];

      if (ls.getItem('dataObject') && ls.getItem('dataObject').length > 0) {
          dataObject = JSON.parse(ls.getItem('dataObject'));
      }

      c(e.code)

      //TODO: nuevo
      if(
        (e.code=='ArrowRight' || e.code == "ArrowRight") ||
        (e.code=='ArrowDown' || e.code == "ArrowDown")
      ){
        let present =  d.querySelector('section.present')
        , has_data_id = present.getAttribute('data-id')
        , data_previous_indexv = present.getAttribute('data-previous-indexv')
        , count_previous_indexv = present.querySelectorAll('section');

        let block = false;
        let path = null;
        let _ok = false;
        for(var i in dataObject ) {
          if(dataObject[i].previous == url){
            //c(dataObject[i].previous, url)
            dataObject[i].previous_view=true;
            _ok = true;
            ls.removeItem("dataObject");
            break;
          }

          if(!dataObject[i].previous_view && !_ok) {
              path = ls.getItem('url');
              block = true;
              break;
          }
        }
        //c(path)
        if(_ok) {
          ls.setItem('dataObject', JSON.stringify(dataObject));
          //c(dataObject)
        }

        if(block && (e.code=='ArrowRight' || e.code == "ArrowRight") ) {
          alert('Flatan visualizar algunas presentaciones!!');
          location.href = path;
          return false;
        }

        let searching_between_url = ( dataObject.find(el => el.url === url) ? true : false);
        if(!searching_between_url && (e.code=='ArrowRight' || e.code == "ArrowRight" ) ) {
          //c("Solo arrowrigth y no existente")
          let replace_url = url;
          let object_local = {
              url: url,
              view: true,
              section_id:has_data_id,
              data_previous:data_previous_indexv,
              previous: (parseInt(count_previous_indexv.length) > 1) ? replace_url+='/'+parseInt(count_previous_indexv.length-1) : 0,
              previous_view: (parseInt(count_previous_indexv.length) > 1) ? false : true
          }

          dataObject.push(object_local);
          ls.setItem('dataObject', JSON.stringify(dataObject));
          //c(dataObject)
        }

        //TODO: obteniendo listado de vistas a nivel general
        if (ls.getItem('url_save') && ls.getItem('url_save').length > 0) {
            url_save = JSON.parse(ls.getItem('url_save'));
        }
        //c(url_save)
        let _switch = false;
        for(var i in url_save) {
          if(url_save[i] == url) {
            _switch = true;
          }
        }

        //c(_switch)
        if(!_switch) {
          url_obj=url;
          url_save.push(url_obj);
          ls.setItem('url_save', JSON.stringify(url_save));
          ls.setItem("url", url);
          draw(url, 'a');
        }
        //c(ls.url)
        //TODO: end obteniendo listado de vistas a nivel general
      }
      //TODO: end nuevo
      //totalCurso()
    }
  });

  let url = location.href;
  let draw = function (a, flag) {
    if (ls.getItem('draw_menu') && ls.getItem('draw_menu').length > 0) {
      draw_save = JSON.parse(ls.getItem('draw_menu'));
    }

    if (ls.getItem('label') && ls.getItem('label').length > 0) {
      label_save = JSON.parse(ls.getItem('label'));
    }

    if(flag == "n") {
      let init = a.querySelectorAll('li')[0];
      let init_a = init.querySelectorAll('i')[0];
      init_a.className = 'fa fa-check-circle far ok';
      draw_obj=init.querySelector('a').hash;
      draw_save.push(draw_obj);
      ls.setItem('draw_menu', JSON.stringify(draw_save));
    } else if(flag == "r") {
      let explode = a.querySelectorAll('a');
      for(let a in explode) {
        let _hash = explode[a].hash;
        for(let i in draw_save) {
          if (draw_save[i] == _hash) {
            let _icon = explode[a].querySelector('i');
            _icon.className='fa fa-check-circle far ok';
          }
        }
      }

      if(ls.label){
        for(let x in label_save) {
          let label = document.getElementById(label_save[x])
          label.className='fa fa-check-circle far ok';
        }
      }
    } else {
      let pathname = new URL(a).hash;
      c(pathname)
      for( let i in text_menu) {
        let size = text_menu[i].length;
        if(size> 2) {
          if(pathname == text_menu[i][size-2]) {
            for( let z in menuAcordeon.querySelectorAll('a') ) {
              let __icon = menuAcordeon.querySelectorAll('a')[z];
              if(__icon.hash== text_menu[i][size-3]) {
                  //c(__icon.hash, text_menu[i][size-3])
                  let draw_first = __icon.querySelectorAll('i')[0];
                  //c(draw_first)
                  //c(text_menu[i][size-1])
                  draw_first.className='fa fa-check-circle far ok';
                  let label = document.getElementById(text_menu[i][size-1])
                  //c(label)
                  label.className='fa fa-check-circle far ok';

                  draw_obj=__icon.hash;
                  draw_save.push(draw_obj);
                  ls.setItem('draw_menu', JSON.stringify(draw_save));


                  label_obj=text_menu[i][size-1];
                  label_save.push(label_obj)
                  ls.setItem('label', JSON.stringify(label_save));
              }
            }
          }
        } else {
          if(pathname == text_menu[i][size-1]) {
            for( let z in menuAcordeon.querySelectorAll('a') ) {
              let __icon = menuAcordeon.querySelectorAll('a')[z];
              if(__icon.hash== text_menu[i][size-2]) {
                  let draw_first = __icon.querySelectorAll('i')[0];
                  draw_first.className='fa fa-check-circle far ok';

                  draw_obj=__icon.hash;
                  draw_save.push(draw_obj);
                  ls.setItem('draw_menu', JSON.stringify(draw_save));
              }
            }
          }
        }
      }
      totalCurso();
    }
  }

  if(ls.url) {
    location.href = ls.url;
    draw(menuAcordeon, 'r');
  } else {
    url_obj=url;
    url_save.push(url_obj);
    ls.setItem('url_save', JSON.stringify(url_save));
    ls.setItem("url", url);
    draw(menuAcordeon, 'n');
  }

  d.querySelector('.progress').setAttribute('style', 'display: block; pointer-events: none;');
  d.querySelector('.slides').setAttribute('class', 'slides not-selectable');
  d.querySelector('body').setAttribute('oncontextmenu', 'return false;');
  d.querySelector('body').setAttribute('onselectstart', 'return false;');
  d.querySelector('body').setAttribute('oncopy', 'return false;');
  totalCurso();

  w.addEventListener('hashchange', (e) => {
      w.location.href = ls.url;
  });

})(document, window, console.log, localStorage);