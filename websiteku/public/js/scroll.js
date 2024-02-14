{
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElement = document.querySelectorAll('.hidden');
hiddenElement.forEach((el) => observer.observe(el));
}

{
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('show1');
            } else {
                entry.target.classList.remove('show1');
            }
        });
    });
    
    const hiddenElement = document.querySelectorAll('.hidden1');
    hiddenElement.forEach((el) => observer.observe(el));
}

{
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('show3');
            } else {
                entry.target.classList.remove('show3');
            }
        });
    });
    
    const hiddenElement = document.querySelectorAll('.hidden3');
    hiddenElement.forEach((el) => observer.observe(el));
}
