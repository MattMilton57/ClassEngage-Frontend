const API_ROOT = "http://localhost:3000/api/v1"

const userToken = () => {return localStorage.getItem("token")}

const headers = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: userToken()
    };
  };
/////////////Log In / Log Out/////////////


/////////////General Fetches/////////////
const fetchStudents = () => {
    return fetch(`${API_ROOT}/students`)
      .then((res) => res.json())
  };

const fetchRegistrations = () => {
    return fetch(`${API_ROOT}/registrations`)
      .then((res) => res.json())
  };

const fetchAssessments = () => {
    return fetch(`${API_ROOT}/assessments`)
    .then((res) => res.json())
}

const fetchCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`,{
        headers: headers()
    })
    .then(res => res.json())
}  

/////////////Post Fetches/////////////
const postClass = (newClass) => {
    return fetch((`${API_ROOT}/class_periods`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(newClass)
    })
    .then(res => res.json())
}

const postStudent = (newStudent) => {
    return fetch((`${API_ROOT}/students`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(newStudent)
    })
    .then(res => res.json())
}

const postRegistration = (newRegistration) => {
    return fetch((`${API_ROOT}/registrations`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(newRegistration)
    })
    .then(res => res.json())
}

const postAssessment = (newRegistration) => {
    return fetch((`${API_ROOT}/assessments`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(newRegistration)
    })
    .then(res => res.json())
}

/////////////Patch Fetches//////////////

const patchStudent = (student) => {
    return fetch((`${API_ROOT}/students/${student.id}/`), {
        method:"PUT",
        headers:headers(),
        body: JSON.stringify(student)
    })
    .then(res => res.json())
}

const patchClassPeriod = (classPeriod, id) => {
    // console.log(id)
    return fetch((`${API_ROOT}/class_periods/${id}/`), {
        method:"PUT",
        headers:headers(),
        body: JSON.stringify(classPeriod)
    })
    .then(res => res.json())
}

/////////////Delete Fetches//////////////
const deleteRegistration = (toDelete) => {
    console.log(toDelete)
    return fetch((`${API_ROOT}/registrations/${toDelete}`), {
        method:"DELETE",
        headers:headers()
    })
    .then(res => res.json())
}

const deleteStudent = (toDelete) => {
    console.log(toDelete + " deleted")
    return fetch((`${API_ROOT}/students/${toDelete}`), {
        method:"DELETE",
        headers:headers()
    })
    .then(res => res.json())
}

const deleteAssessment = (toDelete) => {
    console.log(toDelete + " deleted")
    return fetch((`${API_ROOT}/assessments/${toDelete}`), {
        method:"DELETE",
        headers:headers()
    })
    .then(res => res.json())
}

const deleteClassPeriod = (toDelete) => {
    return fetch((`${API_ROOT}/class_periods/${toDelete}`), {
        method:"DELETE",
        headers:headers()
    })
    .then(res => res.json())
}

/////////////Specialty Fetches/////////////
const currentStudent = (id) => {
    return fetch((`${API_ROOT}/current_student/${id}/`), {
        headers:headers(),
    })
    .then(res=>res.json())
}


const filteredClasses = (id) => {
    return fetch((`${API_ROOT}/filterCP/`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(id)
    })
    .then(res=>res.json())
}

const filteredRegistrations = (id) => {
    return fetch((`${API_ROOT}/filterR/`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(id)
    })
    .then(res=>res.json())
}

const classList = (id) =>{
    return fetch((`${API_ROOT}/classList/`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(id)
    })
    .then(res=>res.json())
}

const classesAssessments = (id) => {
    return fetch((`${API_ROOT}/classAssessments/`), {
        method:"POST",
        headers:headers(),
        body: JSON.stringify(id)
    })
    .then(res=>res.json())
}

const studentsAssessments = (id) => {
    return fetch((`${API_ROOT}/studentAssessments/`), {
    method:"POST",
    headers:headers(),
    body: JSON.stringify(id)
    })
    .then(res=>res.json())
}

const deleteStudentAssessments = (id) => {
    return fetch((`${API_ROOT}/deleteStudentAssessments/`), {
    method:"POST",
    headers:headers(),
    body: JSON.stringify(id)
    })
    .then(res=>res.json())
}

const deleteStudentRegistrations = (id) => {
return fetch((`${API_ROOT}/deleteStudentRegistrations/`), {
method:"POST",
headers:headers(),
body: JSON.stringify(id)
})
.then(res=>res.json())
}

const deleteClassPeriodRegistrations = (id) => {
return fetch((`${API_ROOT}/deleteClassPeriodRegistrations/`), {
method:"POST",
headers:headers(),
body: JSON.stringify(id)
})
.then(res=>res.json())
}

const deleteClassPeriodAssessments = (id) => {
return fetch((`${API_ROOT}/deleteClassPeriodAssessments/`), {
method:"POST",
headers:headers(),
body: JSON.stringify(id)
})
.then(res=>res.json())
}

export const api = {
    posts: {
        postClass,
        postStudent,
        postRegistration,
        postAssessment,
    },

    get: {
        fetchCurrentUser,
        fetchStudents,
        fetchRegistrations,
        fetchAssessments,
        filteredClasses,
        filteredRegistrations,
        classList,
        classesAssessments,
        studentsAssessments,
        currentStudent
    },

    patch: {
        patchStudent,
        patchClassPeriod,
    },

    delete: {
        deleteRegistration,
        deleteStudent,
        deleteAssessment,
        deleteStudentAssessments,
        deleteStudentRegistrations,
        deleteClassPeriod,
        deleteClassPeriodRegistrations,
        deleteClassPeriodAssessments,
    }
}