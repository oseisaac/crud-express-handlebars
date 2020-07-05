const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("MongoDB Connection successful");
        }
        else {
            console.log("Erro in DB connection" + err);
        }
    }
);

require('./employee.model');