const postsContainer = document.getElementById("posts");
const postContainer = document.getElementById("post-container");

async function loadPosts() {
  const response = await fetch("posts.json");
  const posts = await response.json();

  if (postsContainer) {
    renderPosts(posts);
  }

  if (postContainer) {
    renderSinglePost(posts);
  }
}

function renderPosts(posts) {
  postsContainer.innerHTML = posts.map(post => `
    <div class="post-card">
      <img src="${post.image}" alt="${post.title}" />

      <div class="post-content">
        <h2>${post.title}</h2>
        <p>${post.description}</p>

        <a class="read-btn" href="post.html?slug=${post.slug}">
          Čítať viac
        </a>
      </div>
    </div>
  `).join("");
}

function renderSinglePost(posts) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    postContainer.innerHTML = "<h1>Post neexistuje</h1>";
    return;
  }

  postContainer.innerHTML = `
    <img src="${post.image}" alt="${post.title}" />
    <h1>${post.title}</h1>
    <p>${post.content}</p>
  `;
}

loadPosts();
