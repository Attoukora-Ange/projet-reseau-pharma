window.onload = ()=>{
    const BarreNavigation = document.querySelector('.navigation');
   const Utilisateur = document.querySelector('#utilisateur');
   const SousMenu = document.querySelector('#sous-menu');
   Utilisateur.addEventListener('click', (e)=>{
       SousMenu.classList.toggle('sous-menu-toggle');
   }) 

   BarreNavigation.addEventListener('scroll', (e)=>{
    console.log(e)
   })
}
