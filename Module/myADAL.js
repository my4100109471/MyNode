
const adal = require('adal-node').AuthenticationContext;

const authorityHostUrl = 'https://login.windows.net';
const tenant = 'e8e421a3-1f17-4b07-90c2-38907bc38413';
const authorityUrl = authorityHostUrl + '/' + tenant;
const clientId = 'api://6abec58f-1e99-4ad5-9642-e24826642057';
const clientSecret = 'your-client-secret';
const resource = '6abec58f-1e99-4ad5-9642-e24826642057';

const context = new adal(authorityUrl);

context.acquireTokenWithClientCredentials(
  resource,
  clientId,
  clientSecret,
  (err, tokenResponse) => {
    if (err) {
      console.log(`Token generation failed due to ${err}`);
    } else {
      console.dir(tokenResponse, { depth: null, colors: true });
    }
  }
);



// // Authors:
// // Shane Oatman https://github.com/shoatman
// // Sunil Bandla https://github.com/sunilbandla
// // Daniel Dobalian https://github.com/danieldobalian

// var express = require("express");
// var morgan = require("morgan");
// var passport = require("passport");
// var BearerStrategy = require('passport-azure-ad').BearerStrategy;

// // TODO: Update the first 3 variables
// var clientID = "api://6abec58f-1e99-4ad5-9642-e24826642057";
// var b2cDomainHost = "login.microsoftonline.com";
// var tenantIdGuid = "e8e421a3-1f17-4b07-90c2-38907bc38413";
// var policyName = "B2C_1_SUSI";
// var options = {
//     identityMetadata: "https://" + b2cDomainHost + "/" + tenantIdGuid + "/" + policyName + "/v2.0/.well-known/openid-configuration/",
//     clientID: clientID,
//     policyName: policyName,
//     isB2C: true,
//     validateIssuer: false,
//     loggingLevel: 'info',
//     loggingNoPII: false,
//     passReqToCallback: false
// };

// var bearerStrategy = new BearerStrategy(options,
//     function (token, done) {
//         // Send user info using the second argument
//         done(null, {}, token);
//     }
// );

// var app = express();
// app.use(morgan('dev'));

// app.use(passport.initialize());
// passport.use(bearerStrategy);

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.get("/hello",
//     passport.authenticate('oauth-bearer', {session: false}),
//     function (req, res) {
//         var claims = req.authInfo;
//         console.log('User info: ', req.user);
//         console.log('Validated claims: ', claims);
        
//         if (claims['scp'].split(" ").indexOf("demo.read") >= 0) {
//             // Service relies on the name claim.  
//             res.status(200).json({'name': claims['name']});
//         } else {
//             console.log("Invalid Scope, 403");
//             res.status(403).json({'error': 'insufficient_scope'}); 
//         }
//     }
// );

// var port = process.env.PORT || 5000;
// app.listen(port, function () {
//     console.log("Listening on port " + port);
// });