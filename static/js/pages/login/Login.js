import Page from "../Page.js";

export default class Login extends Page{

    constructor(){
        super();

        // Initialize the properties
        this.title = "Login"
        this.data = {
            username : "",
            password : ""
        }

        this.setTitle(this.title);
    }

    getHtml(){
        return `
        <div class="card" style="background-image: linear-gradient(to bottom, #B8BDD9, #F28B7C); box-shadow: 5px 5px; width: 60%; margin: 5% auto; padding: 5%">
            <h2 class="card-title mb-4 mx-auto">${this.title}</h2>
            <form>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-4" click="()=>console.log("done")">Login</button>
            </form>
        </div>
        `
    }

    loadEventListeners(){
        document.querySelector("form").addEventListener("submit", (evt)=>{
            evt.preventDefault();
            console.log(this.data);
        })
        document.querySelectorAll("input").forEach(e => e.addEventListener("input", (evt)=>{
            if(evt.target.name in this.data){
                this.data[evt.target.name] = evt.target.value
            }
            })
        )
    }

}