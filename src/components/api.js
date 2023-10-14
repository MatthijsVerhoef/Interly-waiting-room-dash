import axios from 'axios';

export function fetchCalendarEvents(accessToken) {
    return axios.get('https://graph.microsoft.com/v1.0/me/events', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}
