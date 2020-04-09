import {Component} from '@angular/core';

@Component({
    selector: 'my-component',
    template: `
        <h1>{{title}}</h1>
        <p> my-component</p>
    `
})

export class MyComponent{
    
    public title: string;

    constructor(){
        this.title='test';
        console.log("my component");
    }
}