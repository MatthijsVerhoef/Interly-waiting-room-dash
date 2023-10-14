import { PublicClientApplication } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
    auth: {
        clientId: "048cb25c-67f2-4df2-89e0-dbeb2988b1d2",
        authority: "https://login.microsoftonline.com/27ee64e4-9af1-4d03-9ece-4630fb81da2c",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
});

export function login() {
    const loginRequest = {
        scopes: ["User.Read", "Calendars.Read"]
    };

    msalInstance.loginPopup(loginRequest)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error);
        });
}