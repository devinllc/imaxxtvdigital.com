function openDetailPage(title, description, imgSrc) {
    // Create URL parameters to pass data
    const params = new URLSearchParams({
        title: title,
        description: description,
        imgSrc: imgSrc
    });
    // Navigate to the detail page
    window.location.href = `/pages/detail_page/index.html?${params.toString()}`;
}


// filterssss


// Function to switch between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.show-section');
    sections.forEach(section => section.style.display = 'none'); // Hide all sections
    document.getElementById(sectionId).style.display = 'block';  // Show the selected section

    // Remove active class from all tab buttons
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.classList.remove('active-tab');
    });

    // Add active class to the clicked tab button
    const activeTab = document.querySelector(`.tab-button[onclick="showSection('${sectionId}')"]`);
    activeTab.classList.add('active-tab');
}

// Initialize by showing the Films section
document.addEventListener('DOMContentLoaded', () => {
    showSection('coming-soon');
});


// Function to filter shows by search term
// Function to filter shows by search term across all sections
function filterShows() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();

    // Loop through all sections
    document.querySelectorAll('.show-section').forEach(section => {
        // Loop through all cards in the section
        section.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();

            // Check if the title matches the search query
            const matchesSearch = title.includes(searchQuery);

            if (matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Check if the section has any visible cards
        const hasVisibleCards = Array.from(section.querySelectorAll('.card')).some(card => card.style.display === 'block');

        // Show or hide the section based on the presence of visible cards
        if (hasVisibleCards) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}
