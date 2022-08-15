import { v4 as uuidv4 } from 'uuid';
export function getOrGenerateVisitorId() {
    if (! window.localStorage.getItem('visitorId')) {
        window.localStorage.setItem('visitorId', uuidv4());
    }

    return window.localStorage.getItem('visitorId');
}