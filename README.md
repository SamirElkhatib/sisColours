# Documentation of SisColours:

<!-- TODO: Fix look and organization of documentation file -->

## Technologies Used:
Some of the core technologies used in this project are:
- Node.js as the backend engine to achieve fullstack capabilities
- Angular 2 as the frontend core behind the SPA
- Material Design (Angular Material or MDL)
- Express server as REST API
- MongoDB database with mongoose for data modelling

## Server:
The server holds three main responsibilities:  
- Fetching data from AUBsis, and receiving raw HTML
- Parsing data, creating a **Course[ ] (Object)** database
- Serving as a RESTful service for the front-end app to communicate with the database
 
### Downloading Courses:
Courses are downloaded from AUBsis by using a virtual browser and following the login procedure.
This requires an AUB ID and password to be able to successfully login.
After that courses are requested through advanced options by selecting all the sections.  
This process receives raw HTML from AUBsis and thus requires to be parsed accordingly before uploading to MongoDB.

##### Parsing Raw HTML:
Steps involved are:
- Converting raw HTML table using the *tabletojson* package  
 _Note that the package I am using is a modified version of **tabletojson by iaincollins**, since his version does not
 support complex tables where the column headings might be repeated. I created a poll request on Github and await his response..._
- Fixing any data not acceptable by Mongo  
_examlpe: Mongo indexes do not accept "." value in them...._  

**The outcome of this process is a JSON arraw of all the courses**
##### Dealing With Recitation Sessions:
Recitation sessions come in the format of table rows that have all values empty except for recitation
time, place, and instructor. While traversing the JSON array to create the database, I had to watch for
arrays with empty **CRN** value so that I attach their information to the previous entry in the database.  
Recitations have the **Inst.Method** value set as the day, or left empty if the day is TBA.  
The value of **Day** shows the time of the recitation, or "TBA".  
**XL Rem** shows the recitation instructor, and **Instructor** shows the Date (Which I believe is not relevant)

##### Special Cases:
Special cases are all what these courses are about. The AUBsis website does not show data formatted properly.
Recitations rows are moved one column to the left. So are courses with TBA days, which means
that ak the data after the **Days** parameter is moved one step to the left. This causes lots of conflict
when trying to automate functions.  
Some are not given in the same dates as the rest of courses.  
Example:  

	11479	EPHD	321	1	M	2.000	Design &Analys.of Clinic.Trial		F	03:30 pm-05:30 pm	10	8	2	0	0	0	0	0	0	Ziyad Mahfoud (P)	09/15-09/15	VANDYK 201	 
  	 	 	 	 	 	 	 	S	09:00 am-01:00 pm	 	 	 	 	 	 	 	 	 	Ziyad Mahfoud (P)	09/16-09/16	VANDYK 201	 
  	 	 	 	 	 	 	 	F	03:30 pm-05:30 pm	 	 	 	 	 	 	 	 	 	Ziyad Mahfoud (P)	10/06-10/06	VANDYK 201	 
  	 	 	 	 	 	 	 	S	09:00 am-01:00 pm	 	 	 	 	 	 	 	 	 	Ziyad Mahfoud (P)	10/07-10/07	VANDYK 201	 
  	 	 	 	 	 	 	 	F	03:30 pm-05:30 pm	 	 	 	 	 	 	 	 	 	Ziyad Mahfoud (P)	10/20-10/20	VANDYK 201	 
  	 	 	 	 	 	 	 	S	09:00 am-01:00 pm	 	 	 	 	 	 	 	 	 	Ziyad Mahfoud (P)	10/21-10/21	TBA	 
  	 	 	 	 	 	 	 	F	03:30 pm-05:30 pm	 	 	 	 	 	 	 	 	 	Ziyad Mahfoud (P)	11/03-11/03	TBA	 
  	 	 	 	 	 	 	 	S	09:00 am-01:00 pm	 	 	 	 	 	 	 	 	 	Ziyad Mahfoud (P)	11/04-11/04	TBA`

This is all **one** course!!

### MongoDB:
Mongo is growing as one of the best database systems available. I decided to use this NoSQL database as it
serves well with Node and Angular, namely as part of the **MEAN Stack**. This allowed my code to be fully
implemented in JavaScript.  
#### Database Structure:
#### Server-Database Communication:
The following functions are currently implemented between the server and mongoDB:  
 __________________________
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### REST API:


## Model:
### The Course Object:
Each course is an object having detail parameters.  
The most important parameters are:
* CRN: the unique identifier of the course
* Name: used as the main search value for the course
* Time Array: Has all the time arrays  of the course  
_Check **Representing Time** section for further details on time arrays_

### Reading Courses Time:


### Representing Time:
Time was represented as slots...  
Each slot has a column number representing the day, a start time, end time, colour, and a crn.  
Therefore, time was represented using a number array: [day, start, end].  
The slot is related to the course through its **CRN**...


