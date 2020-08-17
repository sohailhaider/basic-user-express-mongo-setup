const router = require('express').Router();
const userManager = require('../managers/user');

router.post('/login', async (req, res) => {
    try {
        let user = await userManager.getByEmail(req.body.email);
        if (!user)
            return res.status(400).send(`User does not exists with this email.`);

        if (req.body.password === user.password) {
            return res.status(200).send(user);
        } else {
            return res.status(400).send(`Password did not match.`);
        }
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/signup', async (req, res) => {
    try {
        let user = await userManager.getByEmail(req.body.email);
        if (user)
            return res.status(400).send(`User already exists with this email.`);

        user = await userManager.create({...req.body});
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/up/:id', async (req, res) => {
    try {
        const t = await userManager.updatePassword(req.params.id, { ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/un/:id', async (req, res) => {
    try {
        const t = await userManager.updateName(req.params.id, { ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/upic/:id', async (req, res) => {
    try {
        const t = await userManager.updatePicture(req.params.id, { ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const t = await userManager.list(req.body.keyword || '');
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const t = await userManager.getById(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;