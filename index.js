const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const sql = require("mysql");
const path = require("path");
const hbs = require("hbs");
const ejs = require("ejs");
const { check, validationResult } = require("express-validator");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const { start } = require("repl");
const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  port = 3000,
  SESS_LIFETIME = TWO_HOURS,
  SESS_NAME = "sid",
  SESS_SECRET = "Shhhhh",
} = process.env;

app.listen(port, (err) => {
  if (err) throw err;
  console.log("App is running at localhost:3000");
});

const con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "espiritujancarlo1",
  database: "enrollmentsystem_db",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to the database");
});

//set views file
app.set("views", path.join(__dirname, "view"));

//setting up middlewares
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/")));
app.use(
  session({
    name: SESS_NAME,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: false,
    },
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//middleware for setting up the users to be called in every routes
app.use((req, res, next) => {
  const { userId } = req.session;
  const username = req.session.userId;
  const password = req.session.pass;
  if (userId) {
    res.locals.user = con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'"
    );
  }
  next();
});

//if the user is not loggedin it will redirect to the login page
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/");
  } else {
    next();
  }
};

//if the user is loggedin it will redirect to the home page
const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/home");
  } else if (req.session.userStudent) {
    res.redirect("/homeStudent");
  } else {
    next();
  }
};

//setting up for message
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//display index.html
app.get("/", redirectHome, (req, res) => {
  const { userId } = req.session;
  const { userStudent } = req.session;
  const { pass } = req.session;
  const { section } = req.session;
  const { course } = req.session;
  console.log(req.session);
  res.render("index");
});

//display index.html
app.get("/homeStudent", redirectLogin, (req, res) => {
  const username = req.session.userId;
  const password = req.session.pass;
  con.query(
    "SELECT * FROM students WHERE username = '" +
      username +
      "' AND password = '" +
      password +
      "'",
    (err, results, fields) => {
      if (err) throw err;
      res.render("home-student", {
        results: results,
      });
    }
  );
  console.log(req.session);
});

//display index.html
app.get("/home", redirectLogin, (req, res) => {
  const username = req.session.userId;
  const password = req.session.pass;
  con.query(
    "SELECT * FROM adminaccounts WHERE username = '" +
      username +
      "' AND password = '" +
      password +
      "'",
    (err, results, fields) => {
      if (err) throw err;

      res.render("home", {
        results: results,
      });
    }
  );
  console.log(req.session);
});

//login admin
app.post("/login", redirectHome, (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    con.query(
      "SELECT * FROM adminaccounts WHERE username = ? AND password = ?",
      [username, password],
      function (err, results, fields) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.userId = username;
          req.session.pass = password;
          console.log("succesfully login");
          console.log(username);
          res.render("home", {
            results: results,
          });
        } else {
          console.log("Incorrect username or password");
          req.session.message = {
            type: "danger",
            intro: "Incorrect username or password",
          };
          res.redirect("/");
        }
      }
    );
  } else {
    console.log("Incorrect username or password");
    req.session.message = {
      type: "danger",
      intro: "Please enter username or password",
    };
    res.redirect("/");
  }
});

app.get("/login", (req, res) => {
  // req.session.userId =
});

//login student
app.post("/loginstudent", redirectHome, (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    con.query(
      "SELECT * FROM students WHERE username = ? AND password = ?",
      [username, password],
      function (err, results, fields) {
        if (results.length > 0) {
          const status = results[0].status;
          if (status != "approved") {
            req.session.message = {
              type: "danger",
              intro: "Your account is not approved yet please try again later",
            };
            res.redirect("/studentlogin");
          } else {
            req.session.loggedin = true;
            req.session.userId = username;
            req.session.pass = password;
            console.log("succesfully login");
            console.log(username);
            res.render("home-student", {
              results: results,
            });
          }
        } else {
          console.log("Incorrect username or password");
          req.session.message = {
            type: "danger",
            intro: "Incorrect username or password",
          };
          res.redirect("/");
        }
      }
    );
  } else {
    console.log("Incorrect username or password");
    req.session.message = {
      type: "danger",
      intro: "Please enter username or password",
    };
    res.redirect("/");
  }
});

//nav-links
app.get("/logout", redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.redirect("/home");
    }
    res.clearCookie(SESS_NAME);
    res.redirect("/");
  });
});

