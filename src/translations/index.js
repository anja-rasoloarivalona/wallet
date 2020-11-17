import header from './header.json'
import login from './login.json'
import signup from './signup.json'
import main from './main.json'

const lexique = {
    "/": main,
    header,
    login,
    signup,
}

const getCurrentPagesText = (lang, pages) => {
    const data = {}
    pages.forEach(page => {
        if(lexique[page]){
            for(const text in lexique[page]){
                data[text] = lexique[page][text][lang]
            }
        }
    });
    return data
}

const getInitialText = (lang, pages) => {
    const header = {}
    for(const text in lexique.header){
        header[text] = lexique.header[text][lang]
    }
    const currentPage = getCurrentPagesText(lang, pages)

    return {
        header,
        currentPage
    }
}

export {
    getInitialText,
    getCurrentPagesText
}

