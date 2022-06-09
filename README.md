# BigLab 2 - Class: 2022 [WA1-AJ/WA1-KZ]

## Team name: ReactDevs

* s301240 PERUGINI ALBERTO
* s302339 GEMMA
* s294633 KHATER AHMEND
* s298351 VANEGAS JUAN

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering BigLabs and exam sessions.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |

## List of APIs offered by the server

### **_List films_**

GET `/api/films` `?filter=`

* Retrieve a list of all the films or filtered if filter is send
* Query parameters: 
  * filter: `all`, `favorite`, `bestRated`, `seenLastMonth`, `unseen`
* Request body: _None_
* Response: `200 OK` (success).
* Response body:

```json
[
    {
        "id": 1,
        "title": "Pulp Fiction",
        "favorite": true,
        "watchDate": "2022-03-10",
        "rating": 5
    }, 
    {
        "id": 2,
        "title":"21 Grams",
        "favorite": false,
        "watchDate": "2022-03-10",
        "rating": 4
    },
    ....
]

```

* Error Responses: `503 Service Unavailable` (database error), `500 Internal server error` (generic server error).
* 
### _Get film by ID_

GET `/api/films/:id`

* Example: `/api/films/2`
* Retrieve a film, given its “id”.
* Request body: _None_
* Response: `200 OK` (success).
* Response body:

```json
{
    "id": 2,
    "title":"21 Grams",
    "favorite": true,
    "watchDate": "2022-03-10",
    "rating": 4
}  
```

* Error Responses: `404 Not found` (id not found) , `503 Service Unavailable` (database error), `500 Internal server error` (Database error).

### **_Add a new film_**

POST `/api/films`

* Create a new film, by providing all relevant information – except the “id” that will be
automatically assigned by the back-end.
* Request body:

```json
{
    "title":"The matrix",
    "favorite": true,
    "watchDate": "2022-03-10",
    "rating": 5
}
```

* Response: `201 Created` (success).
* Response body: _None_
* Error Responses: `422 Unprocessable Entity` (validation of data faild), `503 Service Unavailable` (database error), `500 Internal Server Error` (generic error).

### **_Edit film_**

PUT `/api/films/:id`

* Example: `/api/films/3`
* Update an existing film, by providing all the relevant information, i.e., all the properties except
the “id” will overwrite the current properties of the existing film. The “id” will not change after
the update.
* Request body:

```json
{
    "title":"The matrix",
    "favorite": 1,
    "watchDate": "2022-03-10",
    "Rating": 5
}
```

Response: `200 OK` (success).
Response body: _None_
Error Responses: `404 Not found` (film "id" not found), `422 Unprocessable Entity` (validation of request body fails), `503 Service Unavailable` (database error), `500 Internal server error` (generic error).

### **_Set film as favorite/unfavorite_**

PUT `/api/films/:id/favorite`

* Example: `/api/films/2`
* Mark an existing film as favorite(true = 1)/unfavorite(false = 0).
* Request body :

```json
{
    "favorite": 1
}
```

* Response: `200 OK` (success).
* Response body: _None_
* Error Responses: `404 Not found` (film id not found), `422 Unprocessable Entity` (validation of request body fails), `503 Service Unavailable` (database error), `500 Internal server error` (generic error).

### **_Delete a film_**

DELETE `/api/films/:id`

* Example: `/api/films/3`
* Delete an existing film, given its “id”.
* Request body: _None_
* Response: `204 No content` (success).
* Response body: _None_
* Error Responses: `404 Not found` (film id not found), `503 Service Unavailable` (database error), `500 Internal server error` (generic error).
