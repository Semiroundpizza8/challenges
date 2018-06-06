## Run the starting point

1. `npm i`
2. `npm run seed`
3. `npm run build`
4. `npm start`

## Directory structure
`/assets` contains stylesheets.

`/client` contains React components and a Redux store.

`/files` is an empty directory for storing patient files.

`/public` is where the code from `/client` is compiled to.

`/server` contains an Express server, routes, and the database config.

## Logging in
Running the seed script seeds the database, including some users we've created for you. You can use any user's email address and password to log in to the app as that user.

## Bens Notes:

In order to complete this challenge, we're going to have to consider 2 different points of view - the Patients and the Doctors

--------------------------------

### Patient
The patient should only be able to see their own info, and nothing else. In order to make this possible, we need to make a request to the database when they log in for a patient matching that log in informations ID, along with relevant information from the Address, Files, and Appointments tables.

Because of privacy concerns, only that specific patients information should be given back in the request, therefore we can't just make a request for all patients and filter it down to the one we need.

### Doctors
The doctor should have access to all of their patients information, along with their upcoming appointments. What I believe we need to consider here is whether or not a doctor can access the information of patients that aren't his own. I'm going to go ahead and assume that a doctor would not have access to that information since, if they need it for any reason, they can just consult the doctor who is assigned as the lead for that patient. If there's time left over, it might be beneficial to create some sort of collective schedule or list of doctors and associated patients, but I'm just going to focus on the MVP for now.

So, in order to populate the doctors view, we should get all associated patients and all associated appointments.

--------------------------------

This leaves us with 2 pages that need to be made, with one request for each page:
* SinglePatientView: with a request for a single patients information, along with the associated tables.
* DoctorView: with a request for a single doctors information, along with the associated patients and appointments. This page will also have access to a doctors version of the SinglePatientView.

-------------------------------

### Patient Home Functionality

STEP 1: Set up retrieve patient by UUID route in API
  modified:   server/api/patients.js
	modified:   server/db/db-api.js
  * While there was already a get patient by ID function set up, I found that it was getting the patient according to their index in db.json, and not by their actual UUID. To remedy this, I created a method in db-api to find the user by their UUID. That being said, I have very limited experience using lowDB in the past so there may be some built-in way to access the user by their UUID that I'm unaware of, so I'm planning to come back and look more into this later.

STEP 2: Set up reducer to retrieve info
  * 

STEP 3: communicate between PatientHome and Reducer
STEP 4: Fill in information