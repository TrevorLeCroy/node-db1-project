const model      = require('./accounts-model');
const middleware = require('./accounts-middleware');
const router     = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await model.getAll();
    res.status(200).send(accounts);
  } catch(err) {
    next(err);
  }
})

router.get('/:id', middleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const id = req.params.id;
    const account = await model.getById(id);
    res.status(200).send(account);
  } catch(err) {
    next(err);
  }
})

router.post('/', middleware.checkAccountPayload, middleware.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account =  {
      name: req.body.name,
      budget: req.body.budget
    };

    const newAccount = await model.create(account);

    res.status(201).send(newAccount);
  } catch(err) {
    next(err);
  }
})

router.put('/:id', middleware.checkAccountId, middleware.checkAccountPayload, middleware.checkAccountNameUnique, async (req, res, next) => {
  try {
    const id = req.params.id;

    const account = {
      name: req.body.name,
      budget: req.body.budget
    };
    
    const updatedAccount = await model.updateById(id, account);

    res.status(200).send(updatedAccount);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', middleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const id = req.params.id;

    const deletedAccount = await model.deleteById(id);
    res.status(200).send(deletedAccount);
  } catch(err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stackL: err.stack
  });
});

module.exports = router;
