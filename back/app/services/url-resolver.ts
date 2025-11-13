import * as path from 'path';

const network = require(path.join(__dirname, '../../utils/network'));

/**
 * Retrieves the URL to be generated as a QR Code
 * URL that allows access to team selection
 * @param req Request that will determine the final URL
 */
const retrieveUrlForQrCodeGeneration = function (req: any): string {
    const isLocalHostname = network.isLocalHostname(req.hostname);

    // If it's not a loopback address, return the URL as is
    if (!isLocalHostname)
        return req.protocol + '://' + req.get('host');

    // Otherwise, get the server IP
    const [serverIp] = network.getIpAddressServer();

    if (!serverIp) return '';

    // Get the port if present
    const port = req.headers.host.split(':')[1];

    // Return the address for players
    if (port)
        return req.protocol + '://' + serverIp + ':' + port;

    // Otherwise return without port
    return req.protocol + '://' + serverIp;
};

export = {
    retrieveUrlForQrCodeGeneration
};
