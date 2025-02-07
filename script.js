document.addEventListener('DOMContentLoaded', () => {
    document.body.style.height = `${Math.max(document.body.scrollHeight, window.innerHeight + 10)}px`;
    
    // Set initial position of xray line
    const xrayLine = document.querySelector('.xray-line');
    xrayLine.style.bottom = '0%';

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const totalHeight = document.body.scrollHeight - windowHeight;
        const windowScroll = window.pageYOffset;
        const scrolled = windowScroll / totalHeight;
        console.log(`Scrolled: ${scrolled}`); // Debugging

        const xrayCover = document.querySelector('.xray-cover');
        const xrayLine = document.querySelector('.xray-line');

        // Adjust the clip-path for the X-ray cover based on scroll progress
        const clipPathValue = `polygon(0 ${100 - (scrolled * 100)}%, 100% ${100 - (scrolled * 100)}%, 100% 100%, 0 100%)`;
        xrayCover.style.clipPath = clipPathValue;

        // Move the line upwards as we scroll
        const lineBottomPosition = scrolled * 100;
        xrayLine.style.bottom = `${lineBottomPosition}%`;
        console.log(`${lineBottomPosition}%`); // Debugging
    });

    // Add drag scrolling functionality
    const scrollContainers = document.querySelectorAll('.scroll-container');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startY;
        let scrollTop;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startY = e.pageY - container.offsetTop;
            scrollTop = container.scrollTop;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const y = e.pageY - container.offsetTop;
            const walk = (y - startY) * 2; // Adjust scrolling speed
            container.scrollTop = scrollTop - walk;
        });
    });
});
