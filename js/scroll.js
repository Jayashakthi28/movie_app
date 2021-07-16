let isDown=false;
let slider_cont=Array.from(document.querySelectorAll('.pop-movies-cont'));
let startX;
let scrollLeft;
slider_cont.forEach(data=>{
data.addEventListener('mouseup',()=>{
    isDown=false;
});
data.addEventListener('mousedown',(e)=>{
    console.log(e);
    startX=e.pageX-data.offsetLeft;
    console.log(startX);
    isDown=true;
    scrollLeft=data.scrollLeft;
    // console.log({x,startX});
})
data.addEventListener('mouseleave',()=>{
    isDown=false;
})
data.addEventListener('mousemove',(e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x=e.pageX-data.offsetLeft;
    const walk=(x-startX)*2;
    data.scrollLeft=scrollLeft-walk;
})
data.addEventListener('touchstart',(e)=>{
    startX=e.touches[0].pageX-data.offsetLeft;
    isDown=true;
    scrollLeft=data.scrollLeft;
});
data.addEventListener('touchend',()=>{
    isDown=false;
})
data.addEventListener('touchleave',()=>{
    isDown=false;
})
data.addEventListener('touchmove',(e)=>{
    if(!isDown) return;
    const x=e.touches[0].pageX-data.offsetLeft;
    console.log({x,startX});
    const walk=(Math.ceil(x)-startX);
    data.scrollLeft=scrollLeft-walk;
})
data.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}
});
const arrow_cont=document.querySelectorAll('.arrow-cont');
arrow_cont.forEach((arrow,index)=>{
    const data=arrow.querySelectorAll('img');
    data.forEach((d,i)=>{
        d.addEventListener('click',
        (e)=>{
            console.log(e);
            console.log(i);
            (i===1)?slider_cont[index].scrollLeft+=100:slider_cont[index].scrollLeft-=100;
        })
    })
})