var myBooks = [];

var addButton = document.querySelector("#add-book-button");
addButton.onclick = function(){
  var bookTitleInput = document.querySelector("#book-title");
  var bookAuthorInput = document.querySelector("#book-author");
  var bookPubdateInput = document.querySelector("#book-pubdate");
  var bookIsbnInput = document.querySelector("#book-isbn");
  var bookGenreInput = document.querySelector("#book-genre");

  createBookOnServer(bookTitleInput.value, bookAuthorInput.value, bookPubdateInput.value, bookIsbnInput.value, bookGenreInput.value);

  bookTitleInput.value = "";
  bookAuthorInput.value = "";
  bookPubdateInput.value = "";
  bookIsbnInput.value = "";
  bookGenreInput.value = "";
};

var randomButton = document.querySelector("#random-book-button");
randomButton.onclick = function () {
  var randomIndex = Math.floor(Math.random() * myBooks.length);
  var randomBook = myBooks[randomIndex];
  var randomBookSpan = document.querySelector("#random-Book-name");
  randomBookSpan.innerHTML = randomBook + " was picked. ";
};

function loadBooksFromServer(){
  fetch("https://s23-deploy-king-eliax-production.up.railway.app/books", {
    credentials: 'include'
  }).then(function(response){
    console.log("response status code", response.status);
    if (response.status == 200) {
      document.querySelector("#user-input").style.display = "none";
      document.querySelector("#book-input").style.display = "block";
    } else {
      document.querySelector("#user-input").style.display = "block";
      document.querySelector("#book-input").style.display = "none";
      console.log("returning");
      return
    }
    response.json().then(function(data){
      console.log("data received from server:", data);
      myBooks = data;

      var myList = document.querySelector("#my-book-list");

      myList.innerHTML = "";


      myBooks.forEach(function(book){
        var newItem = document.createElement("li");
        
        var titleDiv = document.createElement("div");
        titleDiv.innerHTML = book.Title;
        titleDiv.classList.add("book-title");
        newItem.appendChild(titleDiv);

        var authorDiv = document.createElement("div");
        authorDiv.innerHTML = book.Author;
        authorDiv.classList.add("book-author");
        newItem.appendChild(authorDiv);

        var pubdateDiv = document.createElement("div");
        pubdateDiv.innerHTML = book.Pubdate;
        pubdateDiv.classList.add("book-pubdate");
        newItem.appendChild(pubdateDiv);

        var isbnDiv = document.createElement("div");
        isbnDiv.innerHTML = book.ISBN;
        isbnDiv.classList.add("book-isbn");
        newItem.appendChild(isbnDiv);

        var genreDiv = document.createElement("div");
        genreDiv.innerHTML = book.Genre;
        genreDiv.classList.add("book-genre");
        newItem.appendChild(genreDiv);
  

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
          if (confirm("Are you sure you want to delete " + book.Title + "?")){
            deleteBookFromServer(book.id);
          }
        };
        newItem.appendChild(deleteButton);

        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        newItem.appendChild(editButton);
        myList.appendChild(newItem);
      });
    });
  });
}

function createBookOnServer(bookTitle, bookAuthor, bookPubdate, bookIsbn, bookGenre){
  var data = "Title=" + encodeURIComponent(bookTitle);
  data += "&Author=" + encodeURIComponent(bookAuthor);
  data += "&Pubdate=" + encodeURIComponent(bookPubdate);
  data += "&ISBN=" + encodeURIComponent(bookIsbn);
  data += "&Genre=" + encodeURIComponent(bookGenre);

  fetch("https://s23-deploy-king-eliax-production.up.railway.app/books",{
    credentials: 'include',
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response){
    if (response.status == 201) {
      loadBooksFromServer();
    } else {
      console.log("server responded with", response.status, "when trying to create a book");
    }
  });
}
loadBooksFromServer();

function deleteBookFromServer(bookId) {
  fetch("https://s23-deploy-king-eliax-production.up.railway.app/books/" + bookId, {
    method: "DELETE"
  }).then(function (response) {
    if (response.status == 200) {
      loadBooksFromServer();
    } else {
      console.log("server responded with", response.status, "when trying to delete a book");
    }
  });
} 

  

var signupButton = document.querySelector("#signup-button");
signupButton.onclick = function(){
  var firstNameInput = document.querySelector("#first-name");
  var lastNameInput = document.querySelector("#last-name");
  var emailInput = document.querySelector("#email");
  var passwordInput = document.querySelector("#password");

  createUserOnServer(firstNameInput.value, lastNameInput.value, emailInput.value, passwordInput.value);
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = ""; 
  }


var loginButton = document.querySelector("#login-button");
loginButton.onclick = function(){
  var emailInput = document.querySelector("#email");
  var passwordInput = document.querySelector("#password");

  do_login(emailInput.value, passwordInput.value);

  emailInput.value = "";
  passwordInput.value = "";
  
};


do_login = function(email, password){

  
  var auth_user = "email=" + encodeURIComponent(email);
  auth_user += "&password=" + encodeURIComponent(password);


  fetch("https://s23-deploy-king-eliax-production.up.railway.app/sessions",{
    credentials: 'include',
    method: "POST",
    body: auth_user,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      if (response.status == 201) {
        loadBooksFromServer()
        window.alert (" login successful ");
        document.querySelector("#user-input").style.display = "none";
        document.querySelector("#book-input").style.display = "block";
        } else {
          window.alert( "invalid email or password" );

          }
    });
    

  }




function createUserOnServer(firstName, lastName, email, password){
  var data = "first_name=" + encodeURIComponent(firstName);
  data += "&last_name=" + encodeURIComponent(lastName);
  data += "&email=" + encodeURIComponent(email);
  data += "&password=" + encodeURIComponent(password);


  fetch("https://s23-deploy-king-eliax-production.up.railway.app/registrations",{
    credentials: 'include',
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      if (response.status == 201) {
        alert ("new user created");
        } else {
          alert( "Email already exists" )
            console.log("server responded with", response.status, "when trying to create a user");
            }

      });
    }
