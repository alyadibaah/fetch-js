document.getElementById("search").addEventListener("click", function () {
    var searchTerm = document.getElementById("search-box").value;
    var apiUrl = "https://openlibrary.org/search/authors.json?q=https://openlibrary.org/search.json?q=harry%20potter&fields=*,availability&limit=1" + searchTerm;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayBooks(data.items);
        })
        .catch(function (error) {
            console.log(error);
        });
});

function displayBooks(books) {
    var resultContainer = document.querySelector(".container-result");
    resultContainer.innerHTML = "";

    if (books.length === 0) {
        resultContainer.innerHTML = "<p>No books found!</p>";
    } else {
        books.forEach(function (book) {
            var title = book.volumeInfo.title;
            var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
            var description = book.volumeInfo.description ? book.volumeInfo.description : "No description available";
            var thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x190";

            var bookHTML = `
                <div class="book">
                    <h3>${title}</h3>
                    <p><strong>Author(s):</strong> ${authors}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <img src="${thumbnail}" alt="${title}">
                </div>
            `;

            resultContainer.innerHTML += bookHTML;
        });
    }
}
