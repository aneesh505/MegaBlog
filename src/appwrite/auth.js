
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    account;
    client = new Client();

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

        // Ping Appwrite to verify connection
        this.client.ping().then(response => {
            console.log("Appwrite connected:", response);
        }).catch(error => {
            console.error("Appwrite connection failed:", error);
        });
    }

    async createAccount({email,password,name}){
        try {
           const userAccount= await this.account.create({id:ID.unique(),email,password,name})
           if(userAccount){
            return this.login({email,password})
           }else{
            return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({email,password})
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite get user",error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Sessions Deleted",error);
            
        }
    }

}




const authService = new AuthService();
export default authService;

