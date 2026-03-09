export const sharedState = {
    get cart(){
        return JSON.parse(localStorage.getItem('cart')) || []
    },
    set cart(value){
        localStorage.setItem('cart', JSON.stringify(value))
        window.dispatchEvent(new Event('storage-local'));
    
    }
    

}