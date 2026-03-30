let container = document.querySelector(".card_container");

fetch("https://jsonplaceholder.typicode.com/posts")
.then(res => res.json())
.then(data => {
    container.innerHTML = "";
    data.forEach(item => {
        container.innerHTML += `
            <div class="card" data-userid="${item.userId}">
                <div class="head">
                    <img src="Assets/male_pic.png" width="80" height="80">
                    <h3>User Post</h3>
                </div>
                <h5 style="text-align:center">${item.title}</h5>
                <p>${item.body}</p>
                <button class="detail_btn">Interested</button>
            </div>
        `;
    });
})
.catch(err => console.log(err));

container.addEventListener("click", function (e) {
    let card = e.target.closest(".card");
    if (!card) return;

    if (e.target.classList.contains("detail_btn")) {
        // Asal content ko save karna taake 'Back' par wapis dikha sakain
        card.dataset.original = card.innerHTML;

        let userId = card.getAttribute("data-userid");

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            card.innerHTML = `
                <div class="head">
                    <img src="https://i.pravatar.cc/150?u=${userId}" width="80" height="80" style="border-radius: 50%; object-fit: cover;">
                    <h3>${user.name}</h3>
                </div>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Phone:</b> ${user.phone}</p>
                <p><b>Company:</b> ${user.company.name}</p>
                <button class="back_btn">Back</button>
            `;
        });
    }

    if (e.target.classList.contains("back_btn")) {
        // Saved content wapis lana
        card.innerHTML = card.dataset.original;
    }
});