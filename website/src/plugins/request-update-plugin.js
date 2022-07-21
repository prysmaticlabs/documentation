module.exports = function myPlugin(context, options) {
    return {
        name: 'request-update-plugin',
        injectHtmlTags({ content }) {
            return {
                postBodyTags: [`<div> This is post body </div>`]
            };
        },
    };
};