

function extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  function extractTags(a) {
    var temp = document.createElement("div");
    temp.innerHTML = a;
   
    var all = temp.getElementsByTagName("*");
    var tags = [];
    for (var i = 0, max = all.length; i < max; i++) {       
      var tagname = all[i].tagName;
      var cl = all[i].className;
      var id = all[i].id;
      //if (tags.indexOf(tagname) == -1) {
          tagclass = tagname + ',' + cl +','+ id;
        tags.push(tagclass);
      //}
    }
    return(tags);
  }


fetch('/Tests/html/testfile.jshtml')
    .then(response => response.text())
    .then((data) => {
    var jshtmlData = data;

    var classes = []; // empty array
    var classSplit = jshtmlData.replace(/class=['"][^'"]+/g, function(m){
        classes = classes.concat(m.match(/[^'"]+$/)[0].split(' ')); 
    }); // take all classes

    classes = classes.filter(function(item, pos) {
        return classes.indexOf(item) == pos;
    }); // return unique classes
    

    contentArr = jshtmlData.split('<style>')
    content = extractContent(contentArr[0]).trim();
    // console.log(content);

    var tagclass = extractTags(contentArr[0]);
    tagArr = [];
    classArr = [];
    idArr = [];
    for (let i = 0; i < tagclass.length; i++){
       tempArr = tagclass[i].split(',')
       tagArr[i] = tempArr[0];
       classArr[i] = tempArr[1];
       idArr[i] = tempArr[2];
    }
    console.log('tagArr: ' + tagArr);
    console.log('classArr: ' + classArr);
    console.log('idArr: ' + idArr);

    var c = [];

    if(classArr[0] == '' && idArr[0] != ''){
        console.log('classArr root is null | root element set to \"' + idArr[1] + '\"')
        rootElement = document.querySelector('#'+idArr[1]);
    }
    else if(idArr[0] == '' && classArr[0] != ''){
        console.log('idArr root is null | root element set to \"' + classArr[1] + '\"');
        rootElement = document.querySelector('.'+classArr[1]);
    }

    

    var newElement = document.createElement(tagArr[0]);
    console.log(rootElement.parentNode)
    newElement.innerHTML = jshtmlData;

        rootElement.parentNode.replaceWith(newElement);

    

    //rootElement.replaceWith(newElement)

    // for (let i = 0; i < classes.length; i++) {
        
    //     c[i] = document.querySelector('.'+classes[i]);
    //     console.log(c);
    //     var newElement = document.createElement(tagArr[i]);
    //     //newElement.innerHTML = jshtmlData;
    //     c[i].replaceWith(newElement);
    // }

    // var element = document.createElement('div');
    // element.innerHTML = jshtmlData;
    // var currentDiv = document.getElementById('ftr');
    // document.body.insertBefore(element, currentDiv);
}); 

