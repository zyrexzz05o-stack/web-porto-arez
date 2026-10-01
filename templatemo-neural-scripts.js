// JavaScript Document

/*

TemplateMo 597 Neural Glass

https://templatemo.com/tm-597-neural-glass

*/

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar color change based on section
window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills-section');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    const skillsTop = skillsSection.offsetTop;
    const skillsBottom = skillsTop + skillsSection.offsetHeight;
    const scrollMid = window.pageYOffset + window.innerHeight * 0.5;

    if (scrollMid > skillsTop && scrollMid < skillsBottom) {
        navbar.style.background = 'rgba(245, 240, 235, 0.85)';
        navbar.style.borderColor = 'rgba(0,0,0,0.1)';
        navLinks.forEach(l => l.style.color = '#111');
        // Logo SVG jadi hitam
        document.querySelectorAll('.nav-logo svg circle').forEach(c => {
            c.style.stroke = '#111';
            c.style.fill = c.getAttribute('fill') === 'white' ? '#111' : '';
        });
    } else {
        navbar.style.background = '';
        navbar.style.borderColor = '';
        navLinks.forEach(l => l.style.color = '');
        // Logo SVG kembali putih
        document.querySelectorAll('.nav-logo svg circle').forEach(c => {
            c.style.stroke = '';
            c.style.fill = '';
        });
    }
});

// Active navigation link on scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPos = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Background transition on scroll - instant change
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const purpleSection = document.querySelector('.neural-background.purple-section');
    const darkSection = document.querySelector('.neural-background.dark-section');
    const windowHeight = window.innerHeight;
    const shapes = document.querySelectorAll('.shape');
    const neuralLines = document.querySelectorAll('.neural-line');
    
    // Get About section position
    const aboutSection = document.querySelector('.about-section');
    const aboutTop = aboutSection.offsetTop;
    const aboutBottom = aboutTop + aboutSection.offsetHeight;
    
    if (purpleSection && darkSection) {
        const scrollThreshold = scrolled + windowHeight / 2;
        
        // Switch to purple as soon as we leave About section
        if (scrollThreshold > aboutBottom - 200) {
            // Show purple for Skills and beyond
            purpleSection.style.opacity = '1';
            darkSection.style.opacity = '0';
            
            // Keep shapes white/gray - no color change
            shapes.forEach(shape => {
                shape.style.opacity = '1';
            });
            neuralLines.forEach(line => {
                line.style.opacity = '1';
            });
        } else if (scrollThreshold > aboutTop + 100 && scrollThreshold < aboutBottom - 200) {
            // Show dark only in middle of About section
            purpleSection.style.opacity = '0';
            darkSection.style.opacity = '1';
            
            // Keep shapes white/gray - no color change
            shapes.forEach(shape => {
                shape.style.opacity = '1';
            });
            neuralLines.forEach(line => {
                line.style.opacity = '0.8';
            });
        } else {
            // Show purple for Hero and transition areas
            purpleSection.style.opacity = '1';
            darkSection.style.opacity = '0';
            
            // Keep shapes white/gray - no color change
            shapes.forEach(shape => {
                shape.style.opacity = '1';
            });
            neuralLines.forEach(line => {
                line.style.opacity = '1';
            });
        }
    }
});

