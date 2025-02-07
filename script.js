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
});
