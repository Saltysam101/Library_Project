console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

let books = [{
    id: 1,
    title: "Name of the Wind",
    author: "Patrick Rothfuss",
    read: true
}]

class Book {
    constructor(id, title, author, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read
    }
}

class Library {
    constructor(books) {
        this.nextId = books.length
        this.books = books
    }

    markRead(checkbox, id) {
        console.log(checkbox)
        console.log(id)
        this.books.forEach(book => {
            if (id === book.id) {
                book.read = true
                checkbox.disabled = true
            }
        });
    }

    addBook() {

        console.log("added a book")
        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const read = document.getElementById("read");
        this.nextId++

            const newbook = new Book(
                this.nextId,
                title.value,
                author.value,
                read.checked
            );

        this.books.push(newbook)


        const tblBody = document.getElementById("tableBody")

        let newBookRow = document.createElement("tr");

        newBookRow.classList.add(newbook.id)
        newBookRow.addEventListener("dblclick", (event) => {
            this.removeBook(newbook.id)
        })
        let titleTd = document.createElement("td");
        let authorTd = document.createElement("td");
        let readTd = document.createElement("td");
        let readInput = document.createElement("input");
        let removeBtn = document.createElement("button")


        removeBtn.addEventListener("click", () => {
            this.removeBook(newbook.id)
        })

        readInput.type = "checkbox";
        readInput.classList.add(newbook.id)
        readInput.checked = read.checked;
        readInput.disabled = read.checked

        readInput.addEventListener("click", (event) => {
            this.markRead(event.target, newbook.id)
        })

        titleTd.textContent = title.value;
        authorTd.textContent = author.value
        removeBtn.textContent = "Remove";

        readTd.appendChild(readInput)
        newBookRow.appendChild(titleTd)
        newBookRow.appendChild(authorTd)
        newBookRow.appendChild(readTd)
        newBookRow.appendChild(removeBtn)

        tblBody.appendChild(newBookRow)
    }

    removeBook(bookId) {
        this.books = this.books.filter(({ id }) => bookId !== id)

        const tableBody = document.getElementById("tableBody")
        tableBody.removeChild(document.getElementsByClassName(bookId)[0])
    }
}

const library = new Library(books);

let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    library.addBook();
})