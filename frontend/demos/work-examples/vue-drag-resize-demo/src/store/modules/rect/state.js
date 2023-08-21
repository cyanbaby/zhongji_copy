import { nanoid } from "nanoid";

export default {
    /*
        TODO
            
            text 属性是新增的 ✔
            
            动态组件 name
                EditableText
                UneditableText
                Picture

            rects 中原有的属性，新增时需要计算 例如宽高..

            移除功能

            预设 class 例如： box-shaddow

            Tip 回显

            import {nanoid} from "nanoid";  nanoid()

            isShow ✔

    */ 
    'rects': [
        {   
            // id: nanoid(),
            isShowEditor: false,
            isShow: true,
            showHtml: true,
            'width': 200,
            'height': 150,
           
            'top': 10,
            'left': 10,
            'draggable': true,
            'resizable': true,
            'minw': 10,
            'minh': 10,
            'axis': 'both',
            'parentLim': true,
            'snapToGrid': false,
            'aspectRatio': false,
            'zIndex': 1,
            'color': '#E6C27A',
            'active': false,
            'text': '我是标题 1111111111111111111111111111111111111111111111111111111111111111111'
        },
        {
            // id: nanoid(),
            isShowEditor: false,
            isShow: true,
            showHtml: true,
            'width': 200,
            'height': 150,
           
            'top': 10,
            'left': 220,
            'draggable': true,
            'resizable': true,
            'minw': 10,
            'minh': 10,
            'axis': 'both',
            'parentLim': true,
            'snapToGrid': false,
            'aspectRatio': false,
            'zIndex': 1,
            'color': '#E6C27A',
            'active': false,
            'text': '我是标题 222222222222222222222222222222222222222222222222222222222222222222'
        },
        {
            // id: nanoid(),
            isShowEditor: false,
            isShow: true,
            showHtml: true,
            'width': 200,
            'height': 150,
            'top': 170,
            'left': 10,
            'draggable': true,
            'resizable': true,
            'minw': 10,
            'minh': 10,
            'axis': 'both',
            'parentLim': true,
            'snapToGrid': false,
            'aspectRatio': false,
            'zIndex': 1,
            'color': '#AED581',
            'active': false,
            'text': '我是标题 33333333333333333333333333333333333333333333333333333333333333333333'
        },
        {
            // id: nanoid(),
            isShowEditor: false,
            isShow: true,
            showHtml: true,
            'width': 200,
            'height': 150,
        
            'top': 170,
            'left': 220,
            'draggable': true,
            'resizable': true,
            'minw': 10,
            'minh': 10,
            'axis': 'both',
            'parentLim': true,
            'snapToGrid': false,
            'aspectRatio': false,
            // 'zIndex': 3,
            'zIndex': 1,
            'color': '#81D4FA',
            'active': false,
            'text': '我是标题 444444444444444444444444444444444444444444444444444444444444444444444'
        }
    ],
};
