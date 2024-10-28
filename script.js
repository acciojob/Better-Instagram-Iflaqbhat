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

describe('Drag and Drop Test', () => {
    it('should drag and drop images correctly', () => {
        cy.visit('URL_OF_YOUR_APP'); // Replace with your app's URL

        // Check initial state
        for (let index = 1; index <= 6; index++) {
            cy.get(`#div${index}`).should('have.length', 1);
        }

        // Example drag from div1 to div2
        cy.get('#div1').trigger('mousedown', { force: true });
        cy.get('#div2').trigger('mousemove').trigger('mouseup', { force: true });

        // Check if the images were swapped
        cy.get('#div1').should('contain', 'Image 2'); // Now should have content of div2
        cy.get('#div2').should('contain', 'Image 1'); // Now should have content of div1
    });
});

