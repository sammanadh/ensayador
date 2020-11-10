// Super class for every page
export default class Page{

    constructor(){
        
    }

    setTitle(title){
        document.title = title;
    }

    getHtml(){
        return ``;
    }

    loadEventListeners(){
        
    }

}