// Page flip effect on scroll
let isScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const heroSection = document.querySelector('.hero-section');
    const aboutSection = document.querySelector('.about-section');
    const skillsSection = document.querySelector('.skills-section');
    const projectsSection = document.querySelector('.projects-section');
    const contactSection = document.querySelector('.contact-section');

    const aboutTop = aboutSection.offsetTop;
    const skillsTop = skillsSection.offsetTop;
    const projectsTop = projectsSection.offsetTop;

    // Hero section page flip
    if (scrolled > windowHeight * 0.3) {
        heroSection.classList.add('page-flip');
    } else {
        heroSection.classList.remove('page-flip');
    }

    // About section: reveal saat masuk, hide saat skills muncul
    if (scrolled > windowHeight * 0.5 && scrolled < skillsTop - windowHeight * 0.3) {
        aboutSection.classList.add('page-reveal');
        aboutSection.classList.remove('page-hide');
    } else if (scrolled <= windowHeight * 0.5) {
        aboutSection.classList.remove('page-reveal');
        aboutSection.classList.remove('page-hide');
    } else if (scrolled >= skillsTop - windowHeight * 0.3) {
        aboutSection.classList.add('page-hide');
        aboutSection.classList.remove('page-reveal');
    }

    // Skills section: reveal saat masuk, hide saat projects muncul
    if (scrolled > skillsTop - windowHeight * 0.5 && scrolled < projectsTop - windowHeight * 0.3) {
        skillsSection.classList.add('page-reveal');
        skillsSection.classList.remove('page-hide');
    } else if (scrolled <= skillsTop - windowHeight * 0.5) {
        skillsSection.classList.remove('page-reveal');
        skillsSection.classList.remove('page-hide');
    } else if (scrolled >= projectsTop - windowHeight * 0.3) {
        skillsSection.classList.add('page-hide');
        skillsSection.classList.remove('page-reveal');
    }

    // Projects section: reveal saat masuk, hide saat contact muncul
    if (scrolled > projectsTop - windowHeight * 0.5) {
        projectsSection.classList.add('page-reveal');
        projectsSection.classList.remove('page-hide');
    } else {
        projectsSection.classList.remove('page-reveal');
        projectsSection.classList.remove('page-hide');
    }

    // Contact section
    if (scrolled > windowHeight * 2.6) {
        contactSection.classList.add('page-reveal');
        contactSection.classList.remove('page-hide');
    } else {
        contactSection.classList.remove('page-reveal');
        contactSection.classList.add('page-hide');
    }

    // Auto snap to Skills section when scrolling past About
    const aboutBottom = aboutSection.offsetTop + aboutSection.offsetHeight;
    const skillsBottom = skillsSection.offsetTop + skillsSection.offsetHeight;
    clearTimeout(scrollTimeout);

    if (scrolled > aboutBottom - 100 && scrolled < skillsTop + 100 && !isScrolling) {
        scrollTimeout = setTimeout(() => {
            isScrolling = true;
            window.scrollTo({ top: skillsTop, behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 1000);
        }, 150);
    } else if (scrolled > skillsBottom - 100 && scrolled < projectsTop + 100 && !isScrolling) {
        scrollTimeout = setTimeout(() => {
            isScrolling = true;
            window.scrollTo({ top: projectsTop, behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 1000);
        }, 150);
    }
});

// Parallax effect for geometric shapes + color change per section
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;
    const skillsSection = document.querySelector('.skills-section');
    const projectsSection = document.querySelector('.projects-section');
    const skillsTop = skillsSection.offsetTop;
    const skillsBottom = skillsTop + skillsSection.offsetHeight;
    const projectsTop = projectsSection.offsetTop;
    const projectsBottom = projectsTop + projectsSection.offsetHeight;

    const inSkills = scrolled + window.innerHeight * 0.5 > skillsTop && scrolled + window.innerHeight * 0.5 < skillsBottom;
    const inProjects = scrolled + window.innerHeight * 0.5 > projectsTop && scrolled + window.innerHeight * 0.5 < projectsBottom;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;

        if (inSkills) {
            shape.style.borderColor = 'rgba(0, 0, 0, 0.3)';
            shape.style.boxShadow = '0 0 20px rgba(0,0,0,0.1), inset 0 0 20px rgba(0,0,0,0.05)';
        } else if (inProjects) {
            shape.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            shape.style.boxShadow = '0 0 25px rgba(255,255,255,0.15), inset 0 0 25px rgba(255,255,255,0.08)';
        } else {
            shape.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            shape.style.boxShadow = '0 0 20px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)';
        }
    });
});

// Neural lines pulse effect
const neuralLines = document.querySelectorAll('.neural-line');
setInterval(() => {
    neuralLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'scaleX(1.2)';
            setTimeout(() => {
                line.style.opacity = '0.2';
                line.style.transform = 'scaleX(0.5)';
            }, 200);
        }, index * 300);
    });
}, 2000);

