/* Library adn Book Object/Methods */
function Library() {
    this.Collection = [];

    this.addBookToLibrary = function (Book) {
        this.Collection.push(Book);
    }
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

/* New Book Overlay and Button*/
function initAddBookBtn() {
    const addBookBtn = document.querySelector("#addBookBtn button");
    addBookBtn.addEventListener("click", overlayOn);
}

function overlayOn(e) {
    e.stopPropagation();
    document.getElementById("addBookOverlay").style.display = "block";
    document.addEventListener("click", overlayExit);
}

function overlayExit(e) {
    if (!e.target.closest(".overlay")) {
        overlayOff();
    }
}

function overlayOff() {
    document.getElementById("addBookOverlay").style.display = "none";
    document.removeEventListener("click", overlayExit);
}

/* Book Display */
function displayBooks(Library) {
    //Remove previous display of books
    const books = document.getElementById("books");
    while(books.firstChild){
        books.removeChild(books.lastChild);
    }

    //Update the display with all current books in the library
    Library.Collection.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book");

        const title = document.createElement("div");
        title.textContent = book.title;
        title.setAttribute("class", "info");
        bookCard.appendChild(title);

        const author = document.createElement("div");
        author.textContent = book.author;
        author.setAttribute("class", "info");
        bookCard.appendChild(author);

        const pages = document.createElement("div");
        pages.textContent = book.pages;
        pages.setAttribute("class", "info");
        bookCard.appendChild(pages);

        const isRead = document.createElement("div");
        isRead.textContent = book.isRead;
        isRead.setAttribute("class", "info");
        bookCard.appendChild(isRead);

        books.appendChild(bookCard);
    });
}

/* Forms */
function submitFormEventListener() {
    const form = document.getElementById("addBookForm");
    form.addEventListener("submit", parseForm);
}

function parseForm(e) {
    //Prevent the submit button from refreshing the page
    e.preventDefault();

    //Parse the form data for the new book entry
    const title = this.elements["title"].value;
    const author = this.elements["author"].value;
    const pages = this.elements["pages"].value;
    const isRead = this.elements["isRead"].checked;
    let book = new Book(title, author, pages, isRead);

    //Add book to library and update the display
    myLib.addBookToLibrary(book);
    displayBooks(myLib);

    //Reset the form and turn off the overlay
    this.reset();
    overlayOff();

}


const Inferno = new Book("Inferno", "Dante", 300, false);
const Test = new Book("Test", "Myself", 200, true);
const Another = new Book("Another", "Myself", 100, true);

let myLib = new Library();
myLib.addBookToLibrary(Inferno);
myLib.addBookToLibrary(Test);
myLib.addBookToLibrary(Another);

displayBooks(myLib);
initAddBookBtn();
submitFormEventListener();

