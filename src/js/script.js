{
  // const render = function () {
  //   const bookTemplates = {
  //     books: Handlebars.compile(
  //       document.querySelector('#template-book').innerHTML
  //     ),
  //   };

  //   for (const book of dataSource.books) {
  //     //   console.log(book);
  //     //   const ratingBgc = determineRatingBgc(book.rating);
  //     //   const ratingWidth = book.rating * 10;
  //     book.ratingBgc = determineRatingBgc(book.rating);
  //     book.ratingWidth = book.rating * 10;

  //     const generatedHTML = bookTemplates.books(book);

  //     const domElement = utils.createDOMFromHTML(generatedHTML);

  //     const bookContainer = document.querySelector('.books-list');

  //     bookContainer.appendChild(domElement);

  //     console.log(book);
  //   }
  // };

  // const favoriteBooks = [];

  // const initActions = function () {
  //   const books = document.querySelector('.books-list');
  //   // console.log(books);
  //   books.addEventListener('dblclick', function (e) {
  //     //   console.log('dblclikc works');
  //     //   console.log(e.target.offsetParent.classList.contains('book__image'));
  //     if (e.target.offsetParent.classList.contains('book__image')) {
  //       e.preventDefault();
  //       const bookId = e.target.offsetParent.getAttribute('data-id');
  //       if (!favoriteBooks.includes(bookId)) {
  //         e.target.offsetParent.classList.add('favorite');
  //         favoriteBooks.push(bookId);
  //       } else {
  //         e.target.offsetParent.classList.remove('favorite');
  //         favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
  //       }
  //       console.log(favoriteBooks);
  //     }
  //   });

  //   form.addEventListener('click', function (e) {
  //     if (
  //       e.target.tagName == 'INPUT' &&
  //       e.target.type == 'checkbox' &&
  //       e.target.name == 'filter'
  //     ) {
  //       // console.log(e.target.value);
  //       if (e.target.checked) {
  //         filters.push(e.target.value);
  //       } else {
  //         filters.splice(filters.indexOf(e.target.value), 1);
  //       }
  //       console.log(filters);
  //     }
  //     //   filterBooks();
  //     const inputs = document.querySelectorAll('.filters input');
  //     for (let input of inputs) {
  //       input.addEventListener('change', filterBooks);
  //     }
  //   });
  // };

  // const filters = [];

  // const form = document.querySelector('.filters');

  // const filterBooks = function () {
  //   console.log('zmiana');
  //   for (const book of dataSource.books) {
  //     let shouldBeHidden = false;
  //     for (const filter of filters) {
  //       if (!book.details[filter]) {
  //         shouldBeHidden = true;
  //         break;
  //       }
  //     }
  //     if (shouldBeHidden) {
  //       document
  //         .querySelector(`[data-id="${book.id}"]`)
  //         .classList.add('hidden');
  //     } else {
  //       document
  //         .querySelector(`[data-id="${book.id}"]`)
  //         .classList.remove('hidden');
  //     }
  //   }
  // };

  // const determineRatingBgc = function (rating) {
  //   if (rating <= 6)
  //     return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  //   else if (rating > 6 && rating <= 8)
  //     return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  //   else if (rating > 8 && rating <= 9)
  //     return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  //   else if (rating > 9)
  //     return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  // };

  // render();
  // initActions();

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    all: {
      filterForm: '.filters',
      filtersInputs: '.filters input',
    },
  };

  class BooksList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];

      this.initData();
      this.renderBooks();
      this.getElements();
      this.initActions();
    }

    initData() {
      this.data = dataSource.books;
    }

    renderBooks() {
      const bookTemplates = {
        books: Handlebars.compile(
          document.querySelector(select.templateOf.book).innerHTML
        ),
      };

      for (const book of this.data) {
        book.ratingBgc = this.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = bookTemplates.books(book);
        const bookHTML = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(
          select.containerOf.bookList
        );
        booksContainer.appendChild(bookHTML);
      }
    }

    getElements() {
      this.dom = {};
      this.dom.books = document.querySelector(select.containerOf.bookList);
      this.dom.filterForm = document.querySelector(select.all.filterForm);
      this.dom.filterInputs = document.querySelectorAll(
        select.all.filtersInputs
      );
    }

    initActions() {
      this.dom.books.addEventListener('click', (e) => {
        e.preventDefault();
      });

      this.dom.books.addEventListener('dblclick', (e) => {
        if (e.target.offsetParent.classList.contains('book__image')) {
          e.preventDefault();
          const bookId = e.target.offsetParent.getAttribute('data-id');
          if (!this.favoriteBooks.includes(bookId)) {
            e.target.offsetParent.classList.add('favorite');
            this.favoriteBooks.push(bookId);
          } else {
            e.target.offsetParent.classList.remove('favorite');
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
          }
        }
      });

      this.dom.filterForm.addEventListener('click', (e) => {
        if (
          e.target.tagName == 'INPUT' &&
          e.target.type == 'checkbox' &&
          e.target.name == 'filter'
        ) {
          if (e.target.checked) {
            this.filters.push(e.target.value);
          } else {
            this.filters.splice(this.filters.indexOf(e.target.value), 1);
          }
        }
        for (let input of this.dom.filterInputs) {
          input.addEventListener('change', this.filterBooks());
        }
      });
    }

    filterBooks() {
      // console.log(this);
      for (const book of this.data) {
        let shouldBeHidden = false;
        for (const filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          document
            .querySelector(`[data-id="${book.id}"]`)
            .classList.add('hidden');
        } else {
          document
            .querySelector(`[data-id="${book.id}"]`)
            .classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      if (rating <= 6)
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      else if (rating > 6 && rating <= 8)
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      else if (rating > 8 && rating <= 9)
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      else if (rating > 9)
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }

  const app = new BooksList(); // eslint-disable-line no-unused-vars
  // console.log(app);
}
