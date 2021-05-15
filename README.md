# New Relic React Native Code Challenge

## Summary
Create a hybrid app, supporting iOS and/or Android, that queries a Cat Facts data source and presents the results. The app should efficiently show a very long list, using paging where necessary. Selecting an entry in the list should display more information. The user should be able to navigate back and forth between views. The app should capture performance information and display to another view.

## Primary Considerations
* Consider user experience and loading time of that experience.
* The design should be resilient with regard to network connectivity loss.
* Let the user know you are fetching/waiting for data.
* The App and its responsiveness should be optimized for maximum performance and resource usage.

We are not concerned with the visual aesthetics of the app, as long as the interface is clear and usable. Do not spend time polishing the visual aspects such as autolayout, fonts, color, accessibility, etc. Please update the architecture where needed, 

App should be as close to production-ready as possible.
Consider the possibility of adding future unit tests when writing the code.

The app should work correctly as defined below in [](#Requirements).

The code of the app should be descriptive and easy to read, and the build method and runtime parameters must be well-described and work.

## Requirements
Present a pageable main scrollable text list view that displays names of cats. The data should be fetched on demand in batches of *30*.
Use the Cat Facts API to download facts about cats (https://catfact.ninja)

Tapping cat names should display additional detail about the cat. For each network call, capture the response time and any otehr relevant data connected with that call. Track the average response time for each API endpoint. Collect each API called during this run and average response time in milliseconds. Finally, dDisplay these metrics and metadata in a 'Metrics' view. 

Also include the folllowing device metrics:
* Device make/model
* OS version

Use the latest version of React Native and associated toolsets. The React Native [getting started page](https://reactnative.dev/docs/getting-started) is very helpful.

# Notes
You may use common libraries in your project, particularly if their use helps improve Application simplicity and readability. Please update the README with any additional details and and setup instructions.

# Submission
We'll test your solution using the latest version of React Native and Node Package Manager (NPM)

Sanitize the source files to remove your name from comments
- Include a README in the repo with comments:
- Clearly state all of the assumptions you made in completing the app
- If your project requires any components not found in a default install of the developer tool, you must provide instructions (and automation) to install those components (or include them in your archive).
- Any additional special instructions to set up and run project
- Push the code to a github.com repo and invite the user specified in the email.

