
//                                                                  !! LEARNING CURVE SCRIPT !!
// uncommment everything to reveal purpose

// $(function() {  // jQuarry get example for future use
//     $('a#getexample').on('click', function(e) {
//         e.preventDefault()
//         $.getJSON('/background_process_test',
//             function(data) {
//         //do nothing
//         });
//         return false;
//     });
// });

// $(function() {  // jQuarry post example for future use
//     $('a#postexample').on('click', function(e) {
//         e.preventDefault()
//         var txtinput = document.getElementById('txtinput');
//         $.post( "/postmethod", {
//             javascript_data: txtinput.value 
//         });
//         return false;
//     });
// });


// function do_ajax() {  // https://gist.github.com/KentaYamada/2eed4af1f6b2adac5cc7c9063acf8720 // for future use
//     var req = new XMLHttpRequest();
//     var result = document.getElementById('result');
//     req.onreadystatechange = function()
//     {
//       if(this.readyState == 4 && this.status == 200) {
//         result.innerHTML = this.responseText;
//       } else {
//         result.innerHTML = "処理中...";
//       }
//     }

//     req.open('POST', '/', true);
//     req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
//     req.send("name=" + document.getElementById('name').value);
//   }
