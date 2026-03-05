document.addEventListener('DOMContentLoaded', () => {
    const cookies = document.getElementById('cookies')
    const aceptCookiesBtn = document.getElementById('acept-cookies-btn')
    const rejectCookiesBtn = document.getElementById('reject-cookies-btn')

    //cookies.showModal()


    aceptCookiesBtn.addEventListener('click', () => {
        cookies.close()
    })

    rejectCookiesBtn.addEventListener('click', () => {
        cookies.close()
    })
})