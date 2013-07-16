Reword
======

Add a bookmarklet with the code below.

```
javascript:(function(){
var g=document.createElement('script'),s=document.scripts[0];
g.src='//rawgithub.com/timrwood/reword/master/reword.js';
s.parentNode.insertBefore(g,s);})()
```
