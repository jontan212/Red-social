const ctrl = {};

const { Bulo, Comment, User } = require('../models');

ctrl.index = async (req, res) => {
    let publication = [];
    const bulos = await Bulo.find().sort({ timestamp: -1 });
    for (let i = 0; i < bulos.length; i++) {
        let comments = await Comment.find({ bulo_id: bulos[i]._id }).sort({ timestamp: -1 });
        let userBulo = await User.findOne({ _id: bulos[i].user_bulo });
        let arrayComments = []
        for (let i = 0; i < comments.length; i++) {
            let userComment = await User.findOne({_id: comments[i].user_comment});
            arrayComments.push({comment: comments[i], userComment: userComment});
        }
        publication.push({ bulos: bulos[i], comments: arrayComments, userBulo: userBulo });
    }
    res.render('index', { publication });
};

module.exports = ctrl;