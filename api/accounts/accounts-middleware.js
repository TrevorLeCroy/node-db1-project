const model = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name || !req.body.budget) {
    res.status(400).json({
      message: 'name and budget are required' 
    });
  }

  if(typeof(req.body.name) !== 'string') {
    res.status(400).json({
      message: 'name of account must be a string'
    });
  }

  if(req.body.name.trim().length > 100 || req.body.name.trim().length < 3) {
    res.status(400).json({
      message: 'name of account must be between 3 and 100'
    });
  }

  if(typeof(req.body.budget) !== 'number') {
    res.status(400).json({
      message: 'budget of account must be a number'
    });
  }

  if(req.body.budget > 1000000 || req.body.budget < 0) {
    res.status(400).json({
      message: 'budget of account is too large or small'
    });
  }
  
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const accounts = await model.getAll();
  accounts.forEach(account => {
    if(account.name === req.body.name){
      res.status(400).json({
        message: 'that name is taken'
      });
    }
  })

  next();
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await model.getById(req.params.id);
  if(!account) {
    res.status(404).json({
      message: 'account not found'
    });
  }
  next()
}
