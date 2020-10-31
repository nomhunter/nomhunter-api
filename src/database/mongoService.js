/**
 * Save to mongoDB callback function
 * @param {Error} err Error object from MongoDB
 * @param {Entity} entity Entity object being stored
 * @param {RouterResponse} res Response object of Router function
 */
function saveCallback(err, entity, res) {
  if (err) {
    res.json({
      success: false,
      msg: 'Failed to save entity',
      entity: entity,
      err: err.message,
    });
  } else {
    res.json({
      success: true,
      msg: 'Successfully saved entity',
      entity: entity,
    });
  }
}

module.exports = {saveCallback};
