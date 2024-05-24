function slideToggle(element){
    const maxHeight = element.style.maxHeight;

    if(maxHeight == '0px' || maxHeight == ''){
        element.style.maxHeight = `${element.scrollHeight}px`;
    } else {
        element.style.maxHeight = '0px';
    }
}
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu')
    mobileBtn.addEventListener('click', () => {
        slideToggle(mobileMenu);
    })

const textIntro = document.getElementById('textIntro');
const textContent = document.getElementById('textContent');

textIntro.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = `${this.scrollHeight}px`;
    });

textContent.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`
});



