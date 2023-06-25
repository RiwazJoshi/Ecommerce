const Product = require('../model/Product')



const index = async (req, res) => {

    // let products = await Product.find({
    //     name: RegExp(req.query.search_term, "i"),
    //     brands: RegExp(req.query.search_term, "i")
    // })
    let regex_search_term = RegExp(req.query.search_term, "i")
    let price_from = parseFloat(req.query.price_from) || 0
    let price_to = parseFloat(req.query.price_to) || 99999999999999999
    let page = parseInt(req.query.page) || 1
    let per_page = parseInt(req.query.per_page) || 2
    let ratings = parseInt(req.query.ratings) || 0



    let sort = { name: 1 }
    sort_by = req.query.sort

    switch (sort_by) {
        case "nameasc":
            sort = { name: 1 }
            break;
        case "namedesc":
            sort = { name: -1 }
            break;
        case "priceasc":
            sort = { price: 1 }
            break;
        case "pricedesc":
            sort = { price: -1 }
            break;

        default:
            break;
    }


    // let products = await Product.find({ $or: [{ name: regex_search_term }, { brands: regex_search_term }] })
    // let products = await Product.find({ $or: [{ name: regex_search_term }, { brands: regex_search_term }] })
    // let products = await Product.find(
    //     {
    //         $and: [
    //             {
    //                 $or: [
    //                     { name: regex_search_term },
    //                     { brands: regex_search_term }
    //                 ]
    //             },
    //             {
    //                 $and: [{ price: { $gte: price_from } }, { price: { $lt: price_to } }]
    //             }
    //         ]
    //     }
    // )
    let products = await Product.aggregate([
        {
            $match: {
                $or: [{ name: regex_search_term }, { brands: regex_search_term }]

            }
        },
        {
            $match: {
                $and: [{ price: { $gte: price_from } }, { price: { $lt: price_to } }]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "created_by",
                foreignField: "_id",
                as: "created_by"
            }
        },
        {
            $unwind: "$created_by"
        },
        {
            $addFields: { avg_rating: { $avg: "$reviews.ratings" } }
        },
        {
            $match: {
                "avg_rating": { $gte: ratings }
            }
        },
        {
            $project: {
                "created_by.password": 0,
                "avg_rating": 0
            }
        },
        {
            $sort: sort
        },
        {
            $skip: ((page - 1) * per_page)
        },
        {
            $limit: per_page
        }
    ])
    let count = await Product.aggregate([
        {
            $match: {
                $or: [{ name: regex_search_term }, { brands: regex_search_term }]

            }
        },
        {
            $match: {
                $and: [{ price: { $gte: price_from } }, { price: { $lt: price_to } }]
            }
        },
        // {
        //     $lookup: {
        //         from: "users",
        //         localField: "created_by",
        //         foreignField: "_id",
        //         as: "created_by"
        //     }
        // }
        // {
        //     $unwind: "$created_by"
        // },
        // {
        //     $project: {
        //         " created_by.password": 0
        //     }
        // },
        {
            $sort: sort
        }
    ])


    let meta = {
        total: count.length,
        page,
        per_page
    }
    res.send({
        data: products,
        meta
    })
}
const store = async (req, res, next) => {
    try {
        let images = req.files.map(el => el.filename)
        let product = await Product.create({
            ...req.body,
            images: images,
            created_by: req.user._id
        })
        res.send(product)
    }
    catch (err) {
        next(err)
    }
}
const update = async (req, res, next) => {
    try {
        let product = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, {
            new: true
        })
        res.send(product)
    }
    catch (err) {
        next(err)
    }
}
const remove = async (req, res, next) => {
    //    console.log(req.params);
    //    console.log(req.query);
    //     return;
    try {
        // let images = req.files.map(el => el.filename)
        // let product = await Product.create({ ...req.body, images: images })
        let product = await Product.findByIdAndDelete(req.params.id)
        res.send(product)
    }
    catch (err) {
        next(err)
    }
}

const updateReview = async (req, res, next) => {
    try {
        let product = await Product.findByIdAndUpdate(req.params.id, {
            $push: {
                reviews: {
                    comment: req.body.comment,
                    ratings: req.body.ratings,
                    created_by: {

                        name: req.user.name,
                        email: req.user.email
                    }
                }
            }
        }, {
            new: true,
            runValidators: true,
        })
        res.send(product)
    }
    catch (err) {
        next(err)
    }
}
module.exports = {
    index,
    store,
    update,
    remove,
    updateReview
}