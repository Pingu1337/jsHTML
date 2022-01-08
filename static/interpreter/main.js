

window.addEventListener('load', (event) => {
    var jshtml = document.createElement('script');
    jshtml.src = '{{ url_for(\'static\',filename=\'interpreter/renderer.js\') }}';
    document.head.appendChild(jshtml);
});



