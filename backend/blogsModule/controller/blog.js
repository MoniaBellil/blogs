const blogModel = require('../model/blog');

module.exports = {
    addblog: addblog,
    editblog: editblog,
    getblog: getblog,
    deleteblog: deleteblog,
    getAllblogs: getAllblogs
}


function addblog(req, res) {
    try {
        if (req.body) {
            let obj = req.body;

            if (req.files) {
                const image = req.files.profileImg;
                const fileName = 'images/' + image.name.split(' ').join('-');
                image.mv(__dirname + '/../../public/' + fileName, function (err, imageRes) {
                    if (err) {
                        res.jsonp({
                            status: false,
                            msg: err
                        });
                    } else {
                        obj.profileImg = `http://localhost:3000/${fileName}`;
                        blogModel(obj).save((err, result) => {
                            if (result)
                            res.jsonp({
                                tatus: true,
                                data: result,
                                 msg: 'blog added successfully'
                                });
                            else
                                res.jsonp({
                                    status: false,
                                    msg: 'Something went wrong !'
                                });
                        });
                    }
                });
            } else {
                res.jsonp({
                    status: false,
                    msg: 'Add profile image!'
                });
            }
        } else
            res.jsonp({
                status: false,
                msg: 'Fields req!'
            });
    } catch (error) {
    }
}

function editblog(req, res) {
    try {
        if (req.body) {
            const id = req.params.id;
            let obj = req.body;

            if (req.files) {
                const image = req.files.profileImg;
                const fileName = 'images/' + image.name.split(' ').join('-');
                image.mv(__dirname + '/../../public/' + fileName, function (err, imageRes) {
                    if (err) {
                        res.jsonp({
                            status: false,
                            msg: err
                        });
                    } else {
                        obj.profileImg = `http://localhost:3000/${fileName}`;
                        blogModel.findByIdAndUpdate(id, obj, (err, result) => {
                            if (result)
                                res.jsonp({
                                    status: true,
                                    data: result,
                                    msg: 'blog updated successfully'
                                });
                            else {
                                res.jsonp({
                                    status: false,
                                    msg: 'Something went wrong!'
                                });

                            }
                        });

                    }
                });
            } else {
                blogModel.findByIdAndUpdate(id, obj, (err, result) => {
                    if (result)
                        res.jsonp({
                            status: true,
                            data: result,
                            msg: 'blog updated successfully'
                        });
                    else {
                        res.jsonp({
                            status: false,
                            msg: 'Something went wrong!'
                        });

                    }
                });
            }
        } else {
            res.jsonp({
                status: false,
                msg: 'Fields req!'
            });
        }
    } catch (error) {
    }
}

function getblog(req, res) {
    try {
        if (req.body) {
            const id = req.params.id;
            blogModel.findById(id, (err, result) => {
                if (result)
                    res.jsonp({
                        status: true,
                        data: result,
                        msg: 'blog fetched successfully'
                    });
                else
                    res.jsonp({
                        status: false,
                        msg: 'Something went wrong!'
                    });
            });
        } else {
            res.jsonp({
                status: false,
                msg: 'Something went wrong!'
            });
        }
    } catch (error) {
    }
}

function deleteblog(req, res) {
    try {
        if (req.body) {
            const id = req.params.id;
            const obj = req.body;
            blogModel.findByIdAndRemove(id, obj, (err, result) => {
                if (result)
                    res.jsonp({
                        status: true,
                        data: result,
                        msg: 'blog delete successfully'
                    });
                else
                    res.jsonp({
                        status: false,
                        msg: 'Something went wrong!'
                    });
            });
        } else {
            res.jsonp({
                status: false,
                msg: 'Something went wrong!'
            });
        }
    } catch (error) {
    }
}

function getAllblogs(req, res) {
    try {
        if (req.body) {
            const obj = req.body;
            blogModel.find(obj, (err, result) => {
                console.log(result)
                if (result)
                    res.jsonp({
                        status: true,
                        data: result,
                        msg: 'blog added successfully'
                    });
                else
                    res.jsonp({
                        status: false,
                        msg: 'Something went wrong 1!'
                    });
            });
        } else {
            res.jsonp({
                status: false,
                msg: 'Something went wrong 2!'
            });
        }
    } catch (error) {
    }
}
