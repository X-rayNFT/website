document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const containers = document.querySelectorAll('.image-container');
    let currentIndex = 0;

    // Function to update navigation buttons
    const updateNavButtons = () => {
        nextButton.style.opacity = currentIndex >= containers.length - 1 ? '0.3' : '1';
        nextButton.style.pointerEvents = currentIndex >= containers.length - 1 ? 'none' : 'auto';
        
        prevButton.style.opacity = currentIndex <= 0 ? '0.3' : '1';
        prevButton.style.pointerEvents = currentIndex <= 0 ? 'none' : 'auto';
    };

    // Function to scroll to container
    const scrollToContainer = (index) => {
        const containerWidth = 400; // Width of container
        const gap = 40; // Gap between containers
        const scrollPosition = index * (containerWidth + gap);
        
        content.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    // Navigation buttons
    nextButton.addEventListener('click', () => {
        if (currentIndex < containers.length - 1) {
            currentIndex++;
            scrollToContainer(currentIndex);
            updateNavButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToContainer(currentIndex);
            updateNavButtons();
        }
    });

    // Initial setup
    updateNavButtons();

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

    // Set initial position of xray lines
    containers.forEach(container => {
        const xrayLine = container.querySelector('.xray-line');
        xrayLine.style.bottom = '0%';
    });
});
