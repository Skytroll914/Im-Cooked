// Tooltip initialization
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Function to handle the copy recipe button
function handleCopyRecipe(button) {
    const recipeSection = button.closest('.recipe-section');
    const ingredients = recipeSection.querySelector('.ingredients-list').innerText;
    const instructions = recipeSection.querySelector('.instructions-list').innerText;
    const fullText = `Ingredients:\n${ingredients}\n\nInstructions:\n${instructions}`;

    navigator.clipboard.writeText(fullText);

    const toast = recipeSection.querySelector('.toast#liveToast');
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toast);
    toastInstance.show();
}

// Function to handle the copy link button
function handleCopyLink(button) {
    navigator.clipboard.writeText(window.location.href);

    const recipeSection = button.closest('.recipe-section');
    const toast = recipeSection.querySelector('.toast#liveToast2');
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toast);
    toastInstance.show();
}

// Attach event listeners for the copy recipe buttons
document.querySelectorAll('.copy-recipe-btn').forEach(button => {
    button.addEventListener('click', function () {
        handleCopyRecipe(button);
    });
});

// Attach event listeners for the copy link buttons
document.querySelectorAll('.copy-link-btn').forEach(button => {
    button.addEventListener('click', function () {
        handleCopyLink(button);
    });
});

// Play Text-to-Speech and Show Toast
document.querySelectorAll('.play-speech-btn').forEach(button => {
    button.addEventListener('click', function () {
        const recipeSection = button.closest('.recipe-section');
        const audioToastEl = recipeSection.querySelector('#audioToast');
        const speechAudio = audioToastEl.querySelector('#speechAudio');

        const audioToast = new bootstrap.Toast(audioToastEl, {
            autohide: false // Prevent the toast from auto-hiding
        });

        audioToast.show(); // Show the toast
        speechAudio.currentTime = 0; // Reset audio to the beginning
        speechAudio.play(); // Play the audio

        // Event Listener for Toast Hide (When the user closes the toast)
        audioToastEl.addEventListener('hidden.bs.toast', function () {
            speechAudio.pause(); // Pause the audio
            speechAudio.currentTime = 0; // Reset audio to the beginning
        });
    });
});

// Function to show recipe based on URL parameter
function showRecipe() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = urlParams.get('recipe');

    if (recipeName) {
        // Hide all recipe sections
        document.querySelectorAll('.recipe-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show the specific recipe section
        const recipeSection = document.querySelector(`.${recipeName}`);
        if (recipeSection) {
            recipeSection.style.display = 'block';
        }
    } else {
        // If no recipe parameter is found, show all recipes
        document.querySelectorAll('.recipe-section').forEach(section => {
            section.style.display = 'block';
        });
    }
}

// Call showRecipe function on page load
window.onload = showRecipe;

document.querySelector("#return").addEventListener("click", function() {
    window.location.href = "recipe.html";
});
