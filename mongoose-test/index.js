const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

let Book = mongoose.model("Book", { name: String });

let practicalNodeBook = new Book({name: "Practical Node Book2"});

practicalNodeBook.save().then((result) => {
    console.log("Saved", result);
    process.exit(0);
}).catch((error) => {
    console.log(error);
    process.exit(1);
})