// Intersection Observer for fade-in animations (excluding skill cards)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation (excluding skill-card and stat-item as they have their own animation)
document.querySelectorAll('.project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.style.background = 'linear-gradient(45deg, #9370db, #e0a3ff)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #e0a3ff, #ff69b4)';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Shape liquid water effect - semua bentuk, ultra smooth 3D
(function() {
    const shapeDataMap = new Map();

    document.querySelectorAll('.shape').forEach((shape) => {
        shape.style.overflow = 'visible';
        shape.style.position = 'relative';

        // SVG utama (gelombang)
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:4;`;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-width', '1.8');
        // Glow layer
        const pathGlow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathGlow.setAttribute('fill', 'none');
        pathGlow.setAttribute('stroke-width', '6');
        pathGlow.setAttribute('opacity', '0.18');
        svg.appendChild(pathGlow);
        svg.appendChild(path);
        shape.appendChild(svg);

        const cs = window.getComputedStyle(shape);
        const br = parseFloat(cs.borderRadius);
        const cp = cs.clipPath;
        let type = 'rect';
        if (cp && cp !== 'none' && cp.includes('polygon')) type = 'triangle';
        else if (br && br >= 30) type = 'circle';

        shapeDataMap.set(shape, {
            svg, path, pathGlow, type,
            phase: 0,
            amp: 0,        // amplitude saat ini (lerp target)
            ampTarget: 0,  // target amplitude
            mouseX: 0.5, mouseY: 0.5,
            prevMouseX: 0.5, prevMouseY: 0.5,
            currentSide: -1, prevSide: -1,
            sideBlend: 1.0,
            animFrame: null, active: false,
            tilt: { x: 0, y: 0 } // 3D tilt
        });
    });

    // Easing cubic out untuk transisi sangat mulus
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function waveFn(t, amp, ph, freq1, freq2) {
        const env = Math.pow(Math.sin(t * Math.PI), 1.5); // lebih smooth di ujung
        return env * (
            Math.sin(t * Math.PI * freq1 + ph) * amp * 0.65 +
            Math.sin(t * Math.PI * freq2 + ph * 1.15) * amp * 0.25 +
            Math.sin(t * Math.PI * (freq1 + freq2) * 0.5 + ph * 0.8) * amp * 0.1
        );
    }

    function getAmpBlend(s, currentSide, prevSide, blend, amp) {
        const fromCur  = s === currentSide ? easeOutCubic(blend) : 0;
        const fromPrev = s === prevSide    ? easeOutCubic(1 - blend) : 0;
        return amp * Math.max(fromCur, fromPrev);
    }

    function getWavyRect(w, h, amp, ph, currentSide, prevSide, blend) {
        const steps = 100;
        let pts = [];
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            pts.push([t * w, waveFn(t, getAmpBlend(0, currentSide, prevSide, blend, amp), ph, 2, 3.2)]);
        }
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            pts.push([w + waveFn(t, getAmpBlend(1, currentSide, prevSide, blend, amp), ph, 2, 3.2), t * h]);
        }
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            pts.push([w - t * w, h + waveFn(t, getAmpBlend(2, currentSide, prevSide, blend, amp), ph, 2, 3.2)]);
        }
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            pts.push([waveFn(t, getAmpBlend(3, currentSide, prevSide, blend, amp), ph, 2, 3.2), h - t * h]);
        }
        return pts.map((p, i) => `${i===0?'M':'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ') + ' Z';
    }

    function getWavyCircle(w, h, amp, ph, mx, my, prevMx, prevMy, blend) {
        const steps = 150;
        const cx = w/2, cy = h/2, rx = w/2, ry = h/2;
        const curA = Math.atan2(my - 0.5, mx - 0.5);
        const preA = Math.atan2(prevMy - 0.5, prevMx - 0.5);
        const win  = Math.PI * 0.6;
        let d = '';
        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            function env(ref) {
                let diff = angle - ref;
                while (diff > Math.PI) diff -= Math.PI*2;
                while (diff < -Math.PI) diff += Math.PI*2;
                const t = Math.abs(diff) / win;
                return t < 1 ? Math.pow(0.5 + 0.5*Math.cos(t*Math.PI), 1.4) : 0;
            }
            const e = env(curA) * easeOutCubic(blend) + env(preA) * easeOutCubic(1-blend);
            let diff = angle - curA;
            while (diff > Math.PI) diff -= Math.PI*2;
            while (diff < -Math.PI) diff += Math.PI*2;
            const wave = (Math.sin(diff*2.5+ph)*0.6 + Math.sin(diff*4.5+ph*1.1)*0.3 + Math.sin(diff*7+ph*0.7)*0.1) * amp * e;
            const r = 1 + wave / Math.max(rx, ry);
            d += (i===0?'M':'L') + ` ${(cx+rx*r*Math.cos(angle)).toFixed(2)} ${(cy+ry*r*Math.sin(angle)).toFixed(2)}`;
        }
        return d + ' Z';
    }

    function getWavyTriangle(w, h, amp, ph, currentSide, prevSide, blend) {
        const steps = 80;
        const pts = [[w*0.5,0],[0,h],[w,h]];
        let d = '';
        for (let s = 0; s < 3; s++) {
            const p1=pts[s], p2=pts[(s+1)%3];
            const len = Math.sqrt((p2[0]-p1[0])**2+(p2[1]-p1[1])**2);
            const nx = -(p2[1]-p1[1])/len, ny = (p2[0]-p1[0])/len;
            const sa = getAmpBlend(s, currentSide, prevSide, blend, amp);
            for (let i=(s===0?0:1); i<=steps; i++) {
                const t = i/steps;
                const x = p1[0]+(p2[0]-p1[0])*t;
                const y = p1[1]+(p2[1]-p1[1])*t;
                const wave = waveFn(t, sa, ph, 2.5, 4);
                if (s===0&&i===0) d+=`M ${(x+nx*wave).toFixed(2)} ${(y+ny*wave).toFixed(2)}`;
                else d+=` L ${(x+nx*wave).toFixed(2)} ${(y+ny*wave).toFixed(2)}`;
            }
        }
        return d + ' Z';
    }

    function getClosestSideRect(mx, my) {
        return [my, 1-mx, 1-my, mx].indexOf(Math.min(my, 1-mx, 1-my, mx));
    }
    function getClosestSideTriangle(w, h, mx, my) {
        const pts=[[w*0.5,0],[0,h],[w,h]];
        function ds(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/l));return Math.hypot(px-ax-t*dx,py-ay-t*dy);}
        const cx=mx*w,cy=my*h;
        const d=[0,1,2].map(s=>ds(cx,cy,pts[s][0],pts[s][1],pts[(s+1)%3][0],pts[(s+1)%3][1]));
        return d.indexOf(Math.min(...d));
    }

    function lerp(a, b, t) { return a + (b - a) * t; }

    function runAnimate(shape, data) {
        const w = shape.offsetWidth, h = shape.offsetHeight;
        const color = shape.getAttribute('data-base-color') || 'rgba(255,255,255,0.85)';

        // Amplitude lerp sangat smooth
        data.amp = lerp(data.amp, data.ampTarget, 0.06);
        if (data.sideBlend < 1) data.sideBlend = Math.min(1, data.sideBlend + 0.035);

        // Phase speed lebih lambat = gelombang lebih elegan
        data.phase += 0.038;

        const amp = data.amp;

        if (amp > 0.05) {
            let pathD = '';
            if (data.type === 'circle') {
                pathD = getWavyCircle(w, h, amp, data.phase, data.mouseX, data.mouseY,
                    data.prevMouseX, data.prevMouseY, data.sideBlend);
                shape.style.borderColor = 'transparent';
            } else if (data.type === 'triangle') {
                pathD = getWavyTriangle(w, h, amp, data.phase, data.currentSide, data.prevSide, data.sideBlend);
                shape.style.background = 'transparent';
            } else {
                pathD = getWavyRect(w, h, amp, data.phase, data.currentSide, data.prevSide, data.sideBlend);
                shape.style.borderColor = 'transparent';
            }
            data.path.setAttribute('d', pathD);
            data.path.setAttribute('stroke', color);
            data.path.style.filter = `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 10px ${color})`;
            data.pathGlow.setAttribute('d', pathD);
            data.pathGlow.setAttribute('stroke', color);
            data.animFrame = requestAnimationFrame(() => runAnimate(shape, data));
        } else {
            data.path.setAttribute('d', '');
            data.pathGlow.setAttribute('d', '');
            shape.style.borderColor = '';
            shape.style.background = '';
            data.animFrame = null;
        }
    }

    document.addEventListener('mousemove', (e) => {
        shapeDataMap.forEach((data, shape) => {
            const rect = shape.getBoundingClientRect();
            const pad = 14;
            const inside = e.clientX >= rect.left-pad && e.clientX <= rect.right+pad
                        && e.clientY >= rect.top-pad  && e.clientY <= rect.bottom+pad;

            const newMx = Math.max(0, Math.min(1, (e.clientX-rect.left)/rect.width));
            const newMy = Math.max(0, Math.min(1, (e.clientY-rect.top)/rect.height));

            if (shape.style.borderColor && shape.style.borderColor !== 'transparent') {
                shape.setAttribute('data-base-color', shape.style.borderColor);
            }

            if (inside) {
                let newSide = -1;
                if (data.type === 'rect') newSide = getClosestSideRect(newMx, newMy);
                else if (data.type === 'triangle') newSide = getClosestSideTriangle(shape.offsetWidth, shape.offsetHeight, newMx, newMy);

                if (newSide !== data.currentSide && newSide !== -1) {
                    data.prevSide = data.currentSide;
                    data.currentSide = newSide;
                    data.sideBlend = 0;
                }
                if (data.type === 'circle') {
                    const moved = Math.hypot(newMx - data.mouseX, newMy - data.mouseY);
                    if (moved > 0.04) {
                        data.prevMouseX = data.mouseX;
                        data.prevMouseY = data.mouseY;
                        data.sideBlend = 0;
                    }
                }
                data.mouseX = newMx;
                data.mouseY = newMy;
                data.ampTarget = 13;
                if (!data.active) {
                    data.active = true;
                    if (!data.animFrame) runAnimate(shape, data);
                }
            } else if (data.active) {
                data.active = false;
                data.ampTarget = 0;
                if (!data.animFrame) runAnimate(shape, data);
            }
        });
    });
})();

