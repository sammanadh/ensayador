import Page from "../Page.js";

export default class Login extends Page{
    name = "Login";

    getHtml(){
        return `
        <div class="card" style="background-image: linear-gradient(to bottom, #5FD0C6, #426AAE); box-shadow: 5px 5px; width: 60%; margin: 5% auto; padding: 5%">
                <div class="field">
                <label class="label">Name</label>
                <div class="control">
                <input class="input" type="text" placeholder="e.g Alex Smith">
                </div>
            </div>
            
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
                </div>
            </div>
        </div>
        `
    }
}