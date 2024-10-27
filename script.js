document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('main-search');
    const resultsSection = document.getElementById('results');
    let topicsData = [];

    fetch('topics.json')
        .then(response => response.json())
        .then(data => {
            topicsData = data;
        })
        .catch(error => {
            console.error('JSON verisi yüklenirken bir hata oluştu:', error);
        });

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();

        if (query === '') {
            resultsSection.classList.remove('show');
            resultsSection.style.display = 'none';
            resultsSection.style.opacity = '0';
            return;
        }

        const filteredData = topicsData.filter(item =>
            item.topic.toLowerCase().includes(query) ||
            item.tool.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

        if (filteredData.length > 0) {
            resultsSection.innerHTML = filteredData.map(item => `
                <a href="pages/${item.grade}.html" class="result-item"> <!-- URL'yi burada ayarlıyoruz -->
                    <div class="result-content">
                        <h3>${item.topic}</h3>
                        <p>${item.description}</p>
                    </div>
                    <div class="result-meta">
                        <div class="app-label">
                            <img src="${item.image}" alt="${item.tool} icon" class="tool-image">
                            <div class="class-label class-${item.grade}">${item.grade}. Sınıf</div>
                        </div>
                        <div class="tool-name">${item.tool}</div>
                    </div>
                </a>
            `).join('');

            resultsSection.style.display = 'block';
            resultsSection.style.opacity = '1';
            resultsSection.classList.add('show');
        } else {
            resultsSection.classList.remove('show');
            resultsSection.style.display = 'none';
            resultsSection.style.opacity = '0';
        }
    });
});

document.querySelectorAll('.powtoon-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.target.classList.add('clicked');
    });
});

window.addEventListener("scroll", function() {
    const progressBar = document.getElementById("progress-bar");
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + "%";
});
