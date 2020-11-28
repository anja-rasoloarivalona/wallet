import header from './header.json'
import login from './login.json'
import signup from './signup.json'
import main from './main.json'
import errors from './errors.json'

const lexique = {
    header,
    errors,
    "/": main,
    "/login": login,
    "/signup": signup
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
    const errors = {}
    for(const text in lexique.header){
        header[text] = lexique.header[text][lang]
    }
    for(const text in lexique.errors){
        errors[text] = lexique.errors[text][lang]
    }
    
    const currentPage = getCurrentPagesText(lang, pages)

    return {
        header,
        currentPage,
        errors
    }
}

export {
    getInitialText,
    getCurrentPagesText
}