app.get("/studentlogin", redirectHome, (req, res) => {
  con.query("SELECT * FROM courses", (err, courses, fields) => {
    if (err) throw err;
    res.render("index-student", {
      courses: courses,
    });
  });
});

app.get("/courses-maintenance", redirectLogin, (req, res) => {
  res.redirect("/courses");
});

app.get("/sections-maintenance", redirectLogin, (req, res) => {
  res.redirect("/sections");
});

app.get("/addSection1", redirectLogin, (req, res) => {
  res.redirect("/sections1");
});

app.get("/students", redirectLogin, (req, res) => {
  console.log(req.session);
  res.redirect("/viewStudents");
});

//view courses
app.get("/courses", redirectLogin, (req, res) => {
  let sql = "SELECT * FROM courses";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    const username = req.session.userId;
    const password = req.session.pass;
    con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, results, fields) => {
        if (err) throw err;
        res.render("courses-maintenance", {
          results: results,
          result: result,
        });
      }
    );
  });
});

//view sections
app.get("/sections", redirectLogin, (req, res) => {
  let sql = "SELECT * FROM sections";
  con.query(sql, function (err, sections, fields) {
    if (err) throw err;

    sql = "SELECT coursecode from courses";
    con.query(sql, function (err, courses, fields) {
      if (err) throw err;

      const username = req.session.userId;
      const password = req.session.pass;
      con.query(
        "SELECT * FROM adminaccounts WHERE username = '" +
          username +
          "' AND password = '" +
          password +
          "'",
        (err, results, fields) => {
          if (err) throw err;
          res.render("sections-maintenance", {
            sections: sections,
            courses: courses,
            results: results,
          });
        }
      );
    });
  });
});

//view courses to add sections
app.get("/sections1", (req, res) => {
  let sql1 = "SELECT coursecode FROM courses";
  con.query(sql1, function (err, results1, fields) {
    if (err) throw err;
    res.render("addSection", {
      results1: results1,
    });
  });
});

//view students and course
app.get("/viewStudents", redirectLogin, (req, res) => {
  let approved = "approved";
  let sql =
    "SELECT id, CONCAT(firstname,' ',middlename,' ',lastname) AS fullname, course, section, date FROM students where status = '" +
    approved +
    "'";
  con.query(sql, function (err, students, fields) {
    if (err) throw err;

    const username = req.session.userId;
    const password = req.session.pass;
    con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, results, fields) => {
        if (err) throw err;

        sql = "SELECT coursecode from courses";
        con.query(sql, function (err, courses, fields) {
          if (err) throw err;
          res.render("students", {
            results: results,
            students: students,
            courses: courses,
          });
        });
      }
    );
  });
});

//view students and course
app.get("/sortCourse", redirectLogin, (req, res) => {
  let course = req.param("course");
  console.log(course);
  let sql =
    "SELECT id, CONCAT(firstname,' ',middlename,' ',lastname) AS fullname, course, section, date FROM students WHERE course = '" +
    course +
    "'";
  con.query(sql, function (err, students, fields) {
    if (err) throw err;

    sql = "SELECT coursecode from courses";
    con.query(sql, function (err, courses, fields) {
      if (err) throw err;

      res.render("students", {
        students: students,
        courses: courses,
      });
    });
  });
});

//register student and admin
app.post("/register", redirectHome, (req, res) => {
  let accounttype = req.body.accountType;
  let pending = "pending";
  let data = {
    firstname: req.body.inputFname,
    middlename: req.body.inputMname,
    lastname: req.body.inputLname,
    username: req.body.inputUser,
    password: req.body.inputPass,
  };
  let data1 = {
    status: pending,
    firstname: req.body.inputFname,
    middlename: req.body.inputMname,
    lastname: req.body.inputLname,
    course: req.body.inputCourse,
    username: req.body.inputUser,
    password: req.body.inputPass,
  };
  if (accounttype == "student") {
    let sql = "INSERT INTO students SET ?";
    let query = con.query(sql, data1, (err, result) => {
      if (err) throw err;
      else {
        console.log("Registered Successfully!");

        req.session.message = {
          type: "danger",
          intro: "Registered Successfully!",
        };
        res.redirect("/studentlogin");
      }
    });
  } else if (accounttype == "admin") {
    let sql = "INSERT INTO adminaccounts SET ?";
    let query = con.query(sql, data, (err, result) => {
      if (err) throw err;
      else {
        console.log("Registered Successfully!");

        req.session.message = {
          type: "danger",
          intro: "Registered Successfully!",
        };
        res.redirect("/");
      }
    });
  }
});

