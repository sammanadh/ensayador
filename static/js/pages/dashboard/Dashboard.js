import Page from "../Page.js";

export default class Dashboard extends Page{

    name = "Dashboard";

    getHtml(){
        return `
            <h1>Dashboard</h1>
        `
    }

}