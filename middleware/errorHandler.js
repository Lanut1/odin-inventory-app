module.exports = (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).render('errorPage', { 
    message: err.message || 'Something went wrong'
  });
}