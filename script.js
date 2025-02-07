document.addEventListener('DOMContentLoaded', () => {
    document.body.style.height = `${Math.max(document.body.scrollHeight, window.innerHeight + 10)}px`;

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

        // Correctly move the .xray-line to simulate the bottom-up reveal
        // Invert the bottom property logic to move the line upwards
        const lineBottomPosition = scrolled * 100;
        xrayLine.style.bottom = `${lineBottomPosition}%`;
        console.log(`${lineBottomPosition}%`); // Debugging
    });
});
