console.log('this is index.js');
// constructor

function Book(serial,name,author,type){
    this.serial = serial;
    this.name = name;
    this.author = author;
    this.type = type;
}

// display prototype
function Display(){

}


// add methods to display prototype
Display.prototype.add = function(book){
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    uiString = `
                <tr>
                    <td> ${book.serial}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    <td><button id="${book.name}"onclick="deleteBook(this.id)">Delete Book</button></td>
                </tr> `;
    tableBody.innerHTML += uiString;
}

// implement the clear function
Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// implement the validate function
Display.prototype.validate = function(book){
    if(book.name.length<2 || book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}

// implement the show function
Display.prototype.show = function(type,message){
    let msg = document.getElementById('msg');
    msg.innerHTML = `
                    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message:</strong> ${message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
    setTimeout(function()
    {
        msg.innerHTML = '';
    },2000)
}

// add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);

let serial = 1;
function libraryFormSubmit(e){
    console.log('you have submited library form.');
    // document.getElementById('serial').value;
    let name=document.getElementById('bookName').value;
    let author=document.getElementById('authorName').value;
    let fiction=document.getElementById('fiction');
    let prog=document.getElementById('programming');
    let cooking=document.getElementById('cooking');
    let type;
    if(fiction.checked){
        type = fiction.value;
    }
    else if(prog.checked){
        type = prog.value;
    }
    else if(cooking.checked){
        type = cooking.value;
    }
    let book = new Book(serial,name,author,type);
    console.log(book);
    e.preventDefault();

    let display = new Display();
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success','book has been succesfully added');
        serial+=1;
    }
    else{
        display.show('danger','sorry, book has not been added.');
    }
    // add items to local storage
    let name2 = localStorage.getItem('name2');
    if (name2 == null) {
        nameObj = [];
    }
    else {
        nameObj = JSON.parse(name2);
    }
    let myObj = 
    {
        nameofBook:name,
        authorName:author,
        typeOfBook:type
    };
    if(myObj.nameofBook =='' ||myObj.authorName =='')
    {
        return false;
    }
    else{
        nameObj.push(myObj);
    }
    localStorage.setItem("name2", JSON.stringify(nameObj));
    
}
    function deleteBook(nameofBook) {
        console.log('I am deleting ', nameofBook);
        let name2 = localStorage.getItem('name2');
        if (name2 == null) {
            nameObj = [];
        }
        else {
            nameObj = JSON.parse(name2);
        }
        nameObj.splice(nameofBook.serial-1, 1);
        localStorage.setItem("name2", JSON.stringify(nameObj));
    }
    
// localStorage.clear();