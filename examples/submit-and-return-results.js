const urlscan = require('../urlscan.js')
const config = require('../config.js')
const APIKEY = config.APIKEY
const domaintosubmit = 'https://mycrypto.com'

// Submits a domain and then queries to get the result of the scan when it is complete.
new urlscan().submit(APIKEY, domaintosubmit).then( function( submitoutput ) {
    get_result(submitoutput.uuid)
} )


get_result = (uuid) => {
    var resultwait = setInterval(function() {
        new urlscan().result(uuid).then( function( resultoutput ) {
            if (resultoutput.statusCode != 404) {
                console.log(JSON.stringify(resultoutput, null, 2))
                clearInterval(resultwait)
            }
        } )
    }, 10 * 1000) // re-check every 10 second
};
