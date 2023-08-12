function locoScroll(){
        gsap.registerPlugin(ScrollTrigger);

        // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

        const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
        });
        window.addEventListener("resize",function(){
            locoScroll.update()
        })
        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        locoScroll.on("scroll", ScrollTrigger.update);

        // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
        });

        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

}

function loader(){
    const container = document.querySelector("#container");
    const imageUrls = [
        "https://wethinkelastic.com/assets/images/24a07612b16472c6a503f.svg",
        "https://wethinkelastic.com/assets/images/338b04b3ad8edf6773599.svg",
        "https://wethinkelastic.com/assets/images/4e7e9b9fc472434d65a23.svg",
        "https://wethinkelastic.com/assets/images/556ce542d7fdbd78d032e.svg",
        "https://wethinkelastic.com/assets/images/6a714ad31db5d83bc967b.svg",
        "https://wethinkelastic.com/assets/images/7c9e22462b51ae93b5a17.svg",
        "https://wethinkelastic.com/assets/images/8a2db0cd90582eb4b877d.svg",
        "https://wethinkelastic.com/assets/images/6a714ad31db5d83bc967b.svg",
        "https://wethinkelastic.com/assets/images/7c9e22462b51ae93b5a17.svg",
        "https://wethinkelastic.com/assets/images/8a2db0cd90582eb4b877d.svg",
        "https://wethinkelastic.com/assets/images/24a07612b16472c6a503f.svg",
        "https://wethinkelastic.com/assets/images/338b04b3ad8edf6773599.svg",
        "https://wethinkelastic.com/assets/images/4e7e9b9fc472434d65a23.svg",
        "https://wethinkelastic.com/assets/images/556ce542d7fdbd78d032e.svg",
        "https://wethinkelastic.com/assets/images/6a714ad31db5d83bc967b.svg",
        "https://wethinkelastic.com/assets/images/7c9e22462b51ae93b5a17.svg",
        "https://wethinkelastic.com/assets/images/8a2db0cd90582eb4b877d.svg",
        "https://wethinkelastic.com/assets/images/6a714ad31db5d83bc967b.svg",
        "https://wethinkelastic.com/assets/images/7c9e22462b51ae93b5a17.svg",
        "https://wethinkelastic.com/assets/images/8a2db0cd90582eb4b877d.svg",
        "https://wethinkelastic.com/assets/images/9e5b57420355774e0a99d.svg",
        "https://wethinkelastic.com/assets/images/109804494fa1878703f2c1.svg"
    ];

    let anim = 201;

    function setImage(url,delay) {
        setTimeout(() => {
            container.innerHTML = `<img src="${url}" alt="">`
        }, delay);
    }
    imageUrls.forEach(element => {
        setImage(element,anim)
        anim = anim + 200
    });
    var tl = gsap.timeline();
    gsap.to("#loader",{
        height : 0,
        delay : 3,
        duration: 1
    })
    tl.to("#pages",{
        minHeight: "10vh",
        duration : 1,
        delay : 3
    })
}

function revealScroll(){
    document.querySelectorAll(".reveal")
        .forEach(element => {

            let spanParent = document.createElement("span")
            let spanChild = document.createElement("span")

            spanParent.classList.add("parent")
            spanChild.classList.add("child")

            spanChild.textContent = element.textContent;
            spanParent.appendChild(spanChild);
            
            element.innerHTML= "";
            element.appendChild(spanParent);
        });
}

function pageOneAnim(){
    gsap.to("#page1 .parent .child",{
        y : 0,
        duration : 1,
        stagger : 0.08,
        delay : 3,
        ease: Expo.easeInOut
    }) 
    gsap.to("#nav",{
        y:"-100%",
        duration : 1,
        ease : Expo.easeInOut,
        scrollTrigger:{
            trigger: "page2",
            scroller:"#main",
            start: "top -1%",
            scrub : 2     
        }
    })
    
}

function pageTwoAnim(){
    gsap.from("#vidpromo video",{
        scaleX : 0.2,
        scrollTrigger:{
            scrub: 2,
            trigger: "#vidpromo video",
            scroller: "#main",
            start: "top 190%",
        }
    })
}

