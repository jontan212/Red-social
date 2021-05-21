const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const { Bulo, Comment, User } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {

    const viewModel = { bulo: {}, comments: [], userBulo: {} }

    const bulo = await Bulo.findOne({ _id: req.params.bulo_id })
        // Si no encuentra el id
        .catch(function (error) {
            res.redirect('/');
        });
    // Si lo encuentra
    if (bulo) {
        bulo.views = bulo.views + 1;
        viewModel.bulo = bulo;
        await bulo.save();
        const comments = await Comment.find({ bulo_id: bulo._id }).sort({ timestamp: -1 });
        for (let i = 0; i < comments.length; i++) {
            let userComment = await User.findOne({ _id: comments[i].user_comment });
            viewModel.comments.push({ comment: comments[i], userComment: userComment });
        }
        const userBulo = await User.findOne({ _id: bulo.user_bulo });
        viewModel.userBulo = userBulo;
        res.render('bulo', viewModel);
    }

};

ctrl.perfil = async (req, res) => {
    let publication = [];
    const bulos = await Bulo.find({ user_bulo: req.user.id }).sort({ timestamp: -1 });
    for (let i = 0; i < bulos.length; i++) {
        let comments = await Comment.find({ bulo_id: bulos[i]._id }).sort({ timestamp: -1 });
        let arrayComments = []
        for (let i = 0; i < comments.length; i++) {
            let userComment = await User.findOne({ _id: comments[i].user_comment });
            arrayComments.push({ comment: comments[i], userComment: userComment });
        }
        publication.push({ bulos: bulos[i], comments: arrayComments, userBulo: req.user });
    }
    res.render('perfil', { publication });
};

ctrl.create = async (req, res) => {

    if (!req.file) {
        const newBulo = new Bulo({
            user_bulo: req.user.id,
            description: req.body.comment
        });
        const buloSaved = await newBulo.save();
        res.redirect('/bulo/' + buloSaved._id);
    }

    const saveBulo = async () => {

        const fileUrl = randomNumber();
        const bulos = await Bulo.find({ filename: fileUrl });
        if (bulos.length > 0) {
            saveBulo();
        } else {

            const fileTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${fileUrl}${ext}`);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(fileTempPath, targetPath);
                const newBulo = new Bulo({
                    user_bulo: req.user.id,
                    description: req.body.comment,
                    filename: fileUrl + ext
                });
                const buloSaved = await newBulo.save();
                req.flash('success_msg', 'Bulo creado correctamente');
                res.redirect('/bulo/' + buloSaved._id);
            } else {
                await fs.unlink(fileTempPath);
                res.status(500).json({ error: 'Archivo no permitido' });
            }
        }
    };

    saveBulo();

};

ctrl.like = async (req, res) => {
    const bulo = await Bulo.findOne({ _id: req.params.bulo_id });
    if (bulo) {
        bulo.likes = bulo.likes + 1;
        await bulo.save();
        res.json({ likes: bulo.likes });
    }
};

ctrl.comment = async (req, res) => {
    const bulo = await Bulo.findOne({ _id: req.params.bulo_id })
        // Si no encuentra el id
        .catch(function (error) {
            res.status(500).json({ error: 'Bulo no encontrado' });
        });
    // Si lo encuentra
    if (bulo) {
        const newComment = new Comment(req.body);
        newComment.user_comment = req.user.id;
        newComment.bulo_id = req.params.bulo_id;
        await newComment.save();
        req.flash('success_msg', 'Comentario creado correctamente');
        res.redirect('/bulo/' + req.params.bulo_id);
    } else {
        res.redirect('/');
    }
};

ctrl.remove = async (req, res) => {
    const bulo = await Bulo.findOne({ _id: req.params.bulo_id });
    if (bulo && bulo.user_bulo == req.user.id) {
        // Si tiene un archivo
        if (bulo.filename) {
            await fs.unlink(path.resolve('./src/public/upload/' + bulo.filename));
        }
        await Comment.deleteOne({ bulo_id: bulo._id });
        await bulo.remove();
        res.json(true);
    }
};

module.exports = ctrl;