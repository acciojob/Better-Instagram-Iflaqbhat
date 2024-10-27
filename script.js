let draggedElement = null;

// Get all image divs
const images = document.querySelectorAll('.image');

images.forEach(image => {
    // Handle drag start
    image.addEventListener('dragstart', (e) => {
        draggedElement = e.target;
        draggedElement.classList.add('selected');
    });

    // Handle drag end
    image.addEventListener('dragend', () => {
        if (draggedElement) draggedElement.classList.remove('selected');
        draggedElement = null;
    });

    // Allow dropping
    image.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necessary to allow drop
    });

    // Handle drop event
    image.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetElement = e.target;

        if (draggedElement && draggedElement !== targetElement) {
            // Swap the background images
            const tempBackground = draggedElement.style.backgroundImage;
            draggedElement.style.backgroundImage = targetElement.style.backgroundImage;
            targetElement.style.backgroundImage = tempBackground;

            // Swap the inner text as well
            const tempText = draggedElement.innerText;
            draggedElement.innerText = targetElement.innerText;
            targetElement.innerText = tempText;
        }
    });
});