//add course
app.post("/addcourse", (req, res) => {
  let date_now = new Date();
  let year = date_now.getFullYear();
  let month = date_now.getMonth() + 1;
  let day = date_now.getDate();
  let today = year + "-" + month + "-" + day;
  let data = {
    coursecode: req.body.inputCourseCode,
    coursedescription: req.body.inputCourseDescription,
    date: today,
  };
  let sql = "INSERT INTO courses SET ?";
  let query = con.query(sql, data, (err, result) => {
    if (err) throw err;
    else {
      console.log("Successfully added record in the database!");

      req.session.message = {
        type: "danger",
        intro: "Course Successfully Added!",
      };
      res.redirect("/courses");
    }
  });
});

//add section
app.post("/addSection", (req, res) => {
  let date_now = new Date();
  let year = date_now.getFullYear();
  let month = date_now.getMonth() + 1;
  let day = date_now.getDate();
  let today = year + "-" + month + "-" + day;
  let data = {
    section: req.body.inputSection,
    course: req.body.inputCourse,
    date: today,
  };
  let sql = "INSERT INTO sections SET ?";
  let query = con.query(sql, data, (err, result) => {
    if (err) throw err;
    else {
      console.log("Successfully added record in the database!");

      req.session.message = {
        type: "danger",
        intro: "Course Successfully Added!",
      };
      res.redirect("/sections");
    }
  });
});

//edit course
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const username = req.session.userId;
  const password = req.session.pass;
  let sql = "SELECT * FROM courses WHERE id = '" + id + "'";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;

    con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, result, fields) => {
        if (err) throw err;
        res.render("edit-course", {
          result: result,
          results: results,
        });
      }
    );
  });
});

//update course
app.post("/update", (req, res) => {
  const id = req.body.id;
  let sql =
    "UPDATE courses SET coursecode = '" +
    req.body.inputCourseCode +
    "', coursedescription = '" +
    req.body.inputCourseDescription +
    "' where id = " +
    id;
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Record successfully edited",
      };
    }
    res.redirect("/courses");
  });
});

//edit section
app.get("/editSection/:id", (req, res) => {
  const id = req.params.id;
  let sql = "SELECT * FROM sections WHERE id = '" + id + "'";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;

    const username = req.session.userId;
    const password = req.session.pass;
    con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, result, fields) => {
        if (err) throw err;
        res.render("edit-section", {
          results: results,
          result: result,
        });
      }
    );
  });
});

//update section
app.post("/update-section", (req, res) => {
  const id = req.body.id;
  let sql =
    "UPDATE sections SET section = '" +
    req.body.inputSection +
    "', course = '" +
    req.body.inputCourse +
    "' where id = " +
    id;
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Record successfully edited",
      };
    }
    res.redirect("/sections");
  });
});

//delete course
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM courses WHERE id = '" + id + "'";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Record successfully deleted",
      };
    }
    res.redirect("/courses");
  });
});

//delete section
app.get("/deleteSection/:id", (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM sections WHERE id = '" + id + "'";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Record successfully deleted",
      };
    }
    res.redirect("/sections");
  });
});

//view course and section
app.get("/enroll", (req, res) => {
  let course = req.param("course");
  let sql = "SELECT coursecode from courses";
  con.query(sql, function (err, courses, fields) {
    if (err) throw err;

    sql = "SELECT section from sections where course = '" + course + "'";
    con.query(sql, function (err, section, fields) {
      if (err) throw err;

      const username = req.session.userId;
      const password = req.session.pass;
      con.query(
        "SELECT * FROM students WHERE username = '" +
          username +
          "' AND password = '" +
          password +
          "'",
        (err, results, fields) => {
          if (err) throw err;
          res.render("enroll", {
            courses: courses,
            section: section,
            results: results,
          });
        }
      );
    });
  });
});

