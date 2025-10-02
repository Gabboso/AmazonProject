const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev'); // setup a new http request

xhr.send();  // send the message; asynchronous code: it doesn't wait for the send() method to finish (by sending the request e recieving the response), and it goes already to next line. the result of this method will be taken care of by teh event listener that we placed above;
