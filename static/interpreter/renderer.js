RenderPage();


window.addEventListener('hashchange', function(){
RenderPage();
});

var fourofour;

fetch('/static/pages/404.jshtm')
.then(response => response.text())
.then((data_404) =>{ fourofour = data_404});
  

function RenderPage(){
    var path = document.location.href;

    if(path.includes('#')){
        path = path.split('#');
    
        currPage = path[1];
    }
    else{
        currPage = 'index'
    }

    if(currPage == ''){
        currPage = 'index';
    }
    //log
    //console.log(currPage);
    //
    var jshtmlData;
    fetch('/static/pages/'+currPage+'.jshtm')
    .then(response => response.text())
    .then((data) => { 
        if(data.includes('<title>404 Not Found</title>')){
            jshtmlData = fourofour;
        }
        else{
            jshtmlData = data;
        }
    
    var element = document.createElement('div');
    element.setAttribute("id", "jsMain-content")
    element.innerHTML = jshtmlData;
    var Parent = document.getElementById('jsMain-content');
    var Child = document.getElementById('jsRenderRoot-Child');
    
    Parent.replaceWith(element, Child);
    console.log(jshtmlData);
    });
    
}

