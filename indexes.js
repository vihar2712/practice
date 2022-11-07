console.log("this is indexes.js and uses es6 classes");

class Book{
    constructor(name,author,type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{
    add(book){
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr> `;
        tableBody.innerHTML += uiString;
    }

    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }
        else{
            return true;
        }
    }
    show(type,message){
        let boldText;
        let msg = document.getElementById('msg');
        if(type=='success')
        {
            boldText = 'Success!';
        }
        else{
            boldText = 'Error!'
        }
        msg.innerHTML = `
                        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}</strong> ${message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
        setTimeout(function()
        {
            msg.innerHTML = '';
        },2000)
    }
}

// add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);

function libraryFormSubmit(e){
    console.log('you have submited library form.');
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
    let book = new Book(name,author,type);
    console.log(book);
    e.preventDefault();

    let display = new Display();
    if(display.validate(book)){

        display.add(book);
        display.clear();
        display.show('success','book has been succesfully added');
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
    nameObj.push(myObj);
    localStorage.setItem("name2", JSON.stringify(nameObj));
}
