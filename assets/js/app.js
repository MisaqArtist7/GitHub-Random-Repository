const selector = document.querySelector('#language-select');
const form = document.querySelector('#myForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const language = selector.value;
    const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}`);
    try {
        const result = await response.json();
        const index = Math.floor(Math.random() * result.items.length);

        const repository = result.items[index];

        console.log(repository.name);
        console.log(repository.description);
        console.log(repository.stargazers_count);
        console.log(repository.forks_count);
        console.log(repository.open_issues_count);
        console.log(repository.html_url);

    } catch (error) {
        console.log(error)
    }
});
