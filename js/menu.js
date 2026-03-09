document.addEventListener('DOMContentLoaded', ()=>{
    const nav = document.getElementById('nav')
    const bMenu = document.getElementById('b-menu')

    function actionClick(){
        
    }

    const rightArrow = document.getElementById('right-arrow')
    rightArrow.addEventListener('click', ()=> {
        console.log('click right arrow')
        bMenu.classList.toggle('opacity-0')
        bMenu.classList.toggle('pointer-events-none');
        nav.classList.toggle('fixed')
    })
    


    const leftArrow = document.getElementById('left-arrow')
    leftArrow.addEventListener('click', ()=> {
        console.log('click left arrow')
        bMenu.classList.toggle('opacity-0')
        bMenu.classList.toggle('pointer-events-none');
        nav.classList.toggle('fixed')
    })
})