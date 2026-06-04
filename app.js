const API_URL = "https://jsonplaceholder.typicode.com/comments";
const dashboard = document.getElementById("dashboard");

async function fetchComments() {
  try {
    const response = await fetch(`${API_URL}?_limit=12`);
    const comments = await response.json();
    dashboard.innerHTML = "";

    comments.forEach((comment) => {
      const card = document.createElement("div");
      card.className = "card";
      card.id = `comment-${comment.id}`;

      card.innerHTML = `
                <div>
                    <div class="comment-name">${comment.name}</div>
                    <div class="comment-email">${comment.email}</div>
                    <div class="comment-body">${comment.body}</div>
                </div>
                <div class="card-actions">
                    <button class="btn-mask" onclick="maskEmail(${comment.id})">Mask Email</button>
                    <button class="btn-delete" onclick="deleteComment(${comment.id})">Delete</button>
                </div>
            `;
      dashboard.appendChild(card);
    });
  } catch (error) {
    console.error("Fetch implementation error:", error);
  }
}

async function maskEmail(id) {
  const cardElement = document.getElementById(`comment-${id}`);
  const emailElement = cardElement.querySelector(".comment-email");
  const currentEmail = emailElement.innerText;

  if (currentEmail.includes("*******")) return;

  const parts = currentEmail.split("@");
  if (parts.length !== 2) return;

  const maskedEmail = `${parts[0]}@*******.***`;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ email: maskedEmail }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) {
      emailElement.innerText = maskedEmail;
    }
  } catch (error) {
    console.error("Email patch update failure:", error);
  }
}

async function deleteComment(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) {
      document.getElementById(`comment-${id}`).remove();
    }
  } catch (error) {
    console.error("Delete operation failure:", error);
  }
}

fetchComments();
