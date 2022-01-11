class Library {
    constructor() {
        this.collection = [];
    }
    

    addBook(Book) {
        this.collection.push(Book);
    }

    removeBook(index) {
        this.collection.splice(index, 1);
    }

    hasBook(title, author) {
        for (let i = 0; i < this.collection.length; i++) {
            if (this.collection[i].title.toLowerCase() == title.toLowerCase()
                && this.collection[i].author.toLowerCase() == author.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
}

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleIsRead() {
        this.isRead = !this.isRead;
    }
}

/* Book Display */
function displayLibrary() {
    //Remove previous display of books
    const books = document.getElementById("books");
    while (books.firstChild) {
        books.removeChild(books.lastChild);
    }

    //Update the display with all current books in the library
    userLibrary.collection.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book");
        bookCard.setAttribute("data-library-index", index);

        const title = document.createElement("div");
        title.textContent = book.title;
        title.setAttribute("class", "title");
        bookCard.appendChild(title);

        const author = document.createElement("div");
        author.textContent = book.author;
        author.setAttribute("class", "author");
        bookCard.appendChild(author);

        const pages = document.createElement("div");
        pages.textContent = `${book.pages} pages`;
        pages.setAttribute("class", "pages");
        bookCard.appendChild(pages);

        const isReadToggleBtn = document.createElement("button");
        if (book.isRead == true) {
            isReadToggleBtn.textContent = "Read";
            isReadToggleBtn.style.backgroundColor = "#47D147"
        } else {
            isReadToggleBtn.textContent = "Not Read";
            isReadToggleBtn.style.backgroundColor = "#FF4D4D"
        }
        isReadToggleBtn.setAttribute("class", "isReadToggleBtn");

        bookCard.appendChild(isReadToggleBtn);
        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "Remove";
        removeBookBtn.setAttribute("class", "removeBookBtn");
        bookCard.appendChild(removeBookBtn);



        books.appendChild(bookCard);
    });

    //Assign event listeners to the dynamic buttons for removeBook / readToggle
    const isReadToggleBtns = document.querySelectorAll(".isReadToggleBtn");
    const removeBookBtns = document.querySelectorAll(".removeBookBtn");

    removeBookBtns.forEach(button => {
        button.addEventListener("click", removeBook);
    });

    isReadToggleBtns.forEach(button => {
        button.addEventListener("click", toggleBookRead);
    });
}

function addBook() {
    //Check the entered info for validity before creating the new book.
    //Return error message if info needs fixing and exit function.
    const bookInfo = getBookInfo();
    if (!isBookInfoValid(bookInfo)) {
        return;
    }
    let newBook = new Book(bookInfo[0], bookInfo[1], bookInfo[2], bookInfo[3]);

    //Add the book to the user's library
    userLibrary.addBook(newBook);

    //Update the library display
    displayLibrary();

    //Remove the modal
    modalBackground.classList.remove("modal-background--active");
}

function getBookInfo() {
    //Get new book info from input fields
    const title = document.querySelector('[name="title"]').value;
    const author = document.querySelector('[name="author"]').value;
    const pages = document.querySelector('[name="pages"]').value;
    const isRead = document.querySelector('[name="isRead"]').checked;
    const bookInfo = [title, author, pages, isRead];

    //Return info as an array
    return bookInfo;
}

function isBookInfoValid(bookInfo) {
    if (bookInfo[0] == "" || bookInfo[1] == "" || bookInfo[2] == "") {
        //Check for a blank field
        alert("All fields must be filled.")
        return false;
    } else if (bookInfo[2] < 1 || !Number.isInteger(Number(bookInfo[2]))) {
        //Check that page count is a positive integer
        alert("Page count invalid.")
        return false;
    } else if (userLibrary.hasBook(bookInfo[0], bookInfo[1])) {
        //Check if the same title/author combination exists in the library
        alert("This book is already in your collection!")
        return false;
    } else {
        return true;
    }
}

function removeBook() {
    //Get the index of the book and remove it
    const bookIndex = this.parentElement.getAttribute("data-library-index");
    userLibrary.removeBook(bookIndex);

    //Redisplay the library
    displayLibrary();
}

function toggleBookRead() {
    //Get the index of the book and toggle the read status
    const bookIndex = this.parentElement.getAttribute("data-library-index");
    userLibrary.collection[bookIndex].toggleIsRead();

    //Redisplay the library
    displayLibrary();
}

function setLibraryCollection() {
    //Retrieve user collection from local storage if available
    const userCollection = JSON.parse(window.localStorage.getItem("collection")).collection;
    if (userCollection != null) {
        for (let i = 0; i < userCollection.length; i++) {
            const currBook = new Book(userCollection[i].title, userCollection[i].author, userCollection[i].pages, userCollection[i].isRead);
            userLibrary.addBook(currBook);
        }
    }
}

//Static buttons and event listeners
const modalBackground = document.querySelector(".modal-background");
const addBookBtn = document.getElementById("addBookBtn");
const modalExitBtn = document.querySelector(".modal-exit");
const modalSubmitBtn = document.querySelector(".submit");

modalExitBtn.addEventListener("click", function () {
    modalBackground.classList.remove("modal-background--active");
});

addBookBtn.addEventListener("click", function (e) {
    modalBackground.classList.add("modal-background--active");
    e.stopPropagation(); //Needed to prevent bubbling and immediately closing the modal
});

document.addEventListener("click", function (e) {
    if (!e.target.closest(".modal")) {
        modalBackground.classList.remove("modal-background--active");
    }
});

modalSubmitBtn.addEventListener("click", addBook);

//Update localsotrage on end of user session
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        window.localStorage.setItem("collection", JSON.stringify(userLibrary));
    }
});

// Main //
// Get user's Library or create one if it doesn't exist  //
let userLibrary = new Library();
setLibraryCollection();
displayLibrary();