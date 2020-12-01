// Super class for every page
export default class Page{

    constructor(){
        
    }

    setTitle(title){
        this.title = title;
        document.title = title;
    }

}