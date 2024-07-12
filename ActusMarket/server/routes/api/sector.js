const express = require('express');
const router = express.Router();

const Sector = require('../../models/sector');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants/index')

router.post('/add', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;

        if (!description && !name) {
            res.status(400).json({ error: 'You must enter description & name.' });
        }

        const sector = new Sector({
            name,
            description
        });

        const sectorDoc = await sector.save();
        res.status(200).json({
            success: true,
            message: `Sector has been added successfully!`,
            sector: sectorDoc
        });
    }
    catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});



router.get('/list', auth, async (req, res) => {
    try {
        const sectors = await Sector.find({});
        res.status(200).json({
            sectors,
            count: sectors.length
        });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});



module.exports = router;