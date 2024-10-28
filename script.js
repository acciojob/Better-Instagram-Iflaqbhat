let draggedElement = null;

// Get all image divs
const images = document.querySelectorAll('.image');

images.forEach(image => {
    // Handle drag start
    image.addEventListener('dragstart', (e) => {
        draggedElement = e.target; // Store the dragged element
        draggedElement.classList.add('selected'); // Optional: add a class for styling
    });

    // Handle drag end
    image.addEventListener('dragend', () => {
        if (draggedElement) {
            draggedElement.classList.remove('selected'); // Remove the styling class
            draggedElement = null; // Clear the reference to the dragged element
        }
    });

    // Allow dropping
    image.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default to allow dropping
    });

    // Handle drop event
    image.addEventListener('drop', (e) => {
        e.preventDefault(); // Prevent default behavior
        const targetElement = e.target; // Get the target element

        if (draggedElement && draggedElement !== targetElement) {
            // Swap the background images
            const tempBackground = getComputedStyle(draggedElement).backgroundImage;
            draggedElement.style.backgroundImage = getComputedStyle(targetElement).backgroundImage;
            targetElement.style.backgroundImage = tempBackground;

            // Swap the inner text as well
            const tempText = draggedElement.innerText;
            draggedElement.innerText = targetElement.innerText;
            targetElement.innerText = tempText;
        }
    });
});



