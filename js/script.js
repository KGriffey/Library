/* Library and Book Object/Methods */
function Library() {
    this.Collection = [];

    this.addBook = function (Book) {
        this.Collection.push(Book);
    }

    this.hasBook = function(title, author){
        for(let i = 0; i < this.Collection.length; i++){
            if(this.Collection[i].title.toLowerCase() == title.toLowerCase() 
            && this.Collection[i].author.toLowerCase() == author.toLowerCase()){
                return true;
            }
        }
        return false;
    }
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

/* Book Display */
function displayLibrary() {
    //Remove previous display of books
    const books = document.getElementById("books");
    while(books.firstChild){
        books.removeChild(books.lastChild);
    }

    //Update the display with all current books in the library
    myLib.Collection.forEach(book => {
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

function updateLibrary(){
    //Check the entered info for validity before creating the new book.
    //Return error message if info needs fixing and exit function.
    const bookInfo = getBookInfo();
    if(!isBookInfoValid(bookInfo)){
        return;
    }
    let newBook = new Book(bookInfo[0],bookInfo[1],bookInfo[2],bookInfo[3]);

    //Add the book to the user's library
    myLib.addBook(newBook);

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
    const bookInfo = [title,author,pages,isRead];

    //Return info as an array
    return bookInfo;
}

function isBookInfoValid(bookInfo) {
    if(bookInfo[0] == "" || bookInfo[1] == "" || bookInfo[2] == "") {
        //Check for a blank field
        alert("All fields must be filled.")
        return false;
    } else if (bookInfo[2] < 1 || !Number.isInteger(Number(bookInfo[2]))) {
        //Check that page count is a positive integer
        alert("Page count invalid.")
        return false;
    } else if (myLib.hasBook(bookInfo[0],bookInfo[1])) {
        //Check if the same title/author combination exists in the library
        alert("This book is already in your collection!")
        return false;
    } else {
        return true;
    }
}

const modalBackground = document.querySelector(".modal-background");
const addBookBtn = document.getElementById("addBookBtn");
const modalExitBtn = document.querySelector(".modal-exit");
const modalSubmitBtn = document.querySelector(".submit");

modalExitBtn.addEventListener("click", function() {
    modalBackground.classList.remove("modal-background--active");
});

addBookBtn.addEventListener("click", function() {
    modalBackground.classList.add("modal-background--active");
});

modalSubmitBtn.addEventListener("click", updateLibrary);

const Inferno = new Book("Inferno", "Dante", 300, false);
const Test = new Book("Test", "Myself", 200, true);
let myLib = new Library();
myLib.addBook(Inferno);
myLib.addBook(Test);

displayLibrary();
