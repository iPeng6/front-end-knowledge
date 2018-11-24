window.$docsify.plugins.push(function(hook, vm) {
  hook.doneEach(function(html, next) {
    // Invoked each time after the Markdown file is parsed.
    // beforeEach and afterEach support asynchronous。
    // ...
    // call `next(html)` when task is done.
    var el = document.querySelector('.sidebar-nav .active')
    while (el && el.className !== 'sidebar-nav') {
      if (el.parentElement.tagName === 'LI') {
        el.parentElement.className = 'open'
      }
      el = el.parentElement
    }

    next(html)
  })
})