app.post("/enroll-submit", (req, res) => {
  let date_now = new Date();
  let year = date_now.getFullYear();
  let month = date_now.getMonth() + 1;
  let day = date_now.getDate();
  const username = req.session.userId;
  const password = req.session.pass;
  let today = year + "-" + month + "-" + day;
  const age = req.body.inputAge;
  const birthdate = req.body.inputBdate;
  const address = req.body.inputAddress;
  const course = req.body.inputCourse;
  const date = today;

  let sql =
    "UPDATE students SET age = '" +
    age +
    "' , birthdate = '" +
    birthdate +
    "' , address = '" +
    address +
    "'  , date = '" +
    date +
    "' WHERE username = '" +
    username +
    "' AND password = '" +
    password +
    "'";
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      console.log("Enrolled succesfully");
      req.session.message = {
        type: "danger",
        intro: "You are now enrolled succesfully",
      };
    }
    res.redirect("/enroll");
  });
});

app.get("/profile-student", (req, res) => {
  let sql =
    "SELECT CONCAT(firstname,' ', middlename,' ', lastname) AS fullname, age, birthdate, address, course, section, date FROM students";
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.render("profile-student", {
      result: result,
    });
  });
});

//edit course
app.get("/approveStudent/:id", (req, res) => {
  const id = req.params.id;
  let sql =
    "SELECT id, CONCAT(firstname,' ',middlename,' ',lastname) AS fullname, course, section, date FROM students WHERE id = '" +
    id +
    "'";
  con.query(sql, (err, results) => {
    if (err) throw err;

    res.render("addsection", {
      results: results,
    });
  });
});

//update section
app.post("/save-section", (req, res) => {
  const id = req.body.id;
  const status = "approved";
  let sql = "UPDATE students SET status = '" + status + "' where id = " + id;
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Section successfully added",
      };
    }
    res.redirect("/viewStudents");
  });
});

//delete student
app.get("/deleteStudent/:id", (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM students WHERE id = '" + id + "'";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Record successfully deleted",
      };
    }
    res.redirect("/viewStudents");
  });
});

//post on newsfeed
app.post("/newsfeed", (req, res) => {
  let data = {
    fullname: req.body.fullname,
    post: req.body.newsfeed,
  };
  let sql = "INSERT INTO newsfeed SET ?";
  con.query(sql, data, (err, result) => {
    if (err) throw err;

    res.redirect("newsfeedpage");
  });
});

//post on newsfeed student
app.post("/newsfeedStudent", (req, res) => {
  let data = {
    fullname: req.body.fullname,
    post: req.body.newsfeed,
  };
  let sql = "INSERT INTO newsfeed SET ?";
  con.query(sql, data, (err, result) => {
    if (err) throw err;

    res.redirect("newsfeedpageStudent");
  });
});

//newsfeed
app.get("/newsfeedpage", (req, res) => {
  con.query("SELECT * FROM newsfeed ORDER BY id DESC", (err, posts, fields) => {
    if (err) throw err;

    const username = req.session.userId;
    const password = req.session.pass;
    con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, results, fields) => {
        if (err) throw err;

        res.render("newsfeed", {
          results: results,
          posts: posts,
        });
      }
    );
  });
});

//newsfeed
app.get("/newsfeedpageStudent", (req, res) => {
  con.query("SELECT * FROM newsfeed ORDER BY id DESC", (err, posts, fields) => {
    if (err) throw err;

    const username = req.session.userId;
    const password = req.session.pass;
    con.query(
      "SELECT * FROM students WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, results, fields) => {
        if (err) throw err;

        res.render("newsfeedStudent", {
          results: results,
          posts: posts,
        });
      }
    );
  });
});

app.get("/profileStudent", (req, res) => {
  const username = req.session.userId;
  const password = req.session.pass;
  con.query(
    "SELECT * FROM students where username = '" +
      username +
      "' and password = '" +
      password +
      "'",
    (err, result, fields) => {
      if (err) throw err;
      res.render("profileStudent", {
        result: result,
      });
    }
  );
});

