import React from 'react';
import "../style.css"

export default function Feedback() {
  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Send Us a Feeback</title>
        {/* <link rel="stylesheet" href="feedbackStyle.css" /> */}
      </head>
      <body>
        <form method="POST" action="mailto:nikhilupadhyayblr@gmail.com" class="feedback-form">
          <fieldset>
            <legend><b>Personal Information</b></legend>
            <p>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" name="firstName" id="firstName" autoComplete="on" required autoFocus />
            </p>
            <p>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" name="lastName" id="lastName" autoComplete="on" required autoFocus />
            </p>
            <p>
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" name="phone" id="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" autoComplete="on" required autoFocus />
            </p>
          </fieldset>
          <br />
          <br />
          <fieldset>
            <legend><b>Send Us A Note</b></legend>
            <label htmlFor="message">Your Message</label>
            <br />
            <textarea name="message" id="message" cols="90" rows="10" placeholder="Type your message here!"></textarea>
          </fieldset>
          <br />
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </body>
    </div>
  );
}


