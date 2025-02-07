document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const containers = document.querySelectorAll('.image-container');
    let currentIndex = 1; // Start with middle container active

    const descriptionContainer = document.querySelector('.description-container');
    const descriptions = [
        {
            title: "Babe Ruth Home Run Ball",
            description: "Home run ball during the 1918 season",
            athlete: "Babe Ruth",
            year: "1918",
            sport: "Baseball",
            bid: "$1,250,000"
        },
        {
            title: "Mickey Mantle World Series Ball",
            description: "Game-winning home run ball from 1956 World Series",
            athlete: "Mickey Mantle",
            year: "1956",
            sport: "Baseball",
            bid: "$850,000"
        },
        {
            title: "Roger Maris 61st HR Ball",
            description: "Record-breaking 61st home run ball from 1961",
            athlete: "Roger Maris",
            year: "1961",
            sport: "Baseball",
            bid: "$2,000,000"
        }
    ];

    // Add at the top with other querySelector calls
    const scrollPrompt = document.querySelector('.scroll-prompt');

    // Function to handle circular index
    const getCircularIndex = (index) => {
        if (index < 0) {
            return containers.length - 1;
        }
        if (index >= containers.length) {
            return 0;
        }
        return index;
    };

    // Function to update active container
    const updateActiveContainer = () => {
        containers.forEach((container, index) => {
            container.classList.remove('active');
            if (index === currentIndex) {
                container.classList.add('active');
            }
        });
    };

    // Function to scroll to container
    const scrollToContainer = (index) => {
        const containerWidth = 400;
        const gap = 40;
        const scrollPosition = index * (containerWidth + gap);
        const centerOffset = containerWidth + gap;
        
        // Calculate the total width of all containers
        const totalWidth = (containers.length - 1) * (containerWidth + gap);
        
        if (currentIndex === 0 && index === containers.length - 1) {
            // Going left from first to last
            content.style.transform = `translateX(${-totalWidth + centerOffset}px)`;
        } else if (currentIndex === containers.length - 1 && index === 0) {
            // Going right from last to first
            content.style.transform = `translateX(${centerOffset}px)`;
        } else {
            // Normal sliding
            content.style.transform = `translateX(${-scrollPosition + centerOffset}px)`;
        }
    };

    // Function to update description content
    const updateDescription = (index) => {
        const data = descriptions[index];
        descriptionContainer.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <div class="metadata">
                <p><strong>Athlete:</strong> ${data.athlete}</p>
                <p><strong>Year:</strong> ${data.year}</p>
                <p><strong>Sport:</strong> ${data.sport}</p>
            </div>
            <div class="bid">
                <p><strong>Current bid:</strong> ${data.bid}</p>
            </div>
        `;
    };

    // Scroll effect for currently visible container
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const totalHeight = document.body.scrollHeight - windowHeight;
        const windowScroll = window.pageYOffset;
        const scrolled = windowScroll / totalHeight;

        // Hide scroll prompt immediately when scrolling starts
        if (scrolled > 0) {
            scrollPrompt.classList.add('hidden');
        } else {
            scrollPrompt.classList.remove('hidden');
        }

        // Apply effect only to the currently visible container
        const visibleContainer = containers[currentIndex];
        const xrayCover = visibleContainer.querySelector('.xray-cover');
        const xrayLine = visibleContainer.querySelector('.xray-line');

        // Hide navigation buttons when scrolling down
        if (scrolled > 0.1) { // Start hiding buttons after 10% scroll
            prevButton.classList.add('hidden');
            nextButton.classList.add('hidden');
        } else {
            prevButton.classList.remove('hidden');
            nextButton.classList.remove('hidden');
        }

        // Fade out side containers based on scroll position
        containers.forEach((container, index) => {
            if (index !== currentIndex) {
                container.style.opacity = Math.max(0.5 - scrolled, 0);
            }
        });

        // Adjust the clip-path for the X-ray cover based on scroll progress
        const clipPathValue = `polygon(0 ${100 - (scrolled * 100)}%, 100% ${100 - (scrolled * 100)}%, 100% 100%, 0 100%)`;
        xrayCover.style.clipPath = clipPathValue;

        // Move the line upwards as we scroll
        const lineBottomPosition = scrolled * 100;
        xrayLine.style.bottom = `${lineBottomPosition}%`;

        if (scrolled > 0.3) {
            descriptionContainer.classList.add('visible');
            descriptionContainer.style.opacity = Math.min((scrolled - 0.3) * 2, 1);
        } else {
            descriptionContainer.classList.remove('visible');
            descriptionContainer.style.opacity = 0;
        }
    });

    // Function to reset container opacity when changing slides
    const resetContainerOpacity = () => {
        containers.forEach((container, index) => {
            if (index !== currentIndex) {
                container.style.opacity = '0.5';
                const descriptionContainer = container.querySelector('.description-container');
                descriptionContainer.classList.remove('visible');
                descriptionContainer.style.opacity = 0;
            }
        });
    };

    // Update navigation button click handlers
    prevButton.addEventListener('click', () => {
        const newIndex = getCircularIndex(currentIndex - 1);
        currentIndex = newIndex;
        scrollToContainer(newIndex);
        updateActiveContainer();
        updateDescription(newIndex);
    });

    nextButton.addEventListener('click', () => {
        const newIndex = getCircularIndex(currentIndex + 1);
        currentIndex = newIndex;
        scrollToContainer(newIndex);
        updateActiveContainer();
        updateDescription(newIndex);
    });

    // Initial setup
    updateActiveContainer();
    scrollToContainer(currentIndex);
    updateDescription(currentIndex);

    // Set initial position of xray lines
    containers.forEach(container => {
        const xrayLine = container.querySelector('.xray-line');
        xrayLine.style.bottom = '0%';
    });
});
