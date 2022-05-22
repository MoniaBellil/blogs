const blogController = require('../controller/blog');
module.exports = function (app, router) {
    router.post('/', blogController.addblog);
    router.get('/:id', blogController.getblog);
    router.put('/:id', blogController.editblog);
    router.delete('/:id', blogController.deleteblog);
    router.post('/all', blogController.getAllblogs);

    app.use('/blogs', router);
}