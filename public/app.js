async function loadPosts() {

  const res = await fetch("/api/posts");

  const posts = await res.json();

  const postsContainer = document.getElementById("posts");

  postsContainer.innerHTML = posts.map(post => `

    <div class="post">

      <img src="${post.image}" />

      <h2>${post.title}</h2>

      <p>${post.content}</p>

    </div>

  `).join("");

}

loadPosts();