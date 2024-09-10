export class Cat {

    constructor(color){

        this.angryPath = `images/${color}/angry.png`
        this.unhappyPath = `images/${color}/unhappy.png`
        this.okPath = `images/${color}/ok.png`
        this.goodPath = `images/${color}/good.png`
        this.happyPath = `images/${color}/happy.png`

    }
    
    getPath(percentage) {

        if (percentage <= 20.0) {return this.angryPath;}
        if (percentage <= 40.0) {return this.unhappyPath;}
        if (percentage <= 60.0) {return this.okPath;}
        if (percentage <= 80.0) {return this.goodPath;}
        if (percentage > 81.0) {return this.happyPath;}

    }

}
