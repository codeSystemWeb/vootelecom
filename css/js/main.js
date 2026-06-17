// HEADER SCROLL

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("header-active");

    }else{

        header.classList.remove("header-active");

    }

});

// SCROLL SUAVE

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        document.querySelector(
            this.getAttribute('href')
        ).scrollIntoView({

            behavior: 'smooth'

        });

    });

});

// ANIMAÇÃO AO APARECER

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(
    ".plano-card,.feature-card,.stat-card"
).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// CONTADORES

const counters = document.querySelectorAll(".stat-card h3");

const speed = 200;

counters.forEach(counter=>{

    const animate = ()=>{

        const value = +counter.innerText.replace(/\D/g,'');

        const data = +counter.getAttribute('data-count') || value;

        const time = data / speed;

        if(value < data){

            counter.innerText = Math.ceil(
                value + time
            );

            setTimeout(animate,10);

        }else{

            counter.innerText = data;

        }

    };

});


/* MENU MOBILE */

const hamburger = document.querySelector(".hamburger");

const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {

    menu.classList.toggle("active");

    hamburger.classList.toggle("open");

});

document.querySelectorAll('.menu a')
.forEach(link=>{

    link.addEventListener('click',()=>{

        menu.classList.remove('active');

        hamburger.classList.remove('open');

    });

});

// BOTÃO WHATSAPP FUTURO

console.log("VOO Telecom carregado");