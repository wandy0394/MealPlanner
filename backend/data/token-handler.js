import request from "request"
import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config();

let access_token=null

export default class TokenHandler {
    static #clientID = process.env.CLIENT_ID;
    static #clientSecret = process.env.CLIENT_SECRET;
    static async #requestToken(clientID, clientSecret) {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        formData.append('scope', 'basic');
        const opt = {
            method: 'POST',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientID + ":" + clientSecret).toString('base64')
            },
            body:formData
        }

        const res = await fetch('https://oauth.fatsecret.com/connect/token', opt);
        const resJSON = await res.json();
        access_token=resJSON.access_token;    
        return access_token
    }

    static showID() {
        console.log(this.#clientID);
        console.log(this.#clientSecret);
        return;
    }
    static async getToken() {
        if (access_token === null) {
            const token = await this.#requestToken(this.#clientID, this.#clientSecret)
        } 
        return access_token
    }
}
