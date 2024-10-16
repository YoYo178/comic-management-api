# comic-management-api
A REST API for managing comic book inventories.


## List of API Endpoints:
### Status route
<details>
 <summary><code>GET</code> <code><b>/api</b></code> <code>(Returns the status of the API)</code></summary>

##### Parameters
<code>None</code>

##### Response(s)

> |   http code   |    content-type    | response                                          |
> |---------------|--------------------|-------------------------------------------------- |
> |     `200`     | `application/json` | `{"status": "success", timestamp: 1729072605904}` |

</details>

### Get book(s) data from the database:
<details>
 <summary><code>GET</code> <code><b>/api/comic</b></code> <code>(Returns all the comic books from the database.)</code></summary>

##### Parameters
<code>None</code>

##### Response(s)

> |   http code   |    content-type    | response                                                                                  |
> |---------------|--------------------|-------------------------------------------------------------------------------------------|
> |     `200`     | `application/json` | `{"status": "success", timestamp: 1729072605904, books: [{...}, {...}, ...], errors: []}` |

</details>
<details>
 <summary><code>GET</code> <code><b>/api/comic/:id</b></code> <code>(Returns a comic book under the specified ID from the database.)</code></summary>

##### Parameters
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        | required  | number                  | The unique ID of the book.                                            |

##### Response(s)

> |   http code   |    content-type    | response                                                                                                                                  |
> |---------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
> |     `200`     | `application/json` | `{"status": "success", timestamp: 1729072605904, book: {...}, errors: []}`                                                                |
> |     `400`     | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An invalid type for 'id' was provided, expected of type 'number'." errors: []}` |
> |     `404`     | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "No comic book exists for the specified id." errors: []}`                        |

</details>

### Create and save book data to the database:
<details>
 <summary><code>POST</code> <code><b>/api/comic/:id</b></code> <code>(Creates and saves the comic book under the specified ID to the database.)</code></summary>

##### Parameters
> | name |   type    | data type | description                |
> |------|-----------|-----------|----------------------------|
> |  id  | required  |  number   | The unique ID of the book. |

##### Response(s)

> |   http code   |   content-type     | response                                                                                                                                  |
> |---------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
> |     `200`     | `application/json` | `{"status": "success", timestamp: 1729072605904, data: {...}, errors: []}`                                                                |
> |     `400`     | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An invalid type for 'id' was provided, expected of type 'number'." errors: []}` |
> |     `400`     | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "A book already exists for the specified id." errors: []}`                       |
> |     `400`     | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An error occured while creating the comic book." errors: [...]}`                |
> |     `500`     | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An error occured while saving the comic book to the database." errors: [...]}`  |

</details>

### Update book data in the database:
<details>
 <summary><code>PATCH</code> <code><b>/api/comic/:id</b></code> <code>(Edits and saves (Updates) the comic book under the specified ID in the database.)</code></summary>

##### Parameters
> | name |   type   | data type | description                |
> |------|----------|-----------|----------------------------|
> |  id  | required |  number   | The unique ID of the book. |

##### Response(s)

> | http code |    content-type    | response                                                                                                                                                   |
> |-----------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
> |   `200`   | `application/json` | `{"status": "success", timestamp: 1729072605904, data: {...}, errors: []}`                                                                                 |
> |   `400`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An invalid type for 'id' was provided, expected of type 'number'." errors: []}`                  |
> |   `400`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "No book exists under the specified id." errors: []}`                                             |
> |   `400`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "The property '{key}' does not exist in the comic book data." errors: []}`                        |
> |   `400`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "Invalid value type '{type}' provided for property '{key}', expected '{correctType}" errors: []}` |
> |   `500`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An error occured while saving the comic book to the database." errors: [...]}`                   |

</details>

### Delete book(s) data from the database:
<details>
 <summary><code>DELETE</code> <code><b>/api/comic</b></code> <code>(Deletes ALL comic book data from the database.)</code></summary>

##### Parameters
<code>none</code>

##### Response(s)

> | http code |    content-type    | response                                                                   |
> |-----------|--------------------|----------------------------------------------------------------------------|
> |   `200`   | `application/json` | `{"status": "success", timestamp: 1729072605904, data: {}, errors: []}`    |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/comic/:id</b></code> <code>(Deletes the comic book data under the specified ID from the database.)</code></summary>

##### Parameters
> | name |   type    | data type | description                |
> |------|-----------|-----------|----------------------------|
> |  id  |  required |  number   | The unique ID of the book. |

##### Response(s)

> | http code |    content-type    | response                                                                                                                                     |
> |-----------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
> |   `200`   | `application/json` | `{"status": "success", timestamp: 1729072605904, data: {}, errors: []}`                                                                      |
> |   `400`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An invalid type for 'id' was provided, expected of type 'number'." errors: []}`    |
> |   `400`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "No book exists under the specified id." errors: []}`                               |
> |   `500`   | `application/json` | `{"status": "failed", timestamp: 1729072605904, message: "An error occured while deleting the comic book from the database." errors: [...]}` |

</details>

------------------------------------------------------------------------------------------
## Setup:

1. Run <code>yarn install</code> or <code>npm install</code> in the terminal at the project's base directory.
2. Create a MongoDB cluster (see [how to](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial)) and copy-paste the connection string inside <code>config.json</code> in the <code>MONGODB_URL</code> property.
3. Run <code>yarn start</code> or <code>npm start</code>.
   - The application will start listening for requests at the port specified in <code>config.json</code> (default: 3000)

------------------------------------------------------------------------------------------
### [Postman collections](https://drive.google.com/file/d/11pGMhVNSgWIbPThwcqFxLMfti2D8bNzT/view?usp=sharing)