app.get("/classmates", (req, res) => {
  let user = req.session.userId;
  let pass = req.session.pass;
  let course = req.param("course");
  let section = req.param("section");
  con.query(
    "SELECT CONCAT(firstname,' ', middlename,' ', lastname) AS fullname, course, section FROM students where course = '" +
      course +
      "' AND section = '" +
      section +
      "' and username != '" +
      user +
      "' AND " +
      "password != '" +
      pass +
      "'",
    (err, classmates, fields) => {
      if (err) throw err;

      const username = req.session.userId;
      const password = req.session.pass;
      con.query(
        "SELECT * FROM students WHERE username = '" +
          username +
          "' AND password = '" +
          password +
          "'",
        (err, results, fields) => {
          if (err) throw err;
          res.render("classmates", {
            classmates: classmates,
            results: results,
          });
        }
      );
    }
  );
});

//viewing of subjects per course
app.get("/subjects", (req, res) => {
  let course = req.param("course");
  console.log(course);
  con.query(
    "SELECT * from subjects where course = '" + course + "'",
    (err, result, fields) => {
      if (err) throw err;

      const username = req.session.userId;
      const password = req.session.pass;
      con.query(
        "SELECT * FROM adminaccounts WHERE username = '" +
          username +
          "' AND password = '" +
          password +
          "'",
        (err, results, fields) => {
          if (err) throw err;

          con.query(
            "SELECT section from sections where course = '" + course + "'",
            (err, section, fields) => {
              if (err) throw err;

              con.query(
                "SELECT coursecode from courses WHERE coursecode = '" +
                  course +
                  "'",
                (err, course, fields) => {
                  if (err) throw err;
                  res.render("subject-maintenance", {
                    results: results,
                    result: result,
                    section: section,
                    course: course,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

app.post("/addSubject", (req, res) => {
  let course = req.param("course");
  let data = {
    subject: req.body.inputSubject,
    course: req.body.inputCourse,
    section: req.body.inputSection,
    day: req.body.inputDay,
    start: req.body.inputFrom,
    finish: req.body.inputTo,
    unit: req.body.inputUnit,
  };
  let sql = "INSERT INTO subjects SET ?";
  con.query(sql, data, (err, result, fields) => {
    if (err) throw err;
    else {
      console.log("Successfully added record in the database!");

      req.session.message = {
        type: "danger",
        intro: "Subject Successfully Added!",
      };
      res.redirect("/subjects?course=" + course);
    }
  });
});

//delete subject
app.get("/deleteSubject/:id/:course", (req, res) => {
  const course = req.params.course;
  const id = req.params.id;
  console.log(course);
  let sql = "DELETE FROM subjects WHERE id = '" + id + "'";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Record successfully deleted",
      };
    }
    res.redirect("/subjects?course=" + course);
  });
});

app.get("/editSubject/:id/:course", (req, res) => {
  const id = req.params.id;
  const course = req.params.course;
  let sql = "SELECT * FROM subjects WHERE id = '" + id + "'";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;

    const username = req.session.userId;
    const password = req.session.pass;
    con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, result, fields) => {
        if (err) throw err;

        con.query(
          "SELECT section from sections WHERE course = '" + course + "'",
          (err, section, fields) => {
            if (err) throw err;
            res.render("editSubject", {
              results: results,
              result: result,
              section: section,
            });
          }
        );
      }
    );
  });
});

//update course
app.post("/editSubject1", (req, res) => {
  const id = req.body.id;
  const subject = req.body.inputSubject;
  const course = req.body.inputCourse;
  const section = req.body.inputSection;
  const day = req.body.inputDay;
  const from = req.body.inputFrom;
  const to = req.body.inputTo;
  const unit = req.body.inputUnit;
  let sql =
    "UPDATE subjects SET subject = '" +
    subject +
    "', course = '" +
    course +
    "', section = '" +
    section +
    "', day = '" +
    day +
    "', start = '" +
    from +
    "', finish = '" +
    to +
    "', unit = " +
    unit +
    " where id = " +
    id;
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    else {
      req.session.message = {
        type: "danger",
        intro: "Record successfully edited",
      };
    }
    res.redirect("/subjects?course=" + course);
  });
});

//view pendings
app.get("/viewPendings", redirectLogin, (req, res) => {
  let pending = "pending";
  let sql =
    "SELECT id, CONCAT(firstname,' ',middlename,' ',lastname) AS fullname, course, section, date FROM students where status = '" +
    pending +
    "'";
  con.query(sql, function (err, students, fields) {
    if (err) throw err;

    const username = req.session.userId;
    const password = req.session.pass;
    con.query(
      "SELECT * FROM adminaccounts WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      (err, results, fields) => {
        if (err) throw err;

        sql = "SELECT coursecode from courses";
        con.query(sql, function (err, courses, fields) {
          if (err) throw err;
          res.render("pending-students", {
            results: results,
            students: students,
            courses: courses,
          });
        });
      }
    );
  });
});

//enroll subjects
app.get("/enrollSubject", redirectLogin, (req, res) => {
  let course = req.param("course");
  const username = req.session.userId;
  const password = req.session.pass;
  con.query(
    "SELECT * FROM subjects where course = '" + course + "' ORDER BY start ASC",
    (err, subjects, fields) => {
      if (err) throw err;

      con.query(
        "SELECT * FROM students WHERE username = '" +
          username +
          "' AND password = '" +
          password +
          "'",
        (err, results, fields) => {
          if (err) throw err;

          con.query(
            "SELECT CONCAT(firstname,' ',middlename,' ',lastname) AS fullname FROM students WHERE username = '" +
              username +
              "' AND password = '" +
              password +
              "'",
            (err, fullname, fields) => {
              if (err) throw err;
              const studName = fullname[0].fullname;
              con.query(
                "SELECT * FROM student_subjects where student_name = '" +
                  studName +
                  "' ORDER BY start ASC",
                (err, studentSubjects, fields) => {
                  if (err) throw err;

                  con.query(
                    "SELECT units FROM students WHERE username = '" +
                      username +
                      "' AND password = '" +
                      password +
                      "'",
                    (err, totalUnits, fields) => {
                      if (err) throw err;
                      console.log(subjects);
                      for (var x = 0; x < subjects.length; x++) {
                        var date = new Date();
                        var startTime = new Date(
                          date.toLocaleDateString() + " " + subjects[x].start
                        ).toLocaleTimeString();
                        var finalTime = new Date(
                          date.toLocaleDateString() + " " + subjects[x].finish
                        ).toLocaleTimeString();
                        subjects[x].start = startTime;
                        subjects[x].finish = finalTime;
                      }
                      for (var x = 0; x < studentSubjects.length; x++) {
                        var date = new Date();
                        var startTime = new Date(
                          date.toLocaleDateString() +
                            " " +
                            studentSubjects[x].start
                        ).toLocaleTimeString();
                        var finalTime = new Date(
                          date.toLocaleDateString() +
                            " " +
                            studentSubjects[x].finish
                        ).toLocaleTimeString();
                        studentSubjects[x].start = startTime;
                        studentSubjects[x].finish = finalTime;
                      }
                      console.log(studentSubjects);
                      res.render("enrollSubjects", {
                        subjects: subjects,
                        results: results,
                        studentSubjects: studentSubjects,
                        totalUnits: totalUnits,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

//delete student subject
app.get("/deleteStudSubject/:id", (req, res) => {
  const username = req.session.userId;
  const password = req.session.pass;
  const id = req.params.id;

  con.query(
    "SELECT units from students where username = '" +
      username +
      "' AND password = '" +
      password +
      "'",
    (err, total, fields) => {
      if (err) throw err;
      const totalUnits = total[0].units;

      con.query(
        "SELECT * from student_subjects WHERE id = '" + id + "'",
        (err, subject, fields) => {
          if (err) throw err;
          const sub = subject[0].unit;
          const courses = subject[0].course;
          console.log(courses);

          let sql = "DELETE FROM student_subjects WHERE id = '" + id + "'";
          let query = con.query(sql, (err, result) => {
            if (err) throw err;
            else {
              req.session.message = {
                type: "danger",
                intro: "Record successfully deleted",
              };
            }
            const minusUnits = totalUnits - sub;
            con.query(
              "UPDATE students SET units = '" +
                minusUnits +
                "' WHERE username = '" +
                username +
                "' AND password  = '" +
                password +
                "'",
              (err, tUnits) => {
                if (err) throw err;
                res.redirect("/enrollSubject?course=" + courses);
              }
            );
          });
        }
      );
      //res.redirect("/enrollSubject?course=" + courses);
    }
  );
});

//submit enrolled subjects
app.post("/enrollSubjectStudent", redirectLogin, (req, res) => {
  const username = req.session.userId;
  const password = req.session.pass;
  let subject = req.body.subject;
  con.query(
    "SELECT age, CONCAT(firstname,' ',middlename,' ',lastname) AS fullname from students where username = '" +
      username +
      "' AND password = '" +
      password +
      "'",
    (err, fullname, fields) => {
      const studName = fullname[0].fullname;
      if (err) return err;
      con.query(
        "SELECT units from students where username = '" +
          username +
          "' AND password = '" +
          password +
          "'",
        (err, total, fields) => {
          if (err) throw err;

          const studUnits = total[0].units;

          con.query(
            "SELECT subject, course, section, unit, day, start, finish FROM subjects WHERE subject = '" +
              subject +
              "'",
            (err, infos, fields) => {
              if (err) throw err;
              const c = infos[0].course;
              const sec = infos[0].section;
              const unt = infos[0].unit;
              const d = infos[0].day;
              const s = infos[0].start;
              const f = infos[0].finish;

              let data = {
                student_name: studName,
                subject: subject,
                course: c,
                section: sec,
                day: d,
                start: s,
                finish: f,
                unit: unt,
              };
              const newUnits = studUnits + unt;

              con.query(
                "SELECT subject from student_subjects WHERE student_name = '" +
                  studName +
                  "' AND subject = '" +
                  subject +
                  "'",
                (err, allSubs, fields) => {
                  if (err) throw err;

                  con.query(
                    "SELECT day, start, finish FROM student_subjects where student_name = '" +
                      studName +
                      "' AND day = '" +
                      d +
                      "'",
                    (err, schedule, fields) => {
                      if (err) throw err;
                      console.log(schedule);
                      if (allSubs.length == 0) {
                        for (var i = 0; i < schedule.length; i++) {
                          let date = new Date();
                          var startTime = new Date(
                            date.toLocaleDateString() + " " + schedule[i].start
                          );
                          var finishTime = new Date(
                            date.toLocaleDateString() + " " + schedule[i].finish
                          );
                          var nstartTime = new Date(
                            date.toLocaleDateString() + " " + s
                          );
                          var nfinishTime = new Date(
                            date.toLocaleDateString() + " " + f
                          );
                          console.log(
                            startTime.toString() + " " + nstartTime.toString()
                          );
                          if (
                            startTime.toString() == nstartTime.toString() &&
                            finishTime.toString() == nfinishTime.toString()
                          ) {
                            console.log("conflict");
                            req.session.message = {
                              type: "danger",
                              intro:
                                "You cannot take this subject please choose another one.",
                            };
                            return res.redirect("/enrollSubject?course=" + c);
                          } else if (
                            (nstartTime > startTime &&
                              nstartTime < finishTime) ||
                            (nfinishTime > startTime &&
                              nfinishTime < finishTime) ||
                            (nstartTime.toString() == startTime.toString() &&
                              startTime < finishTime) ||
                            (nstartTime < startTime && nfinishTime > finishTime)
                          ) {
                            console.log("conflict");
                            req.session.message = {
                              type: "danger",
                              intro:
                                "You cannot take this subject please choose another one.",
                            };
                            return res.redirect("/enrollSubject?course=" + c);
                          }
                        }

                        if (newUnits < 25) {
                          let sql = "INSERT INTO student_subjects SET ? ";
                          con.query(sql, data, (err, results) => {
                            if (err) throw err;

                            const addUnits = studUnits + unt;
                            con.query(
                              "UPDATE students SET units = '" +
                                addUnits +
                                "' WHERE username = '" +
                                username +
                                "' AND password = '" +
                                password +
                                "'",
                              (err, tUnits) => {
                                if (err) throw err;
                                req.session.message = {
                                  type: "danger",
                                  intro: "Subject successfully added.",
                                };
                                res.redirect("/enrollSubject?course=" + c);
                              }
                            );
                          });
                        } else {
                          req.session.message = {
                            type: "danger",
                            intro:
                              "Your total units exceeded please choose other subject.",
                          };
                          res.redirect("/enrollSubject?course=" + c);
                        }
                      } else {
                        console.log("kahit ano boi");
                        req.session.message = {
                          type: "danger",
                          intro:
                            "Your already added this subject please choose another one.!",
                        };
                        return res.redirect("/enrollSubject?course=" + c);
                      }
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
