/* eslint-disable no-useless-catch */

import conf from '../conf/conf'


import { Client, Account, ID } from "appwrite";

export class AuthService {          // ek class 

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
            this.account = new Account(this.client);  // ab account banaenge client ki value se
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if(userAccount){
                // call another method for login 
                return this.login(email, password)
            }
            else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)

        } catch (error) {
            throw error;            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("ERROR", error);           
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("ERROR", error);           
        }

        return null;
    }

}  

const authService = new AuthService();   // ek object bana h AuthService class se




export default authService;   // obj ko export krenge