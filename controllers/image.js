const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '3bb5bddc0a98413eb762b493319d689f'
  });

const handleApiCall = (req,res) => {
    app.models
        .predict(
            'f76196b43bbd45c99b4f3cd8e8b40a8a',
            // "a403429f2ddf4b49b307e318f00e528b",
            //  "d11d01106c3540c8a08cd13a611e45bb",
            // Clarifai.FACE_DETECT_MODEL,
            // Clarifai.COLOR_MODEL,
            // 'c0c0ac362b03416da06ab3fa36fb58e3',
            req.body.input) 
        .then(data => {
            res.json(data);
        })
    .catch(err => res.status(400).json('unable to work with API'))    
}

const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries')); 
}

module.exports = {
    handleImage,
    handleApiCall
}