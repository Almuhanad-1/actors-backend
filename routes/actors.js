const express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res, next) {
	const order = req.query.order == 'ASC' ? 'ASC' : 'DESC'
	models.actor
		.findAll({
			order: [
				['first_name', order]
			],
			attributes: ['actor_id', 'first_name', 'last_name'],
			include: [
				{
					model: models.film,
					attributes: ['title', 'rating']
				}
			]
		})
		.then(actorsFound => {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(actorsFound));
		});
});
router.get('/:id', function (req, res, next) {
	models.actor
		.findByPk(parseInt(req.params.id), {
			attributes: ['first_name', 'last_name'],
			include: [
				{
					model: models.film,
					attributes: ['film_id', 'title', 'rating'],
				}
			]
		})
		.then(actorsFound => {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(actorsFound));
		});
});
router.post('/', function (req, res, next) {
	models.actor.findOrCreate({
		where: {
			first_name: req.body.first_name,
			last_name: req.body.last_name
		}
	})
		.spread(function (result, created) {
			if (created) {
				res.send({
					success: true,
					message: 'Added successfully'
				})
			} else {
				res.status(400);
				res.send({
					success: false,
					message: 'Actor is already exists'
				})
			}
		})
});
router.put("/:id", function (req, res, next) {
	let actorId = parseInt(req.params.id);
	models.actor
		.update(req.body, { where: { actor_id: actorId } })
		.then(result => {
			res.send({
				success: true,
				message: 'Edited Successfully'
			})
		})
		.catch(err => {
			res.status(400);
			res.send({
				success: false,
				message: 'Ann error occurred'
			})
		});
});
router.delete("/:id", function (req, res, next) {
	let actorId = (req.params.id);
	models.actor
		.destroy({
			where: { actor_id: actorId }
		})
		.then(result => {
			if (result == 0) {
				res.send({
					success: false,
					message: 'There was nothing to be deleted'
				})
			} else {
				res.send({
					success: true,
					message: `sccessfully deleted ${result} rows`
				})
			}
		})
		.catch(err => {
			res.status(400);
			res.send({
				success: false,
				message: `Something unexpected happened`
			})
		}
		);
});

module.exports = router;