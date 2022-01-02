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

    this.info = function () {
        let readString = "";
        if (this.isRead == true) {
            readString = "read";
        } else {
            readString = "not read yet"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
    }

}

/* Overlay */
function overlayOn() {
    document.getElementById("addBookOverlay").style.display = "block";
}

function overlayOff() {
    document.getElementById("addBookOverlay").style.display = "none";
}


/*
const Inferno = new Book("Inferno", "Dante", 300, false);
const Test = new Book("Test", "Myself", 200, true);

let myLib = new Library();
let myLibDummy = new Library();
myLib.addBookToLibrary(Inferno);
myLib.addBookToLibrary(Test);

myLib.Collection.forEach(book => console.log(book.info()));
console.log("break");
myLibDummy.Collection.forEach(book => console.log(book.info()));
*/
