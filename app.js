//Book Class : This Class will represent a book 
class Book {
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};




//UI Class : Handle  UI tasks 

class UI {

    static displayBooks(){ //method to display books 
          
          const storedBooks = [
              {
                  title: 'Beginners C# Programming',
                  author: 'Charles Babage',
                  isbn: '645446'
             },

             {
                 
                title: 'Data Science Advance',
                author: 'Mobeen Muvania ',
                isbn: '45536'

             }

          ];

          const books = storedBooks;
          books.forEach((index) =>  UI.addBooks(index));
           

            


    }


    static addBooks(index){
        const list = document.querySelector('#book-list');
        const row =  document.createElement('tr');
        row.innerHTML = `
         <td>${index.title}</td>
         <td>${index.author}</td>
         <td>${index.isbn}</td>
         <td><a href="#" class= "btn btn-danger  sm delete">X</a></td>
        `;

        list.appendChild(row);
       
       
    }
   
     static delete(element)
     {
         if(element.classList.contains('delete'))
         {
              element.parentElement.parentElement.remove();
             
         }
     }

    
     static showAlert(message,err)
     {
         const div =  document.createElement('div');
         div.className = `alert alert-${err}`;
         const child =  document.createTextNode(message);
         div.appendChild(child);

         const container =  document.querySelector('.container');
         const form =  document.querySelector('.book-form');

         container.insertBefore(div,form);

         setTimeout(() => {
             document.querySelector('.alert').remove();
         },3000);
   

     }
    static clearFields(){
        document.querySelector("#title").value = ' ';
        document.querySelector("#author").value = ' ';
        document.querySelector("#isbn").value = ' ';
    }

     
} 


//Store  Class:  Handles Storage 

class Storage{

   static getBooks(){
       let books;

       if(localStorage.getItem('books' === null))
       {
           books= [];
       }else{
           books = JSON.parse (localStorage.getItem('books'));
       }
       return books;


    }


    static addBooks(book)
    {
        const books =  Storage.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));


    }


    static removeBook(isbn)
    {
           const books =  Storage.getBooks();
           
           books.forEach((book , index) => {
            if(book.isbn === isbn)
            {
                books.splice(index,1);  
            }
           })


           localStorage.setItem('books',JSON.stringify(books));

    }

}


//Event: Display Book 
document.addEventListener("DOMContentLoaded", UI.displayBooks); 




//Event: Add a book 

document.querySelector(".book-form").addEventListener('submit', (e) => {
    e.preventDefault();
    const titleBook =  document.querySelector("#title").value;
    const author =  document.querySelector("#author").value;
    const isbn  = document.querySelector("#isbn").value;

    //validation 
    if(title ===  ' ' || author === ' ' || isbn === '')
    {
      UI.showAlert("Please Fill All the Fields ", 'danger');

    }else{
           
    const book = new Book(titleBook , author,isbn);

    //add a book to a ui 
     UI.addBooks(book);

     //clear fields
     UI.showAlert("Your Book Has Been Added to the List",'success');    

     UI.clearFields();  

    console.log(book);
        
    }    
    

});


//Event: Remove a book 

document.querySelector('#book-list').addEventListener('click', (e) => {
        
    UI.delete(e.target);

    UI.showAlert("Book Removed From the list",'success');


      
});