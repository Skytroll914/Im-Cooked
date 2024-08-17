document.addEventListener("DOMContentLoaded", function () {
    var recipeButtons = document.getElementsByClassName("recipe");
    for (var i = 0; i < recipeButtons.length; i++) {
        recipeButtons[i].addEventListener("click", function () {
            contentChange(this.value);
        });
    }
});

function contentChange(type) {
    var selections = document.querySelectorAll(".selection");
    for (var i = 0; i < selections.length; i++) {
        selections[i].style.display = "none";
    }

    var selectedElements = document.querySelectorAll(".selection." + type);
    for (var i = 0; i < selectedElements.length; i++) {
        selectedElements[i].style.display = "block";
    }
}

// Function to get favorites from local storage
function getFavoritesFromLocalStorage() {
    let favorites = localStorage.getItem('favoriteRecipes');
    return favorites ? JSON.parse(favorites) : [];
}

// Function to save favorites to local storage
function saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}

// Tooltip initialization
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function toggleStar(element) {
    // Get the recipe value from the parent container
    const recipeContainer = element.closest('.recipes');
    const recipeValue = recipeContainer.getAttribute('value');
    const favorites = getFavoritesFromLocalStorage();

    // Find all star icons for this recipe across all tabs
    const allStars = document.querySelectorAll(`.recipes[value="${recipeValue}"] .bi-star, .recipes[value="${recipeValue}"] .bi-star-fill`);

    let isFavorite = element.classList.contains('star-deactive');

    allStars.forEach(star => {
        if (isFavorite) {
            // Change to active star
            star.classList.remove('bi-star', 'star-deactive');
            star.classList.add('bi-star-fill', 'star-active');
            star.setAttribute('data-bs-title', 'Remove From Favorite');

            // Add recipe to favorites if it's not already there
            if (!favorites.includes(recipeValue)) {
                favorites.push(recipeValue);
            }
        } else {
            // Change back to deactive star
            star.classList.remove('bi-star-fill', 'star-active');
            star.classList.add('bi-star', 'star-deactive');
            star.setAttribute('data-bs-title', 'Add To Favourite');

            // Remove recipe from favorites
            const index = favorites.indexOf(recipeValue);
            if (index > -1) {
                favorites.splice(index, 1);
            }
        }

        // Reinitialize the tooltip
        var tooltip = bootstrap.Tooltip.getInstance(star);
        if (tooltip) {
            tooltip.dispose();
        }
        new bootstrap.Tooltip(star);
    });

    saveFavoritesToLocalStorage(favorites);

    // Update the "Add to Favourite" tab
    updateFavoriteTab(recipeValue, isFavorite);
}

function updateFavoriteTab(recipeValue, isFavorite) {
    const favoriteTab = document.getElementById('nav-starred');
    const recipeInFavorite = favoriteTab.querySelector(`.recipes[value="${recipeValue}"]`);

    if (recipeInFavorite) {
        if (isFavorite) {
            recipeInFavorite.style.display = 'block';
        } else {
            recipeInFavorite.style.display = 'none';
        }
    }


}

// Event listener for star icons
document.querySelectorAll('.star-active, .star-deactive').forEach(function (star) {
    star.addEventListener('click', function () {
        toggleStar(this);
    });
});

// Initial setup: hide all recipes in the Favorites tab that are not starred
function initializeFavoriteTab() {
    const favoriteRecipes = getFavoritesFromLocalStorage();

    favoriteRecipes.forEach(recipeValue => {
        // Find all star icons for this recipe across all tabs
        const allStars = document.querySelectorAll(`.recipes[value="${recipeValue}"] .bi-star, .recipes[value="${recipeValue}"] .bi-star-fill`);

        allStars.forEach(star => {
            star.classList.remove('bi-star', 'star-deactive');
            star.classList.add('bi-star-fill', 'star-active');
            star.setAttribute('data-bs-title', 'Remove From Favorite');

            // Reinitialize tooltip
            var tooltip = bootstrap.Tooltip.getInstance(star);
            if (tooltip) {
                tooltip.dispose();
            }
            new bootstrap.Tooltip(star);
        });
    });

    // Hide all recipes in the Favorites tab that are not starred
    const favoriteTab = document.getElementById('nav-starred');
    const recipes = favoriteTab.querySelectorAll('.recipes');

    recipes.forEach(recipe => {
        const star = recipe.querySelector('.bi-star, .bi-star-fill');
        if (star && star.classList.contains('star-deactive')) {
            recipe.style.display = 'none';
        }
    });
}

// Call the initialization function when the page loads
document.addEventListener('DOMContentLoaded', initializeFavoriteTab);

//---------------------------------------------------------------------------------

function setupRecipeClickHandlers() {
    // Select all recipe containers
    const recipeContainers = document.querySelectorAll('.recipes');

    recipeContainers.forEach(container => {
        container.addEventListener('click', function (event) {
            // Prevent the default action for the star icon
            if (event.target.classList.contains('bi-star') || event.target.classList.contains('bi-star-fill')) {
                event.stopPropagation();
                return;
            }

            // Get the recipe value from the value attribute
            const recipeValue = this.getAttribute('value');

            // Navigate to showWholeRecipe.html with the value as a query parameter
            window.location.href = `showWholeRecipe.html?recipe=${encodeURIComponent(recipeValue)}`;
        });
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupRecipeClickHandlers);