// Logo navbar ripple effect on hover
(function() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;

    const svg = logo.querySelector('svg');
    const circles = logo.querySelectorAll('svg circle');
    let animFrame = null;
    let phase = 0;
    let active = false;
    let ripples = [];

    // Spawn ripple baru
    function spawnRipple() {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        r.setAttribute('cx', '18');
        r.setAttribute('cy', '18');
        r.setAttribute('r', '3');
        r.setAttribute('fill', 'none');
        r.setAttribute('stroke', 'white');
        r.setAttribute('stroke-width', '1');
        r.setAttribute('opacity', '0.8');
        svg.appendChild(r);
        ripples.push({ el: r, radius: 3, opacity: 0.8 });
    }

    let spawnTimer = 0;

    function animate() {
        phase += 0.008;
        spawnTimer++;

        // Spawn ripple tiap 50 frame
        if (spawnTimer % 50 === 0 && active) spawnRipple();

        // Update ripples
        ripples = ripples.filter(rp => {
            rp.radius += 0.25;
            rp.opacity -= 0.01;
            if (rp.opacity <= 0 || rp.radius > 22) {
                rp.el.remove();
                return false;
            }
            rp.el.setAttribute('r', rp.radius.toFixed(2));
            rp.el.setAttribute('opacity', rp.opacity.toFixed(3));
            // Warna ikut section
            const isSkills = navbar_in_skills();
            rp.el.setAttribute('stroke', isSkills ? '#333' : 'white');
            return true;
        });

        // Pulse lingkaran asli
        circles.forEach((c, i) => {
            if (c.getAttribute('fill') === 'white' || c.style.fill) return;
            const baseOp = [0.75, 0.5, 0.3][i - 1] || 0.75;
            const pulse = baseOp + Math.sin(phase + i * 0.8) * 0.15;
            c.setAttribute('opacity', Math.min(1, pulse).toFixed(3));
        });

        if (active || ripples.length > 0) {
            animFrame = requestAnimationFrame(animate);
        } else {
            // Reset opacity lingkaran
            circles.forEach((c, i) => {
                const baseOp = [1, 0.75, 0.5, 0.3][i];
                if (baseOp) c.setAttribute('opacity', baseOp);
            });
            animFrame = null;
        }
    }

    function navbar_in_skills() {
        const s = document.querySelector('.skills-section');
        if (!s) return false;
        const mid = window.pageYOffset + window.innerHeight * 0.5;
        return mid > s.offsetTop && mid < s.offsetTop + s.offsetHeight;
    }

    logo.addEventListener('mouseenter', () => {
        active = true;
        spawnRipple();
        if (!animFrame) animate();
    });

    logo.addEventListener('mouseleave', () => {
        active = false;
    });

    // Klik: burst ripple banyak sekaligus
    logo.addEventListener('click', () => {
        for (let i = 0; i < 3; i++) {
            setTimeout(spawnRipple, i * 80);
        }
        if (!animFrame) animate();
    });
})();
