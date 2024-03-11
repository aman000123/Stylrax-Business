export default class Session {

    static get(key){
    
        return localStorage.getItem(key);

    }
    static getObject(key){
    
        const  data = localStorage.getItem(key);
        // console.log("Data in session ::>", data);
        return JSON.parse(data);

    }
    
    static set(key, value){
        localStorage.setItem(key, value);
    }

    static setObject(key, value){
        const data = JSON.stringify(value)
        localStorage.setItem(key, data);
    }


    static remove(key){
        localStorage.removeItem(key);
    }

    static setRegisteredPhoneNumber(phoneNumber){
        localStorage.setItem('phoneNumber', phoneNumber);
        console.log('no'+phoneNumber)
    }

    // Add a method to retrieve the registered phone number
    static getRegisteredPhoneNumber(){
        const storedPhoneNumber = localStorage.getItem('phoneNumber');

    }
}
