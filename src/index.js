import React from 'react'
import { render } from 'react-dom'
import Table from './components/Table'
import store from './store'
import page from 'page'

var pageRenderCallback = [];

page("*",function(ctx,next){
    pageRenderCallback = [];
    next();
});

function renderAll(newData) {
    console.log("render again: ", newData);
    if (pageRenderCallback && pageRenderCallback.constructor === Array) {
        pageRenderCallback.forEach(function (renderFunction) {
            if (renderFunction && renderFunction.constructor === Function) {
                renderFunction();
            }
        });
    }
}

store.on('update', function (newData) {
    console.log("page refreshing due to global state reset", store.get());
    renderAll(newData);
});

pageRenderCallback.push(function(){
	render(<Table/>,document.getElementById('root'))
})

render(<Table/>,document.getElementById('root'))

