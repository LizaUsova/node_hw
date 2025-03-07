const Post = require('../models/Post.js');

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Вкажіть заголовок та контент посту' });
        }
        const post = new Post({ title, content, owner: req.userId });
        await post.save();
        return res.status(201).json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ owner: req.userId });
        return res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, owner: req.userId });
        if (!post) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }
        return res.status(200).json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id, owner: req.userId },
            { title, content },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }
        return res.status(200).json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!post) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }
        return res.status(200).json({ message: 'Пост успішно видалено' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};