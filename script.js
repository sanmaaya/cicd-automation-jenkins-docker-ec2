// Blog data array representing our dynamic content
const blogPosts = [
    {
        title: "The Return of Supersonic Passenger Flights",
        category: "Innovation",
        excerpt: "Our new Mach 2.5 passenger jet is entering its final testing phase, promising to cut transatlantic flight times in half by next year.",
        image: "https://images.unsplash.com/photo-1540829016269-e05670f88adb?auto=format&fit=crop&q=80&w=1000",
        link: "#"
    },
    {
        title: "Zero-Emission Hydrogen Engines",
        category: "Sustainability",
        excerpt: "AeroDynamics has successfully tested the world's first fully hydrogen-powered commercial aircraft engine, producing zero carbon emissions.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000",
        link: "#"
    },
    {
        title: "Next-Gen Aerodynamics",
        category: "Engineering",
        excerpt: "Discover how AI-driven computational fluid dynamics helped us design our new swept-wing architecture, maximizing fuel efficiency.",
        image: "https://images.unsplash.com/photo-1559092497-2ee0f1d322ff?auto=format&fit=crop&q=80&w=1000",
        link: "#"
    }
];

// Function to render blogs dynamically into the DOM
function renderBlogs() {
    const container = document.getElementById('blog-container');
    
    blogPosts.forEach(post => {
        // Create card element
        const card = document.createElement('article');
        card.className = 'blog-card';
        
        // Inner HTML for the card
        card.innerHTML = `
            <div class="card-image" style="background-image: url('${post.image}');"></div>
            <div class="card-content">
                <span class="category">${post.category}</span>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <a href="${post.link}" class="read-more">Read Full Article</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Render the blogs when the window loads
window.onload = renderBlogs;
