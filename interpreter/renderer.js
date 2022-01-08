RenderPage();


window.addEventListener('hashchange', function(){
RenderPage();
});


  

function RenderPage(){
    var path = document.location.href;

    if(path.includes('#')){
        path = path.split('#');
    
        currPage = path[1];
    }
    else{
        currPage = 'index'
    }

    fetch('/pages/'+currPage+'.jshtm')
    .then(response => response.ok)
    .then((data) => {
        if(data == false){
            currPage = '404';
        }
    console.log(currPage)});

    if(currPage == ''){
        currPage = 'index';
    }
    //log
    console.log(currPage);
    //

    // TODO 404 CATCH
    
    fetch('/pages/'+currPage+'.jshtm')
    .then(response => response.text())
    .then((data) => {
    var jshtmlData = data;
    var element = document.createElement('div');
    element.setAttribute("id", "jsMain-content")
    element.innerHTML = jshtmlData;
    var Parent = document.getElementById('jsMain-content');
    var Child = document.getElementById('jsRenderRoot-Child');
    
    Parent.replaceWith(element, Child);
    });
    
}

