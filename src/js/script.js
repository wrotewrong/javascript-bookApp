{
  const render = function () {
    const bookTemplates = {
      books: Handlebars.compile(
        document.querySelector('#template-book').innerHTML
      ),
    };

    for (const book of dataSource.books) {
      //   console.log(book);
      //   const ratingBgc = determineRatingBgc(book.rating);
      //   const ratingWidth = book.rating * 10;
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      const generatedHTML = bookTemplates.books(book);

      const domElement = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector('.books-list');

      bookContainer.appendChild(domElement);

      console.log(book);
    }
  };

  const favoriteBooks = [];

  const initActions = function () {
    const books = document.querySelector('.books-list');
    // console.log(books);
    books.addEventListener('dblclick', function (e) {
      //   console.log('dblclikc works');
      //   console.log(e.target.offsetParent.classList.contains('book__image'));
      if (e.target.offsetParent.classList.contains('book__image')) {
        e.preventDefault();
        const bookId = e.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)) {
          e.target.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          e.target.offsetParent.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        }
        console.log(favoriteBooks);
      }
    });

    form.addEventListener('click', function (e) {
      if (
        e.target.tagName == 'INPUT' &&
        e.target.type == 'checkbox' &&
        e.target.name == 'filter'
      ) {
        // console.log(e.target.value);
        if (e.target.checked) {
          filters.push(e.target.value);
        } else {
          filters.splice(filters.indexOf(e.target.value), 1);
        }
        console.log(filters);
      }
      //   filterBooks();
      const inputs = document.querySelectorAll('.filters input');
      for (let input of inputs) {
        input.addEventListener('change', filterBooks);
      }
    });
  };

  const filters = [];

  const form = document.querySelector('.filters');

  //   solution 1

  //   const filterBooks = function () {
  //     for (const book of dataSource.books) {
  //       document
  //         .querySelector(`[data-id="${book.id}"]`)
  //         .classList.remove('hidden');
  //       for (const option in book.details) {
  //         if (!book.details[option] && filters.includes(option)) {
  //           document
  //             .querySelector(`[data-id="${book.id}"]`)
  //             .classList.add('hidden');
  //           break;
  //         }
  //       }
  //     }
  //   };

  const filterBooks = function () {
    console.log('zmiana');
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
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
  };

  const determineRatingBgc = function (rating) {
    if (rating <= 6)
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    else if (rating > 6 && rating <= 8)
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if (rating > 8 && rating <= 9)
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else if (rating > 9)
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  };

  render();
  initActions();
}
