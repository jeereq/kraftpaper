window.onload=function(){

    let allLiens=document.querySelectorAll('header ul li a');


    allLiens.forEach(lien=>{
        lien.addEventListener('click',selectLienActive)
    })
}

selectLienActive=(event)=>{
    let moi=event.target.parentNode;
    if(!moi.classList.contains('active')){
        let parent =moi.parentNode;
        parent.querySelector('li.active').classList.remove('active');
        moi.classList.add(("active"));     
    }  
}