require('dotenv').config()

const request = require('request'),
      accessToken = process.env.AccKey;

module.exports = {
    echo: (req, res) => {
        console.log ('connected to index')
    },

    list: (req, res) => {
        let options = {
            url: `https://api.github.com/users/${req.params.username}/starred?sort=stars&order=asc`,
            headers: {
              'User-Agent': 'request',
              'Authorization': `token ${accessToken}`
            }
        }

        request.get(options, (error, response, body) => {
            if(!error) {
                let result = JSON.parse(body),
                    username = req.body.username,
                    data;

                if (username !== undefined) {
                    result.forEach(elem => {
                        console.log(elem.username, username)
                        if (elem.username === username) data = elem
                    });

                    if (!data) {
                        res.status(404).json({
                            message: `repository not found`
                        })
                    } else {
                        res.status(200).json({
                            data: data
                        })
                    }

                } else {
                    res.status(200).json({
                        data: result
                    })
                }
                
            } else {
                res.status(500).json({
                    message: error.message
                })
            }
        })
    },
    
    create:(req, res) => {
        let options = {
            url: `https://api.github.com/user/repos`,
            headers: {
              'User-Agent': 'request',
              'Authorization': `token ${accessToken}`
            },
            body: JSON.stringify({
                name : req.body.name,
                description: req.body.description
            })
        }

        request.post(options, (error, response, body) => {
            if(!error) {
                res.status(200).json({
                    message: 'succesfully created repository',
                    data: JSON.parse(body)
                })
            } else {
                res.status(500).json({
                    message: error.message
                })
            }
        })
    },

    listrepo: (req, res) => {
        let options = {
            url: `https://api.github.com/search/repositories?q=${req.params.reponame}+user:${req.params.username}`,
            headers: {
              'User-Agent': 'request',
              'Authorization': `token ${accessToken}`
            }
        }

        request.get(options, (error, response, body) => {
            if(!error) {
                res.status(200).json({
                    data: JSON.parse(body)
                })
                
            } else {
                res.status(500).json({
                    message: error.message
                })
            }
        })
    },

    unstar: (req, res) => {
        let options = {
            url: `https://api.github.com/user/starred/${req.params.username}/${req.params.reponame}`,
            headers: {
              'User-Agent': 'request',
              'Authorization': `token ${accessToken}`
            }
        }

        request.delete(options, (error, response, body) => {
            if(!error) {
                res.status(200).json({
                    message: `successfully unstar`
                })
                
            } else {
                res.status(500).json({
                    message: error.message
                })
            }
        })
    },

    friend: (req, res) => {
        let options = {
            url: `https://api.github.com/orgs/${req.params.org}/members`,
            headers: {
              'User-Agent': 'request',
              'Authorization': `token ${accessToken}`
            }
        }

        request.get(options, (error, response, body) => {
            if(!error) {
                res.status(200).json({
                    data: JSON.parse(body)
                })
                
            } else {
                res.status(500).json({
                    message: error.message
                })
            }
        })
    },
}