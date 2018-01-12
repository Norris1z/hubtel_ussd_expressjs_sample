const express = require('express');

//used to parse the body of the request (application/json) sent from Hubtel
const bodyParser = require('body-parser');

// used to allow Cross Origin Resource Sharing (CORS)
const cors = require('cors');

const app = express();

//used to check if the request body(json) is empty
const _ = require('underscore');

// setup the cors middleware to grant other domains access to our resources
app.use(cors());

//use the body-parser middleware to parse all incoming requests
app.use(bodyParser.json());

/*
* Hubtel sends a post request to the endpoint provided by the user so 
* lets declare our route as a post route
* Make sure the route is not protected with CSRF since Hubtel sends no
* CSRF tokens and requests would be blocked
**/

app.post('/', (request, response) => {
    //we set the parsed body of the request to a variable
    const ussdRequest = request.body;
    //we ceate a response variable
    //this has two properties (Message,Type) which would be set later.
    const ussdResponse = {};

    //we check if the request is empty to prevent us from trying to access
    // properties on an empty object
    if (!_.isEmpty(ussdRequest)) {
        /*
         * Hubtel has two request types 
         * The 'Initiation' for the first request (when the user dials the ussd code)
         * The 'Response' for the subsequent requests (when they reply to options in the ussd app)
        **/
        switch (ussdRequest.Type) {
            //we check if its an initiation request and show our initial message (like our homepage)
            case 'Initiation':
                //we set the response message which would be displayed on the users screen
                ussdResponse.Message = `Welcome to Freebie Service.\n1. Free Food\n2. Free Drink\n3. Free Airtime`;
                // we set our response type to tell Hubtel either to continue or end the session
                ussdResponse.Type = 'Response';
            break;
            //All subsequent requests would take this path since we have already displayed our initial request(homepage)
            case 'Response':
                /*
                 * All the stages in our ussd app are refferred to as the sequence 
                 * with our Initiation as our first sequence
                 * the sequence starts numbering from two
                 * 
                 * The switch case below tells Hubtel the code to be executed on each sequence
                 * 
                 * Note: There can be nested switch case blocks if the user has to select an
                 * option in a sequence
                 **/
                 switch (ussdRequest.Sequence) {
                    case 2:
                        const items = { 1: 'food', 2: 'drink', 3: 'airtime' };

                        if (ussdRequest.Message in items) {
                            ussdResponse.Message = `Are you sure you want free ${items[ussdRequest.Message]}?\n1. Yes\n2. No`;
                            ussdResponse.Type = 'Response';
                            ussdResponse.ClientState = items[ussdRequest.Message];
                        } else {
                            ussdResponse.Message = 'Invalid option.';
                            ussdResponse.Type = 'Release';
                        }
                        
                    break;
                    case 3:
                        /*
                         * We displayed options in our previous sequence so the switch case in this
                         * sequence is used to determine code to execute based on the option 
                         * selected by our user in the previous sequence
                         **/
                        switch (ussdRequest.Message) {
                            case '1':
                                ussdResponse.Message = `Thank you. You will receive your free ${ussdRequest.ClientState} shortly.`;
                                break;
                            case '2':
                                ussdResponse.Message = 'Order cancelled.';
                                break;
                            default:
                                ussdResponse.Message = 'Invalid selection.';
                                break;
                        }
                        //This tells Hubtel to end the session. Hence nothing would be sent to the user after this
                        ussdResponse.Type = 'Release';
                    break;
                    default:
                        ussdResponse.Message = 'Unexpected request.';
                        ussdResponse.Type = 'Release';
                }
            break;
            default:
                ussdResponse.Message = 'Duh.';
				ussdResponse.Type = 'Release';
        }
    } else {
        //We send this when the body of the request is empty
        ussdResponse.Message = 'Invalid USSD request.';
        ussdResponse.Type = 'Release';
    }
    //Hubtel's api recieves application/json so we send our responses as json 
    response.json(ussdResponse);
});

app.listen(8000);
