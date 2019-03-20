// convert date format
const convertDateTime = function(value) {
  var date = new Date(Date.parse(value));
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

// get Course Data
const getCourse = function() {
  fetch(API_CoursesIndex, {
    method: "GET",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(result => {
      let text = "";
      for (let i in result) {
        console.log(result[i].description);

        text += `<div class="col-md-4 px-25 list-content">
        <div class="course-content">
          <figure class="course-thumbnail">
            <a href="course-detail.html?courseId=${
              result[i].courseId
            }"><img src="${result[i].imageUrl}" alt="ảnh minh họa"/></a>
          </figure>

          <div class="course-content-wrap">
            <header class="entry-header">
              <h2 class="entry-title">
                <a href="course-detail.html?courseId=${result[i].courseId}">${
          result[i].name
        }</a>
              </h2>

              <div class="entry-meta flex flex-wrap align-items-center">
                <div class="course-author">
                  <a href="course-detail.html?courseId=${result[i].courseId}">${
          result[i].description
        }</a>
                </div>

                <div class="course-date">${convertDateTime(
                  result[i].createdAt
                )}</div><button class="btn btn-success btn-submit-course" id="${result[i].courseId}">Choose this course</button>

                
              </div>
            </header>

            <footer
              class="entry-footer flex flex-wrap justify-content-between align-items-center"
            >
              <div class="course-cost">
              $${result[i].price}
              </div>

              <div
                class="course-ratings flex justify-content-end align-items-center"
              >
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star-o"></span>

                <span class="course-ratings-count">(4 votes)</span>
              </div>
            </footer>
          </div>
        </div>
      </div>`;

        document.getElementById("course-info").innerHTML = text;
      }
    })
    .catch(err => console.log(2));
};

// get Course Details
const getCourseDetail = function() {
  const courseId = window.location.href.split("=")[1];
  fetch(API_CourseDetails, {
    method: "POST",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(courseId)
  })
    .then(resp => resp.json())
    .then(result => {
      console.log(JSON.stringify(result));
      const name = result.course[0].name;
      const title = result.course[0].name;
      const des = result.course[0].description;
      const imageUrl = result.course[0].imageUrl;
      document.getElementById("entry-title").innerHTML = name;
      document.getElementsByTagName("title")[0].innerHTML = title;
      document.getElementById("description-course").innerHTML = des;
      document.getElementById(
        "imageUrl"
      ).innerHTML = `<img src="${imageUrl}" alt="" />`;
    });
};

// get Department Data
const getDepartment = function() {
  fetch(API_DepartmentsIndex, {
    method: "GET",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(result => {
      let text = "";
      for (let i in result) {
        const falcultyList = result[i].faculties;
        console.log(`value là ${JSON.stringify(result[i].faculties)}`);

        text += `
        <div class="row">
        <div class="col-12 col-lg-6 align-content-lg-stretch">
          <header class="heading">
            <h2 class="entry-title">${result[i].name}</h2>

            <p>
              ${result[i].description}
            </p>
          </header>
          <div class="entry-content ezuca-stats">
              <div class="stats-wrap flex flex-wrap justify-content-lg-between">`;

        for (let key in falcultyList) {
          if (falcultyList.hasOwnProperty(key)) {
            const element = falcultyList[key];
            text += `
                <div class="stats-count">
                  <span><a href="faculty-detail.html?facultyId=${
                    element.facultyId
                  }">${element.name}</a></span>
                </div>`;
          }
        }

        text += `
        </div>
            </div>
          </div>
  
          <div class="col-12 col-lg-6 flex align-content-center mt-5 mt-lg-0">
            <div class="ezuca-video position-relative">
              <img src="${result[i].imageUrl}" alt="anh khoa" />
            </div>
          </div>
        </div>
        <br/><hr/><br/>`;
        document.getElementById("department-info").innerHTML = text;
      }
    })
    .catch(err => console.log("sth wrong"));
};

const getDepartmentDetail = function() {};

// Get Faculty Detail
const getFacultyDetail = function() {
  const facultyId = window.location.href.split("=")[1];
  fetch(API_FacultyDetails, {
    method: "POST",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(facultyId)
  })
    .then(resp => resp.json())
    .then(result => {
      console.log(JSON.stringify(result));
      const name = result.faculty[0].name;
      const department = result.faculty[0].department.name;
      const title = result.faculty[0].name;
      const des = result.faculty[0].description;
      document.getElementById("entry-title").innerHTML = department;
      document.getElementById("department-title").innerHTML = name;
      document.getElementsByTagName("title")[0].innerHTML = title;
      document.getElementById("description-faculty").innerHTML = des;
      document.getElementById(
        "imageUrl"
      ).innerHTML = `<img src="${imageUrl}" alt="" />`;
    })
    .catch(err => console.log(err));
};

const getFeaturedCourses = function() {
  fetch(API_CoursesIndex, {
    method: "GET",
    headers: {
      accepts: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(result => {
      let text = "";
      for (let i = 0; i <=5; i++ ) {
        console.log(result[i].description);

        text += `
        <div class="col-12 col-md-6 col-lg-4 px-25">
                    <div class="course-content">
                        <figure class="course-thumbnail">
                            <a href="course-detail.html?courseId=${result[i].courseId}"><img src="${result[i].imageUrl}" alt="ẢNH MINH HỌA"></a>
                        </figure>

                        <div class="course-content-wrap">
                            <header class="entry-header">
                                <h2 class="entry-title"><a href="course-detail.html?courseId=${result[i].courseId}">${result[i].name}</a></h2>

                                <div class="entry-meta flex align-items-center">
                                    <div class="course-author"><a href="course-detail.html?courseId=${result[i].courseId}">${result[i].description}</a></div>

                                    <div class="course-date">${convertDateTime(
                                      result[i].createdAt
                                    )}</div>
                                </div>
                            </header>

                            <footer class="entry-footer flex justify-content-between align-items-center">
                                <div class="course-cost">
                                    $${result[i].price}
                                </div>

                                <div class="course-ratings flex justify-content-end align-items-center">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star-o"></span>

                                    <span class="course-ratings-count">(4 votes)</span>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>`;

        document.getElementById("course-info").innerHTML = text;
      }
    })
    .catch(err => console.log(2));
};
