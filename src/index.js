/**
  Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the 'License'). You may not use this file except in compliance with the License. A copy of the License is located at

    http://aws.amazon.com/apache2.0/

  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: 'Alexa, ask Rock Geek for a fact'
 *  Alexa: 'Here's your rock and roll fact: ...'
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

/**
 * Array containing rock and roll facts.
 */
var FACTS = [
  "The only guy in ZZ Top who doesn't have a beard is drummer Frank Beard.",
  "Duran Duran was named after a mad scientist from the Jane Fonda movie Barbarella.",
  "Termites will eat wood two times faster when listening to heavy metal.",
  "The Beach Boys' Pet Sounds album was titled because of an insult between bandmates. When Brian Wilson showed Mike Love the new material, he said, who the hell is going to listen to this? The ears of a dog?",
  "Jimi Hendrix got the inspiration for Purple Haze after having a dream where he could walk under the sea.",
  "The Nirvana hit, Smells Like Teen Spirit, was named after a deodorant brand.",
  "Elton John's real name is Reginald Dwight.",
  "The Clash's Rock The Casbah was written after the banning of rock music in Iran.",
  "Bono got his nickname from a hearing-aid store.",
  "The Rolling Stones' tongue logo design was inspired by the Indian Hindu goddess Kali The Destroyer.",
  "Brian Jones, co-founder of The Rolling Stones, was proficient at over 60 musical instruments.",
  "Each member of Nirvana was kicked out of the Nevermind release party for starting a food fight.",
  "Jimi Hendrix created the song Little Wing in 145 seconds.",
  "The Muppet Show's Animal character is allegedly inspired by Mick Fleetwood",
  "After making a mistake when recording Hey Jude, Paul McCartney says, oh fucking hell, at 2 minutes and 58 seconds.",
  "Queen has the longest-running fan club, according to the Guinness Book of World Records.",
  "Before he renamed himself Bob Dylan, Robert Allen Zimmerman briefly went by Elston Gunn.",
  "Before joining Kiss, Vinnie Vincent wrote the soundtracks for Happy Days and Joanie Loves Chachi.",
  "Elvis recorded more than 600 songs, but wrote zero of them.",
  "Chuck Berry aspired to be a professional photographer and only performed music to buy photography equipment.",
  "Slash's real name is Saul Hudson.",
  "In the sixties, Little Richard kicked Jimi Hendrix out of his band for stealing the spotlight.",
  "Two songs were recorded by the Beatles, Bob Dylan, and Elvis. They are: That's Alright, Mama, and Yesterday.",
  "Ozzy Osborne saved his wife Sharon's Pomeranian from a coyote by tackling and wresting the coyote until it released the dog."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * RockGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  //console.log('onSessionStarted requestId: ' + sessionStartedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  //console.log('onLaunch requestId: ' + launchRequest.requestId + ', sessionId: ' + session.sessionId);
  handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  //console.log('onSessionEnded requestId: ' + sessionEndedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
  'GetNewFactIntent': function (intent, session, response) {
    handleNewFactRequest(response);
  },

  'AMAZON.HelpIntent': function (intent, session, response) {
    response.ask('You can say tell me a rock fact, or, you can say exit... What can I help you with?', 'What can I help you with?');
  },

  'AMAZON.StopIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  },

  'AMAZON.CancelIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
  // Get a random rock fact from the rock facts list
  var factIndex = Math.floor(Math.random() * FACTS.length);
  var randomFact = FACTS[factIndex];

  // Create speech output
  var speechOutput = 'Here\'s your fact: ' + randomFact;
  var cardTitle = 'Your Fact';
  response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the RockGeek skill.
  var fact = new Fact();
  fact.execute(event, context);
};
