const fetch = require('node-fetch');

const bodyData = [{
    "name": "Top 10 ES6 Features every Web Developer must know",
    "url": "https://webapplog.com/es6",
    "text": "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
    "comments": [
        {
            "text": "Cruel…..var { house, mouse} = No type optimization at all"
        },
        {
            "text": "I think you’re undervaluing the benefit of ‘let’ and ‘const’."
        },
        {
            "text": "(p1,p2)=>{ … } ,i understand this ,thank you !"
        }
    ]
},
{
    "name": "New Blog",
    "url": "https://webapplog.com/es6",
    "text": "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
    "comments": []
},
{
    "name": "New Blog 2",
    "url": "https://webapplog.com/es6",
    "text": "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
    "comments": [{
        "text": "This is nice"
    }]
}
]

bodyData.forEach((body) => {
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
        .then(json => console.log(json))
        .catch(err => {
            console.error(err)
        })
})
