import header from './header.json'
import login from './login.json'
import signup from './signup.json'
import main from './main.json'
import errors from './errors.json'
import setup from './setup.json'
import categories from './categories.json'

const lexique = {
    header,
    errors,
    categories,
    "/": main,
    "/login": login,
    "/signup": signup,
    "/setup": setup
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
    for(const text in lexique.categories){
        data[text] = lexique.categories[text][lang]
    }
    return data
}

const getInitialText = (lang, pages) => {
    const header = {}
    const errors = {}
    const categories = {}
    for(const text in lexique.header){
        header[text] = lexique.header[text][lang]
    }
    for(const text in lexique.errors){
        errors[text] = lexique.errors[text][lang]
    }

    for(const text in lexique.categories){
        categories[text] = lexique.categories[text][lang]
    }
    
    const currentPage = {
        ...getCurrentPagesText(lang, pages),
        ...categories
    }

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

