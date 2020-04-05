import { onError } from './notifications'

const validation = (obj, fields) => {
    let result = true;

    fields.map(field => {
        if(!obj[field] || obj[field] == '') {
            onError('Enter '+ field);
            result = false;
        }
    })

    return result;
}

export default validation;