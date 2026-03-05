export async function addToCart(cart, bike) {
    const existingBike = cart.find(b => b.id == bike.id);

    if (existingBike) {
        existingBike.quantity++;
    } else {
        bike.quantity = 1;
        bike.img = await imageToBase64(bike.img);
        cart.push(bike);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Carrito actualizado:", cart);
}

async function imageToBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}