window.$docsify.plugins = window.$docsify.plugins || [];

window.$docsify.plugins.push(function(hook, vm) {
  hook.doneEach(function(html, next) {
    var el = document.querySelector('.sidebar-nav .active');
    while (el && el.className !== 'sidebar-nav') {
      if (el.parentElement.tagName === 'LI') {
        el.parentElement.className = 'open';
      }
      el = el.parentElement;
    }
    next(html);
  });
});