function pageThreeAnim(){
    gsap.to("#page3 .parent",{
        y : 0,
        duration : 1,
        ease: Expo.easeInOut,
        scrollTrigger:{
            trigger:"#page3",
            scroller:"#main",
            start:"top 160%",
            end:"top 50%"
        }
    }) 
    gsap.to("#page3 .ivy",{
        y : 0,
        duration : 1,
        ease: Expo.easeInOut,
        scrollTrigger:{
            trigger:"#page3",
            scroller:"#main",
            start:"top 160%",
            end:"top 50%"
        }
    }) 
}

function pageFourAnim(){
    gsap.to("#circle img",{
        rotate: 360,
        duration: 12,
        repeat: -1,
        ease: "none"
    })
}

function pageSixAnim(){
    gsap.to("#page6 span",{
        x:-1790,
        scrollTrigger:{
            trigger:"#page6",
            pin:true,
            scrub:2,
            scroller:"#main",
            start:"top 0%",
            end:"top -1000%",
            // markers:true
        }
    })
}

function pageSeven(){
    const sImgs = [
        "https://wethinkelastic.com/assets/images/27275550faa69b382a7d9.svg",
        "https://wethinkelastic.com/assets/images/36984a1f5516144b66b9f.svg",
        "https://wethinkelastic.com/assets/images/4de000aa0c2fcb4105f0b.svg",
        "https://wethinkelastic.com/assets/images/5f9435b780f885130afd4.svg",
        "https://wethinkelastic.com/assets/images/6ab6b3724d98d20326313.svg",
        "https://wethinkelastic.com/assets/images/7317ec5c8943977044c6d.svg",
        "https://wethinkelastic.com/assets/images/83862fc8dc3642ac61cbe.svg",
        "https://wethinkelastic.com/assets/images/96ed762b4556f90f0f409.svg",
        "https://wethinkelastic.com/assets/images/10c9b9eb661788ed09261f.svg",
        "https://wethinkelastic.com/assets/images/11dc1bdfff517735151c01.svg",
        "https://wethinkelastic.com/assets/images/12875d4d9e8bb95bfa429a.svg",
        "https://wethinkelastic.com/assets/images/139a5fddbe9f84e22e2dd7.svg",
        "https://wethinkelastic.com/assets/images/14b852e3169d4ace074249.svg",
        "https://wethinkelastic.com/assets/images/15976b2825c9b04f87d928.svg",
        "https://wethinkelastic.com/assets/images/1658775c156cc739e23059.svg",
        "https://wethinkelastic.com/assets/images/173a9027e7fa2afac94171.svg",
        "https://wethinkelastic.com/assets/images/18a783ec97b3e216399666.svg",
        "https://wethinkelastic.com/assets/images/192319579aa9cc87bfd74d.svg",
        "https://wethinkelastic.com/assets/images/20227b1841ccf0ae23f174.svg",
        "https://wethinkelastic.com/assets/images/216e8aebf831585056fc05.svg",
        "https://wethinkelastic.com/assets/images/225440519d2a88e6f14a9e.svg",
        "https://wethinkelastic.com/assets/images/237d8f383ddfdb06016944.svg",
        "https://wethinkelastic.com/assets/images/24cb09324aece5d4ab7095.svg",
    ]
    
    
    var seven = document.querySelector("#page7");
    function imgCreate(url){
        seven.innerHTML += `<div id="imcon"><img src="${url}" alt=""></div>`
    }
    
    sImgs.forEach(element => {
        imgCreate(element)        
    });
}

function gifReveal(){
    gsap.to("#gif .parent",{
        y : 0,
        duration : 1,
        stagger : 0.08,
        delay : 3,
        ease: Expo.easeInOut,
        scrollTrigger:{
            trigger:"#gif",
            scroller:"#main",
            start:"top 120%",
            end:"top -40%",
            // markers:true,
            scrub:2
        }
    }) 
}

locoScroll();
revealScroll();
loader();
pageOneAnim();
pageTwoAnim();
pageThreeAnim();
pageFourAnim();
pageSixAnim();
pageSeven();
gifReveal();


