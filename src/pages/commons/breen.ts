import breen from '../../img/breen.jpg';

let Breen = function() {
    var v = document.createElement('img');
    var s = document.createElement('source');
    var z = document.createElement('div');
    var zs = z.style;
    var a = window.innerWidth * Math.random();
    var b = window.innerHeight * Math.random();
    z.classList.add("breen");
    z.appendChild(v);
    v.appendChild(s);
    v.width = 48;
    v.height = 70;
    v.src = breen;
    if (Math.random() > .5) v.className += 'rotate';
    let c = document.body.querySelector(".breen-container");
    if (c) c.appendChild(z);

    function R(o: number, m: number) {
        return Math.max(Math.min(o + (Math.random() - 0.5) * 400, m - 50), 50);
    }

    function A(){
        var x = R(a, window.innerWidth);
        var y = R(b, window.innerHeight);
        var d = Math.round(10 * Math.sqrt((a - x) * (a - x) + (b - y) * (b - y)));
        zs.opacity = "1";
        zs.transitionDuration = zs.webkitTransitionDuration = d + 'ms';
        // zs.transform = zs.webkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
        zs.left = x + 'px';
        zs.top = y + 'px';
        v.style.transform = v.style.webkitTransform = (a > x) ? '' : 'scaleX(-1)';
        a = x;
        b = y;
        setTimeout(A,d);
    }
    setTimeout(A, Math.random() * 3e3);
};

export default Breen;