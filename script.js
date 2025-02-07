document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const containers = document.querySelectorAll('.image-container');
    let currentIndex = 0;

    // Function to update navigation buttons
    const updateNavButtons = () => {
        prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextButton.style.display = currentIndex === containers.length - 1 ? 'none' : 'flex';
    };

    // Initial button state
    updateNavButtons();

    // Set up scroll handling for each container
    containers.forEach((container, index) => {
        const xrayCover = container.querySelector('.xray-cover');
        const xrayLine = container.querySelector('.xray-line');
        
        // Set initial position of xray line
        xrayLine.style.bottom = '0%';
    });

    // Navigation buttons
    nextButton.addEventListener('click', () => {
        if (currentIndex < containers.length - 1) {
            currentIndex++;
            content.scrollTo({
                left: currentIndex * (600 + 20), // container width + gap
                behavior: 'smooth'
            });
            updateNavButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            content.scrollTo({
                left: currentIndex * (600 + 20), // container width + gap
                behavior: 'smooth'
            });
            updateNavButtons();
        }
    });

    // Scroll effect for currently visible container
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const totalHeight = document.body.scrollHeight - windowHeight;
        const windowScroll = window.pageYOffset;
        const scrolled = windowScroll / totalHeight;

        // Apply effect only to the currently visible container
        const visibleContainer = containers[currentIndex];
        const xrayCover = visibleContainer.querySelector('.xray-cover');
        const xrayLine = visibleContainer.querySelector('.xray-line');

        // Adjust the clip-path for the X-ray cover based on scroll progress
        const clipPathValue = `polygon(0 ${100 - (scrolled * 100)}%, 100% ${100 - (scrolled * 100)}%, 100% 100%, 0 100%)`;
        xrayCover.style.clipPath = clipPathValue;

        // Move the line upwards as we scroll
        const lineBottomPosition = scrolled * 100;
        xrayLine.style.bottom = `${lineBottomPosition}%`;
    });
});
