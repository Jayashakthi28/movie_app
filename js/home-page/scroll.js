let isDown=false;
let slider_cont=Array.from(document.querySelectorAll('.pop-movies-cont'));
let startX;
let scrollLeft;
slider_cont.forEach(data=>{
data.addEventListener('mouseup',()=>{
    isDown=false;
    data.style.cursor='initial';
});
data.addEventListener('mousedown',(e)=>{
    startX=e.pageX-data.offsetLeft;
    isDown=true;
    scrollLeft=data.scrollLeft;
    data.style.cursor='initial';
})
data.addEventListener('mouseleave',()=>{
    isDown=false;
    data.style.cursor='initial';
})
data.addEventListener('mousemove',(e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x=e.pageX-data.offsetLeft;
    const walk=(x-startX)*1;
    data.scrollLeft=scrollLeft-walk;
    data.style.cursor='grabbing';
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
            const j=slider_cont[index];
            (i===1)?(j.scrollLeft=j.scrollLeft-(j.scrollLeft%332)+332):(j.scrollLeft%332?j.scrollLeft=j.scrollLeft-(j.scrollLeft%332):j.scrollLeft=j.scrollLeft-(j.scrollLeft%332)-332);
        })
    })
})