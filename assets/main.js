document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.container');
    const carousel = document.getElementById('carousel');
    const music = document.getElementById('background-music');

    // When hovering over "No" button, move it to a random position
    noBtn.addEventListener('mouseenter', function() {
        moveButton(noBtn);
    });

    // When "No" button is clicked, make it disappear
    noBtn.addEventListener('click', function() {
        noBtn.style.display = 'none';
    });

    // When "Yes" button is clicked, show the carousel and play music
    yesBtn.addEventListener('click', function() {
        container.style.display = 'none';
        carousel.style.display = 'block';
        
        // Play background music
        music.play();
        
        // Start automatic slideshow
        startSlideshow();
    });

    // Function to move button to random position
    function moveButton(button) {
        const maxX = window.innerWidth - button.offsetWidth - 20;
        const maxY = window.innerHeight - button.offsetHeight - 20;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        button.style.position = 'absolute';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
    }

    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;
    let slideshowInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Pause all videos when changing slides
        const videos = document.querySelectorAll('.carousel-slide video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
        
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }
        
        slides[currentSlide].classList.add('active');
        
        // Check if current slide has a video
        const currentSlideElement = slides[currentSlide];
        const hasVideo = currentSlideElement.querySelector('video');
        
        if (hasVideo) {
            // Stop slideshow if current slide has a video
            stopSlideshow();
        } else {
            // Restart slideshow for image slides
            stopSlideshow();
            startSlideshow();
        }
    }

    // Automatic slideshow
    function startSlideshow() {
        slideshowInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000); // 5 seconds interval
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }

    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });

    // Ensure background music keeps playing even if video plays
    const videos = document.querySelectorAll('.carousel-slide video');
    videos.forEach(video => {
        video.addEventListener('play', function() {
            // Keep background music playing
            if (music.paused) {
                music.play();
            }
        });
        
        // When video ends, move to next slide
        video.addEventListener('ended', function() {
            showSlide(currentSlide + 1);
        });
    });
});