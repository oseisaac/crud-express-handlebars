const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const employeeModel = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecords(req, res);
    }
    else {
        updateRecord(req, res);
    }
});

const insertRecords = (req, res) => {
    let employee = new employeeModel();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else {
                console.log(`Error during record insertion: ${err}`);
            }
        }

    });
}

function updateRecord(req, res) {
    employeeModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else {
                console.log(`Error during record insertion: ${err}`);
            }
        }


    })
}

router.get('/list', (req, res) => {
    employeeModel.find((err, docs) => {
        if (!err) {
            res.render('employee/list', {
                list: docs
            });
        }
        else {
            console.log(`Error in retriving employe list: ${err}`);
        }
    })
});

router.get('/:id', (req, res) => {
    employeeModel.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                ViewTitle: 'Update Employee',
                employee: doc
            });
        }
        else {
            console.log(`Error in retriving employe list: ${err}`);
        }
    });
})

router.get('/delete/:id', (req, res) => {
    employeeModel.findByIdAndRemove(req.params._id, (err, doc) => {
        if (!err) {
            res.render('employee/list', {
            });
        }
        else {
            console.log(`Error in retriving employe list: ${err}`);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        if (err.errors[field].path === 'fullName') {
            body['fullNameError'] = err.errors[field].message;
        }
        else if (err.errors[field].path === 'email') {
            body['emailError'] = err.errors[field].message;
        }
        else {
            break;
        }
    }
}


module.exports = router;