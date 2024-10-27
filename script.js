let draggedElement = null;

// Add event listeners to all draggable elements
const images = document.querySelectorAll('.image');
images.forEach(image => {
    // Start dragging
    image.addEventListener('dragstart', (e) => {
        draggedElement = e.target;
        e.target.classList.add('selected');
        console.log(`Drag started: ${draggedElement.id}`);
    });

    // End dragging
    image.addEventListener('dragend', () => {
        if (draggedElement) draggedElement.classList.remove('selected');
        draggedElement = null;
        console.log("Drag ended");
    });

    // Allow dropping
    image.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Handle drop event
    image.addEventListener('drop', (e) => {
        e.preventDefault();
        
        if (draggedElement && draggedElement !== e.target) {
            console.log(`Swapping ${draggedElement.id} with ${e.target.id}`);
            
            // Swap the background images
            const tempBackground = draggedElement.style.backgroundImage;
            draggedElement.style.backgroundImage = e.target.style.backgroundImage;
            e.target.style.backgroundImage = tempBackground;
        }
    });
});

