# DrivenCare

This project aims to develop a medical appointment scheduling platform that allows patients to schedule appointments with doctors of different specialties, choosing the available date and time for each doctor. Doctors will be able to view and manage scheduled appointments.
## Info:

    1. Title: Medical Schedule API
    2. Description: This is an API for medical appointment scheduling.

version: 1.0.0
Servers:

    url: #########

<h2>Endpoints:</h2>
  <ul>
    <li><code>POST /patient/signup</code>: Creates a new patient</li>
    <li><code>POST /patient/signin</code>: Authenticates an existing patient</li>
    <li><code>GET /patient/{id}/consultations</code>: Lists the scheduled appointments for a specific patient</li>
    <li><code>GET /patients</code>: Lists all registered patients</li>
    <li><code>POST /doctors/signup</code>: Creates a new doctor</li>
    <li><code>POST /doctors/signin</code>: Authenticates an existing doctor</li>
    <li><code>GET /doctors/{id}/consultations</code>: Lists the scheduled appointments for a specific doctor</li>
    <li><code>GET /doctors</code>: Lists all registered doctors or filters by name, specialty, and/or location</li>
    <li><code>GET /doctors/consultations</code>: Lists all scheduled appointments for all doctors</li>
    <li><code>POST /appointment/schedule</code>: Schedules a new appointment</li>
    <li><code>PUT /appointment/{id}/confirm</code>: Confirms a scheduled appointment</li>
    <li><code>PUT /appointment/{id}/cancel</code>: Cancels a scheduled appointment</li>
    <li><code>PUT /appointment/{id}/carriedout</code>: Marks an appointment as carried out</li>
  </ul>