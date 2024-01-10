import { optimize } from "svgo";
import { JSDOM } from 'jsdom';
import cssom from 'cssom';

async function convertStylesToAttributes(svgString) {

    const dom = new JSDOM(svgString, { contentType: "image/svg+xml" });
    const document = dom.window.document;

    let styleText = document.querySelector('style');

    if(styleText) {
        styleText = styleText.textContent;
    } else {
        styleText = '';
    }

    const stylesheet = cssom.parse(styleText);

    const classesWithStyles = new Set();

    stylesheet.cssRules.forEach(rule => {
        if (rule.type === cssom.CSSRule.STYLE_RULE) {
            console.log(rule)
            const classNames = rule.selectorText.split(',').map(selector => selector.trim().slice(1));
            classNames.forEach(className => {
                const elements = document.querySelectorAll(`.${className}`);
                classesWithStyles.add(className);
                elements.forEach(element => {
                    for (let i = 0; i < rule.style.length; i++) {
                        const property = rule.style[i];
                        const value = rule.style[property];
                        element.setAttribute(property, value);
                    }
                });
            });
        }
    });

    const elements = document.querySelectorAll('[class]');
    elements.forEach(element => {
        const classes = element.getAttribute('class').split(' ');
        const newClasses = classes.filter(className => !classesWithStyles.has(className));
        if (newClasses.length === 0) {
            element.removeAttribute('class');
        } else {
            element.setAttribute('class', newClasses.join(' '));
        }
    });

    const defs = document.querySelector('defs');
    if(defs) {
        defs.remove();
    }
    if(document.querySelector('style')) {
        document.querySelector('style').remove();
    }

    ['id','data-name'].forEach(
        attribute => document.querySelector('svg').removeAttribute(attribute)
    )

    return dom.serialize();

}


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    let success = true;
    let optimizedSvgString = '';
    let errorMessage = '';

    try {

        const result = optimize(body.svgData, {
            plugins: [],
        });

        const svgString = result.data;

        await convertStylesToAttributes(svgString).then(result => {
            optimizedSvgString = result;
        });

    } catch (error) {
        errorMessage = error.message;
        success = false
    }

    return { optimizedSvgString, success, errorMessage }

})