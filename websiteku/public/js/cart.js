const payBtn = document.querySelector('.btn-buy');
payBtn.addEventListener('click', () => {
    fetch('/stripe-checkout', {
        method: 'post',
        headers: new Headers({"Content-type" : 'application/json'}),
        body: JSON.stringify({
        items: JSON.parse(localStorage.getItem('cartItems')),
        }),
    })
    .then((res) => {
        // Tampilkan respons teks dari server
        return res.text();
    })
    .then((text) => {
        console.log('Server Response:', text);

        // Coba untuk mengurai sebagai JSON
        try {
            const jsonData = JSON.parse(text);
            // Jika berhasil diurai sebagai JSON, lanjutkan ke langkah berikutnya
            return jsonData;
        } catch (error) {
            // Jika tidak dapat diurai sebagai JSON, lempar kesalahan
            throw new Error('Invalid JSON response from server');
        }
    })
    .then((url) => {
        location.href = url;
        clearCart ();
    })
    .catch((err) => console.log(err));
});