import os from 'os';

/**
 * Gets all available IP addresses
 */
const getIpAddressServer = function (): string[] {
    const ipAddress: string[] = [];
    const ifaces = os.networkInterfaces();
    const keys = Object.keys(ifaces);
    try {
        for (let index = 0; index < keys.length; index++) {
            const ifname = keys[index];
            const interfaces = ifaces[ifname];
            if (!interfaces) continue;
            for (let i = 0; i < interfaces.length; i++) {
                const iface = interfaces[i];
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    continue;
                }
                ipAddress.push(iface.address);
            }
        }
    } catch (error) {
        console.log(error);
    }
    return ipAddress;
};

/**
 * Verifies if the provided host is a loopback address
 * @param hostname The hostname to check
 */
const isLocalHostname = (hostname: string): boolean => hostname === "localhost" || hostname === "127.0.0.1";

export = {
    getIpAddressServer,
    isLocalHostname
};
