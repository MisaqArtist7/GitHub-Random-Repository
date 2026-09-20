// DOM Element References
const formSection = document.querySelector('#form-section');
const form = document.querySelector('#myForm');
const selector = document.querySelector('#language-select');
const loadingOverlay = document.querySelector('#loading-overlay');
const errorContainer = document.querySelector('#error-container');
const errorMessage = document.querySelector('#error-message');

// Repository Result Card References
const repoCard = document.querySelector('#repo-card');
const repoLanguage = document.querySelector('#repo-language');
const repoTitle = document.querySelector('#repo-title');
const repoDescription = document.querySelector('#repo-description');
const repoStars = document.querySelector('#repo-stars');
const repoForks = document.querySelector('#repo-forks');
const repoIssues = document.querySelector('#repo-issues');
const repoLink = document.querySelector('#repo-link');
const resetBtn = document.querySelector('#reset-btn');

// Helper function to show errors
function showError(msg) {
    errorMessage.textContent = msg;
    errorContainer.classList.remove('hidden');
}

// Helper function to hide errors
function hideError() {
    errorContainer.classList.add('hidden');
}

// Handle Form Submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const language = selector.value;
    if (!language) {
        showError('Please select a language first.');
        return;
    }

    hideError();
    loadingOverlay.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}`);
        if (!response.ok) throw new Error('Failed to fetch data from GitHub API.');

        const result = await response.json();
        if (!result.items || result.items.length === 0) {
            showError('No repositories found for this language.');
            return;
        }

        // Pick a random repository from the API results
        const index = Math.floor(Math.random() * result.items.length);
        const repo = result.items[index];

        // Populate details into the UI
        repoLanguage.innerHTML = `<span class="w-2 h-2 rounded-full bg-indigo-400"></span> ${language}`;
        repoTitle.textContent = repo.name;
        repoTitle.href = repo.html_url;
        repoDescription.textContent = repo.description || 'No description provided for this project.';
        repoStars.textContent = repo.stargazers_count.toLocaleString();
        repoForks.textContent = repo.forks_count.toLocaleString();
        repoIssues.textContent = repo.open_issues_count.toLocaleString();
        repoLink.href = repo.html_url;

        // Switch visible section
        formSection.classList.add('hidden');
        repoCard.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        showError('Network error or GitHub API limit reached. Please try again.');
    } finally {
        loadingOverlay.classList.add('hidden');
    }
});

// Reset and Search Again Button
resetBtn.addEventListener('click', () => {
    hideError();
    repoCard.classList.add('hidden');
    formSection.classList.remove('hidden');
});