const shortURL = require('../models/shortURL')


const { nanoid } = require('nanoid');

export async function shortenURL(req, res) {
    const { url } = req.body;
    if (!url) 
        return res.status(400).json({
          success:false,
        error: 'URL is required'
     });

    const short_code = nanoid(7);
    const baseUrl = req.get('host');

    try {
        const newURL = await create({ original_url: url, short_code });
        res.status(201).json({
            short_url: `https://${baseUrl}/${short_code}`
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Something went wrong'
         });
    }
}

export async function redirectToOriginal(req, res) {
    try {
        const shortURL = await findOne({ short_code: req.params.code });
        if (!shortURL) return res.status(404).send('Not Found');

        shortURL.click_count += 1;
        await shortURL.save();

        res.redirect(shortURL.original_url);
    } catch {
        res.status(500).send('Internal Server Error');
    }
}

export async function getAnalytics(req, res) {
    try {
        const url = await findOne({ short_code: req.params.code });
        if (!url) return res.status(404).json({ error: 'URL not found' });

        res.json({ click_count: url.click_count });
    } catch {
        res.status(500).json({ error: 'Internal server error' });
    }
}
