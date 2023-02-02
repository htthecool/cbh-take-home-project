# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom Agent ID field custom_agent_id

Acceptance Criteria:
A custom Agent ID field is added to the Agent table in the database, allowing Facilities to input their own custom ids for each Agent.

Time Estimate:
4-6 hours

Implementation:
Create a new field in the Agent table in the database to store the custom id -> field name could be customAgentId or custom_agent_id input by the Facility.
Update the user interface in the platform to allow Facilities to input their custom ids for each Agent.
Validate the input to ensure that it meets the specified format and constraints -> talk to someone who's in touch with Facilities to get more details if needed
Write tests to check CRUD of custom agent id and validations

### Ticket 2: Modify getShiftsByFacility function

Acceptance Criteria:
The getShiftsByFacility function is modified to return the custom Agent ID (ex: custom_agent_id) instead of the internal database id when generating reports.

Time Estimate:
4-6 hours

Implementation:
Modify the getShiftsByFacility function to return the custom Agent ID (ex: custom_agent_id) from the Agent table in the database instead of the internal database id.
Ensure that the function is still able to retrieve the correct custom id for each Agent even if it has not been input by the Facility.
Internally you could still use 'id' for getting data, but make sure custom_agent_id is returned wherever present.
Write test for the function and make sure it tests custom agent id

### Ticket 3: Modify generateReport function

Acceptance Criteria
The generateReport function is modified to use the custom Agent ID instead of the internal database id when generating reports.

Time Estimate:
6-8 hours

Implementation:
Modify the generateReport function to use the custom Agent ID instead of the internal database id when generating reports.
Ensure that the function correctly adds up the hours worked by each Agent based on their custom id and generates the report as a PDF.
Write test for the checking the column is added to report and that report is generated as expected

### Ticket 4: Test and Deploy

Acceptance Criteria

The modified platform is tested for bugs in staging and/or alpha before deploying to production.

Time Estimate:
4-6 hours

Implementation:
Test if generated report has the right custome field.
Test with real data from staging system and compare with previous reports
