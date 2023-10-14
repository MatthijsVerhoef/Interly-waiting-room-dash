import * as msal from "@azure/msal-browser";

export const msalInstance = new msal.PublicClientApplication({
    auth: {
        clientId: "048cb25c-67f2-4df2-89e0-dbeb2988b1d2",
        authority: "https://login.microsoftonline.com/27ee64e4-9af1-4d03-9ece-4630fb81da2c",
        redirectUri: window.location.host,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
});
