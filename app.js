
// CONSTRUCTOR

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

let display = new Display();


// add submit event listener to form

let form = document.querySelector("#libraryform");

form.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {

    console.log("submitted");

    let name = document.getElementById("bookname").value;
    let author = document.getElementById("author").value;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    let type;

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    

    if(display.validate(book))
    {
        display.add(book);
        display.ui();
        display.clear();
        display.show("success","YOUR BOOK HAS BEEN ADDED");
    }
    else
    {
        display.show("danger", "YOUR BOOK WAS NOT ADDED");
    }
    e.preventDefault();

}

// A FUNCTION TO ADD BOOKS OBJECT INTO LOCAL STORAGE
Display.prototype.add = function (book) {

    let b = localStorage.getItem("booklist");
    if (b == null) {
        bobj = [];
    }
    else {
        bobj = JSON.parse(b);
    }

    bobj.push(book);
    localStorage.setItem("booklist", JSON.stringify(bobj));

   
}

// A FUNCTION TO ADD ITEMS ON UI
Display.prototype.ui=function ui() {
    let b = localStorage.getItem("booklist");
    if (b == null) {
        bobj = [];
    }
    else {
        bobj = JSON.parse(b);
    }

    let html = "";

    for (let index = 0; index < bobj.length; index++) {
        const element = bobj[index];
        html += `<tr>
                        
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button type="button" id="${index}"class="btn btn-danger" onclick="display.del(this.id)">DELETE BOOK</button></td>
                </tr>`;
        
    }


    let tablebody = document.querySelector("#tablebody");
    
    tablebody.innerHTML = html;
}
display.ui();

// A FUNCTION TO DELETE PARTICULAR RECORD
Display.prototype.del=function(index) {
    let b = localStorage.getItem("booklist");
    if (b == null) {
        bobj = [];
    }
    else {
        bobj = JSON.parse(b);
    }

    bobj.splice(index,1);
    localStorage.setItem("booklist",JSON.stringify(bobj));

    let html="";

    for (let index = 0; index < bobj.length; index++) {
        const element = bobj[index];
        
        html += `<tr>
                        
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button type="button" id="${index}"class="btn btn-danger" onclick="display.del(this.id)">DELETE BOOK</button></td>
                </tr>`;
    }

    let tablebody = document.querySelector("#tablebody");
    
    tablebody.innerHTML = html;

}

// A FUNCTION TO CLEAR ALL THE VALUES 
Display.prototype.clear = function () {
    let form = document.querySelector("#libraryform");
    form.reset();
}


// A FUNCTION TO VALIDATE THE INPUT VALUES
Display.prototype.validate=function (book) {
    if(book.name.length>=3 && book.author.length>=3)
    {
        return true;
    }
    else
    {
        return false;
    }
}


// A FUNCTION TO DISPLAY ALERT
Display.prototype.show=function (info, details) {
    let msg=document.querySelector("#msg");
    msg.innerHTML=`<div class="alert alert-${info} alert-dismissible fade show" role="alert">
                    <strong>MESSAGE : </strong> ${details}.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
    setTimeout(() => {
        msg.innerHTML=``;
    }, 2000);
}


